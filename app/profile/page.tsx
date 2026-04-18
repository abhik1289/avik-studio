"use client"

import MainAppHeader from '@/components/common/header'
import React from 'react'
import { useSession } from '@/lib/auth/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Calendar, Camera, Edit3 } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  
  const user = session?.user || {
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date().toISOString(),
    image: null
  }
  
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background">
      <MainAppHeader />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
          <p className="text-muted-foreground mt-1">Manage your account information</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Card */}
          <Card className="p-8 border shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Photo */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-md overflow-hidden">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-14 w-14 text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow hover:bg-slate-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <Button variant="secondary" size="sm" className="text-xs">
                  Change Photo
                </Button>
              </div>

              {/* User Information */}
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Edit3 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 bg-muted/50 rounded-lg flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Edit3 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Member Since</label>
                  <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-6 border shadow-sm">
            <h3 className="font-medium mb-4">Account Actions</h3>
            <div className="grid gap-3">
              <Button variant="secondary" className="justify-start">
                Change Password
              </Button>
              <Button variant="secondary" className="justify-start">
                Notification Settings
              </Button>
              <Button variant="secondary" className="justify-start text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
