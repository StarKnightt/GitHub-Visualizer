"use client"

import { useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { GitHubUserData } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, LineChart as LineChartIcon } from 'lucide-react'

interface ContributionGraphProps {
  userData: GitHubUserData
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-bold">{label}</p>
        <p className="text-emerald-600">
          {payload[0].value} contributions
        </p>
      </div>
    )
  }
  return null
}

export function ContributionGraph({ userData }: ContributionGraphProps) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar')

  const chartData = useMemo(() => {
    const contributionDays = userData.contributionsCollection.contributionCalendar.weeks.flatMap(
      week => week.contributionDays
    )

    const monthlyContributions = contributionDays.reduce((acc, day) => {
      const date = new Date(day.date)
      const month = date.toLocaleString('default', { month: 'short' })
      const year = date.getFullYear()
      const key = `${month} ${year}`

      if (!acc[key]) {
        acc[key] = { month: key, contributions: 0 }
      }

      acc[key].contributions += day.contributionCount
      return acc
    }, {} as Record<string, { month: string, contributions: number }>)

    return Object.values(monthlyContributions)
  }, [userData])

  const totalContributions = useMemo(() => 
    chartData.reduce((sum, item) => sum + item.contributions, 0)
  , [chartData])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Contribution Activity</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Total contributions: {totalContributions}
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'bar' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="contributions" 
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="contributions" 
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
