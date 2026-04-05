import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
    <Analytics />
  </ThemeProvider>
);
