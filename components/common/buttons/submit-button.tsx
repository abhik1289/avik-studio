import { Button } from '@/components/ui/button'
import React from 'react'



interface AvikStudioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 title: string
 icon: React.ReactNode
}


function AvikStudioButton({ title, icon, ...props }: AvikStudioButtonProps) {
  return (
    <Button {...props}>
      {icon && <span className="size-4">{icon}</span>}
      <span>{title}</span>
    </Button>
  )
}

export default AvikStudioButton
