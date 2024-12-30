import { GitHubUserData } from "@/types";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function fetchGitHubContributions(username: string): Promise<GitHubUserData> {
  if (!GITHUB_TOKEN) {
    throw new Error("GitHub token is not set. Please set the NEXT_PUBLIC_GITHUB_TOKEN environment variable.");
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          login
          name
          avatarUrl
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    const userData = data.data?.user;

    if (!userData) {
      throw new Error("User not found");
    }

    return userData;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}

