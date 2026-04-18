"use client"

import { ModeToggle } from './theme-toggle'
import { User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from '@/lib/auth/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function MainAppHeader() {


  const {data,isPending} = useSession();


  const userName = data?.user?.name || "User Name";
  const userEmail = data?.user?.email || "User Email";

  return (
    <header className="border-b border-border/60 bg-white/95 dark:bg-background/95 backdrop-blur-xl sticky top-0 z-50 ">
      <div className="flex items-center justify-between px-6 py-2.5 h-14 max-w-[1600px] mx-auto">
        {/* Logo - Left Side */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/15 transition-all hover:shadow-lg hover:shadow-blue-500/20">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="select-none">
            <h1 className="font-semibold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avik Studio</h1>
            <p className="text-xs text-muted-foreground/80 -mt-0.5 font-medium">Life Manager</p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5">
          <ModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
             
               <Avatar className='h-10 w-10 border-2 border-transparent hover:border-blue-500/30 transition-all'>
  {data?.user?.image && <AvatarImage src={data.user.image} />}
  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium">CN</AvatarFallback>
</Avatar>
              {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-57.5 ring-0 border border-slate-200 p-2">
              <div className="flex items-center justify-start gap-2 p-2 ">
        
                   <Avatar className='h-10 w-10 border-2 border-transparent hover:border-blue-500/30 transition-all'>
  {data?.user?.image && <AvatarImage src={data.user.image} />}
  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium">CN</AvatarFallback>
</Avatar>
               
                <div>
                  <p className="font-semibold text-sm">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </div>
              <div className="items text-slate-600">
                <DropdownMenuItem className="cursor-pointer py-2 transition-colors">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 transition-colors">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default MainAppHeader
