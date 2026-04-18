"use client"

import MainAppHeader from '@/components/common/header'
import React from 'react'
import { DollarSign, FileText, Target, Bell, Calendar, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useSession } from '@/lib/auth/client'

export default function DashboardPage() {
  const modules = [
    {
      id: 'finance',
      name: 'Finance',
      description: 'Track expenses, budgets & savings',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      id: 'notes',
      name: 'Notes',
      description: 'Capture ideas, thoughts & documents',
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      id: 'goals',
      name: 'Goals',
      description: 'Set & track your life objectives',
      icon: Target,
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50 dark:bg-violet-950/30',
    },
    {
      id: 'reminders',
      name: 'Reminders',
      description: 'Never miss important tasks',
      icon: Bell,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: 'Schedule your daily activities',
      icon: Calendar,
      color: 'from-rose-500 to-pink-600',
      bg: 'bg-rose-50 dark:bg-rose-950/30',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'View insights & progress reports',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600',
      bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    },
  ]

  const recentHistory = [
    { id: 1, module: 'Finance', action: 'Added new expense: Groceries $85', time: '10 minutes ago', icon: DollarSign },
    { id: 2, module: 'Notes', action: 'Created note: Project ideas', time: '1 hour ago', icon: FileText },
    { id: 3, module: 'Goals', action: 'Updated goal progress: Fitness 65%', time: '3 hours ago', icon: Target },
    { id: 4, module: 'Reminders', action: 'Scheduled: Team meeting tomorrow', time: '5 hours ago', icon: Bell },
    { id: 5, module: 'Finance', action: 'Completed budget review for March', time: 'Yesterday', icon: DollarSign },
  ]


  const {data,isPending} = useSession();

  const name = data?.user?.name || "User"
  const firstName = name.split(" ")[0]

  return (
    <div className="min-h-screen bg-background">
      <MainAppHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Good morning, {firstName}</h2>
          <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening with your goals today.</p>
        </div>

        {/* Module Navigation - MS Office Style Ribbon */}
        <div className="mb-10">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Applications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <Card key={module.id} className={`group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-border ${module.bg}`}>
                  <div className="p-5 flex flex-col items-center text-center">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">{module.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{module.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent History Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-xs h-8">
              View all <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          
          <Card className="">
            <div className="divide-y divide-border">
              {recentHistory.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.module}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1.5 h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        {/* <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Today's Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Goals</p>
                  <p className="text-3xl font-semibold mt-1">7</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Target className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reminders</p>
                  <p className="text-3xl font-semibold mt-1">3</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Notes Created</p>
                  <p className="text-3xl font-semibold mt-1">12</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>
          </div>
        </div> */}
      </main>
    </div>
  )
}
