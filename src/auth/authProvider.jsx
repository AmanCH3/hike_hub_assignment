

import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This function sets the user state and stores info in localStorage
    const login = (userData, token) => {
        setLoading(true);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        localStorage.setItem('role', userData.role);
        setUser(userData);
        setLoading(false);
    };

    // This function clears the user state and localStorage
    const logout = () => {
        setLoading(true);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // Also remove the role
        setUser(null);
        setLoading(false);
    };

    // --- NEW FUNCTION TO REFRESH USER DATA FROM THE SERVER ---
    const refreshUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, cannot refresh user.");
            // No need to do anything else if there's no token
            return;
        }

        try {
            console.log("Attempting to refresh user data from server...");
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                const updatedUser = response.data.data;
                console.log("User data successfully refreshed:", updatedUser);
                
                // Use the existing 'login' function to update the state and localStorage
                // This ensures consistency across your app.
                login(updatedUser, token); 
            }
        } catch (error) {
            console.error("Failed to refresh user data:", error);
            // If the token is invalid or expired, the API will return a 401 error.
            // In this case, we should log the user out completely.
            if (error.response && error.response.status === 401) {
                console.log("Token invalid or expired. Logging out.");
                logout();
            }
        }
    };
    // --- END OF NEW FUNCTION ---

    // This effect runs once when the app loads to restore the session from localStorage
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
    
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // If there's no token or user, ensure everything is cleared.
            logout();
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{ 
                user, 
                loading, 
                login, 
                logout, 
                refreshUser, // <-- Make the new function available to the rest of the app
                isAuthenticated: user !== null 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};