import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || 'G-9R6N7X6LN3'

/**
 * Custom event helper to track user actions (form submissions, CV drops, button clicks)
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && GA_ID) {
    window.gtag('event', eventName, eventParams)
  }
}

/**
 * AnalyticsManager component for React Single Page Application (SPA).
 * Dynamically loads Google Analytics 4 (gtag.js) only when VITE_GA_MEASUREMENT_ID is configured,
 * and automatically triggers page_view events on client-side route changes.
 */
export default function AnalyticsManager() {
  const location = useLocation()
  const scriptInjectedRef = useRef(false)

  // Initialize gtag script once
  useEffect(() => {
    if (!GA_ID || scriptInjectedRef.current) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments)
    }

    window.gtag('js', new Date())
    // Disable automatic pageview so we can accurately send pageviews on React Router route changes
    window.gtag('config', GA_ID, {
      send_page_view: false,
    })

    // Create and inject the async script tag
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    scriptInjectedRef.current = true
  }, [])

  // Send pageview on route change
  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return

    const fullPath = `${location.pathname}${location.search}${location.hash}`
    window.gtag('event', 'page_view', {
      page_path: fullPath,
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [location.pathname, location.search, location.hash])

  return null
}
