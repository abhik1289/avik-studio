import FinanceDashboardLayout from '@/components/layouts/finance-dashboard-layout'
import React from 'react'

function RootFinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <FinanceDashboardLayout>
      {children}
    </FinanceDashboardLayout>
  )
}

export default RootFinanceLayout
