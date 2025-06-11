import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from "react-icons/ai"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-100 border border-green-300 rounded-md p-4 flex items-start space-x-2 text-green-700">
        <AiOutlineCheckCircle className="mt-1 w-5 h-5" />
        <p>
          If an account exists with the email <strong>{email}</strong>, we’ve sent instructions to reset your
          password. Please check your inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin mr-2 h-4 w-4" />}
        Send Reset Link
      </Button>
    </form>
  )
}
