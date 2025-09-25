import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderType } from '@/payload-types' // your Global TS type
import HeaderClientV0 from './Component.client'
import { mapPayloadToV0 } from './mapPayloadToV0'

// If your global slug is 'nav', change the first arg to 'nav'
export async function Header() {
  const data = (await getCachedGlobal('header', 1)()) as HeaderType
  const props = mapPayloadToV0(data)
  return <HeaderClientV0 {...props} />
}
