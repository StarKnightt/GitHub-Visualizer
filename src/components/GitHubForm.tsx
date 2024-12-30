"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { fetchGitHubContributions } from "@/lib/github"
import { GitHubUserData } from "@/types"

interface GitHubFormProps {
  onDataFetched: (data: GitHubUserData) => void
}

export function GitHubForm({ onDataFetched }: GitHubFormProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await fetchGitHubContributions(username)
      onDataFetched(data)
      toast({
        title: "Success",
        description: `Fetched data for ${data.name || data.login}`,
      })
    } catch (error) {
      let errorMessage = "Failed to fetch GitHub data. Please check the username and try again."
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <Input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="flex-grow"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Get Graph"}
      </Button>
    </form>
  )
}

