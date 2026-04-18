"use client"

import { useModeAnimation } from 'react-theme-switch-animation'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation()

  return (
    <button
      ref={ref}
      onClick={toggleSwitchTheme}
      className="
        relative
        h-10 w-10
        flex items-center justify-center
        rounded-md
       
        transition-all duration-200
        mt-0
        cursor-pointer
      "
      aria-label="Toggle theme"
    >
      <Sun
        className="
          h-[1.2rem] w-[1.2rem]
          rotate-0 scale-100
          transition-all duration-300
          dark:-rotate-90 dark:scale-0
        "
      />
      <Moon
        className="
          absolute
          h-[1.2rem] w-[1.2rem]
          rotate-90 scale-0
          transition-all duration-300
          dark:rotate-0 dark:scale-100
        "
      />
    </button>
  )
}
