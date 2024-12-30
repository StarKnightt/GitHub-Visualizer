export interface ContributionDay {
    date: string;
    contributionCount: number;
  }
  
  export interface ContributionWeek {
    contributionDays: ContributionDay[];
  }
  
  export interface ContributionCalendar {
    weeks: ContributionWeek[];
    totalContributions: number;
  }
  
  export interface GitHubUserData {
    login: string;
    name: string;
    avatarUrl: string;
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  }
  
  