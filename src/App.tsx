import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import HealthPage from '@/components/pages/Health/HealthPage'
import HomePage from '@/components/pages/Home/HomePage'
import SigninPage from '@/components/pages/Signin/SigninPage'
import SignupPage from '@/components/pages/Signup/SignupPage'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/queryClient'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/health" element={<HealthPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  )
}
