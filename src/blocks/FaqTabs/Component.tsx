'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import FaqTabsClient from './Client'
import type { FaqTabs as FaqTabsBlock, Faq, FaqCategory } from '@/payload-types'

type CatLite = { id: number; name: string }
type AnswerRT = NonNullable<Faq['answer2']>
type ItemLite = { id: number; question: string; answer2: AnswerRT }
type DbCat = { id: string; name: string }

async function findAll<T>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  args: Parameters<typeof payload.find>[0],
): Promise<T[]> {
  const pageSize = 20
  let page = 1
  const all: T[] = []

  while (true) {
    const res = await payload.find({
      ...args,
      limit: pageSize,
      page,
    })

    all.push(...(res.docs as T[]))

    if (page >= res.totalPages) break
    page += 1
  }

  return all
}

export default async function FaqTabs(props: FaqTabsBlock) {
  const payload = await getPayload({ config })

  let dbCategories: DbCat[] = []

  if (props.categories && props.categories.length > 0) {
    const ids = props.categories.map((c: any) => (typeof c === 'string' ? c : String(c?.id ?? c)))

    const docs = await findAll<FaqCategory>(payload, {
      collection: 'faqCategories',
      where: { id: { in: ids } },
      depth: 0,
      select: { name: true, order: true },
    })

    const orderMap = new Map<string, number>(ids.map((id, index) => [id, index]))

    dbCategories = docs
      .map((d) => ({
        id: String(d.id),
        name: d.name ?? '',
      }))
      .sort((a, b) => orderMap.get(a.id)! - orderMap.get(b.id)!)
  } else {
    const docs = await findAll<FaqCategory>(payload, {
      collection: 'faqCategories',
      sort: 'order',
      depth: 0,
      select: { name: true, order: true },
    })

    dbCategories = docs.map((d) => ({
      id: String(d.id),
      name: d.name ?? '',
    }))
  }

  if (!dbCategories.length) {
    return null
  }

  const itemsByCategory: Record<number, ItemLite[]> = {}
  const categories: CatLite[] = []

  let nextCatId = 0

  for (const dbCat of dbCategories) {
    const faqs = await findAll<Faq>(payload, {
      collection: 'faqs',
      where: {
        and: [{ category: { equals: dbCat.id } }, { _status: { equals: 'published' } }],
      },
      sort: 'order',
      depth: 0,
      select: { question: true, answer2: true },
    })

    if (!faqs.length) {
      continue
    }

    const catId = nextCatId++
    categories.push({ id: catId, name: dbCat.name })

    itemsByCategory[catId] = faqs.map((d, index) => ({
      id: index,
      question: d.question ?? '',
      answer2: d.answer2 as AnswerRT,
    }))
  }

  if (!categories.length) {
    return null
  }

  const accentColor = props.accentColor ?? '#7A8E57'

  return (
    <FaqTabsClient
      categories={categories as [CatLite, ...CatLite[]]}
      itemsByCategory={itemsByCategory}
      accentColor={accentColor}
    />
  )
}
