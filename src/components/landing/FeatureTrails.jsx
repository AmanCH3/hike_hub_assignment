import { Mountain, MapPin, Clock, Sun, Cloud, CloudFog, Users2 } from "lucide-react";

const featuredTrails = [
  { 
    image: "https://www.nepalindependentguide.com/wp-content/uploads/2021/09/champa-debi-hike.gif",
    name: "Champadevi Trails",
    location: "Nagarjuna National Park",
    elevation: "580 m",
    duration: "3-4 hours",
    weather: "Sunny, 22°C",
    groups: "3 groups",
    difficulty: "Moderate",
    icon: <Mountain className="h-5 w-5 text-green-600" />,
    weatherIcon: <Sun className="h-5 w-5 text-yellow-400" />,
  },
  {
    image: "https://nepalecoadventure.com/wp-content/uploads/2019/09/Day-Hiking-to-Shivapuri-2.jpg",
    name: "Bagdwar Trails",
    location: "Shivapuri National Park",
    elevation: "210 m",
    duration: "5-6 hours",
    weather: "Partly Cloudy, 18°C",
    groups: "5 groups",
    difficulty: "Hard",
    icon: <Mountain className="h-5 w-5 text-green-600" />,
    weatherIcon: <Cloud className="h-5 w-5 text-gray-400" />,
  },
  {
    image: "https://i0.wp.com/TheMtsAreCalling.com/wp-content/uploads/2018/12/jamacho-earth.jpg?ssl=1",
    name: "Jamacho Trails",
    location: "Shivapuri National Park",
    elevation: "950 m",
    duration: "4-5 hours",
    weather: "Foggy, 15°C",
    groups: "2 groups",
    difficulty: "Easy",
    icon: <Mountain className="h-5 w-5 text-green-600" />,
    weatherIcon: <CloudFog className="h-5 w-5 text-gray-300" />,
  },
];

const FeaturedTrails = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Trails</h2>
          <button className="text-green-600 hover:text-green-700 font-medium flex items-center text-sm">
            View All
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrails.map((trail, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <img src={trail.image} alt={trail.name} className="w-full h-48 object-cover rounded-t-lg" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  {trail.icon}
                  <h3 className="text-xl font-semibold text-gray-900">{trail.name}</h3>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <p className="text-sm">{trail.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Elevation:</span>
                    <span className="font-medium">{trail.elevation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{trail.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {trail.weatherIcon}
                    <span className="font-medium">{trail.weather}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users2 className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{trail.groups}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Difficulty:</span>
                    <span
                      className={`font-medium ${
                        trail.difficulty === "Easy"
                          ? "text-green-600"
                          : trail.difficulty === "Moderate"
                          ? "text-yellow-500"
                          : "text-red-600"
                      }`}
                    >
                      {trail.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View Details
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Join Hike
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrails;
