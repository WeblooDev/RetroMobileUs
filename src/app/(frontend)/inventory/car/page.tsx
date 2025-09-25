import { redirect } from 'next/navigation'

// This page handles the case when users navigate to /inventory/car without a slug
// It redirects them to the main inventory page
export default function CarPage() {
  redirect('/inventory')
}
