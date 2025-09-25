import { Car } from '@/payload-types'

export function formatCarPrice(car: Car, includeMonthly: boolean = true): string {
  if (car.hidePrice) {
    return 'Contact for Price'
  }

  if (car.leaseType === 'single-pay') {
    const baseAmount =
      car.onePayAmount && car.onePayAmount > 0 ? `$${car.onePayAmount.toLocaleString()}` : '$0'
    const ttl = car.ttlAmount ? ` + $${car.ttlAmount.toLocaleString()} TTL` : ' + TTL'
    return `Single-Pay Lease: ${baseAmount}${ttl}`
  }

  const formattedPrice = `$${car.price.toLocaleString()}`
  return includeMonthly ? `${formattedPrice}/month +TTL` : formattedPrice
}
