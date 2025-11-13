'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import FaqTabsClient from './Client'
import type { FaqTabs as FaqTabsBlock, Faq, FaqCategory } from '@/payload-types'

type CatLite = { id: string; name: string }
// Use the generated type for the richText field
type AnswerRT = NonNullable<Faq['answer2']>
type ItemLite = { id: string; question: string; answer2: AnswerRT }

export default async function FaqTabs(props: FaqTabsBlock) {
  const payload = await getPayload({ config })

  let categories: CatLite[] = []

  if (props.categories && props.categories.length > 0) {
    const ids = props.categories.map((c: any) => String(typeof c === 'string' ? c : c?.id))
    const { docs } = await payload.find({
      collection: 'faqCategories',
      where: { id: { in: ids } },
      depth: 0,
      limit: 100,
      select: { id: true, name: true, order: true },
    })
    const orderMap = new Map(ids.map((id, i) => [id, i]))
    categories = (docs as Pick<FaqCategory, 'id' | 'name'>[]).map(d => ({
      id: String(d.id),
      name: d.name || '',
    })).sort((a, b) => (orderMap.get(a.id)! - orderMap.get(b.id)!))
  } else {
    const { docs } = await payload.find({
      collection: 'faqCategories',
      sort: 'order',
      depth: 0,
      limit: 100,
      select: { id: true, name: true },
    })
    categories = (docs as Pick<FaqCategory, 'id' | 'name'>[]).map(d => ({
      id: String(d.id),
      name: d.name || '',
    }))
  }

  const itemsByCategory: Record<string, ItemLite[]> = {}
  for (const c of categories) {
    const { docs } = await payload.find({
      collection: 'faqs',
      where: { and: [{ category: { equals: c.id } }, { _status: { equals: 'published' } }] },
      sort: 'order',
      depth: 0,
      limit: 200,
      select: { id: true, question: true, answer2: true }, // keep full richText
    })
    itemsByCategory[c.id] = (docs as Pick<Faq, 'id' | 'question' | 'answer2'>[]).map(d => ({
      id: String(d.id),
      question: d.question || '',
      // pass the richText JSON through as-is
      answer2: (d.answer2 ?? { root: { type: 'root', children: [], direction: null, format: '', indent: 0, version: 1 } }) as AnswerRT,
    }))
  }

  return (
    <FaqTabsClient
      categories={categories}
      itemsByCategory={itemsByCategory}
      accentColor={props.accentColor ?? '#7A8E57'}
    />
  )
}
