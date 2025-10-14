// Header.tsx (server)
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderDoc } from '@/payload-types'
import HeaderClient from './Component.client'

export async function Header() {
  const data = (await getCachedGlobal('header', 1)()) as HeaderDoc
  return <HeaderClient {...data} />
}
