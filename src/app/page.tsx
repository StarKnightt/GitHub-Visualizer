"use client"

import { useState } from "react"
import { GitHubForm } from "@/components/GitHubForm"
import { ContributionGraph } from "@/components/ContributionGraph"
import { GitHubUserData } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Star } from "lucide-react"

export default function Home() {
  const [userData, setUserData] = useState<GitHubUserData | null>(null)

  const handleDataFetched = (data: GitHubUserData) => {
    setUserData(data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-semibold">
                  GitHub Contribution Visualizer
                </h1>
                <p className="text-xs text-gray-300">
                  Analyze and visualize GitHub activity patterns
                </p>
              </div>
            </div>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="hidden sm:flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span>Powered by GitHub API</span>
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Enter a GitHub Username</CardTitle>
            <CardDescription>Visualize GitHub contributions for any user</CardDescription>
          </CardHeader>
          <CardContent>
            <GitHubForm onDataFetched={handleDataFetched} />
            {userData && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <p>Name: {userData.name || userData.login}</p>
                <p>Total Contributions: {userData.contributionsCollection.contributionCalendar.totalContributions}</p>
                <ContributionGraph userData={userData} />
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 text-sm">
            <a 
              href="https://github.com/StarKnightt/GitHub-Visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Star className="h-4 w-4" />
              <span>Star on GitHub</span>
            </a>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300">
              Made by{' '}
              <a 
                href="https://prasen.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                prasenjit
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

