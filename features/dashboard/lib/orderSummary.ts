import type {CustomerOrder, CustomerProfile} from '@/types/account';

const COMPLETE_PROFILE_FIELDS: Array<keyof CustomerProfile> = [
    'firstName',
    'lastName',
    'province',
    'city',
    'address',
    'postalCode',
];

const INACTIVE_ORDER_STATUSES = new Set<CustomerOrder['status']>(['delivered', 'cancelled']);

/**
 * Calculates how much of the required buyer profile is ready for order processing.
 */
export function getProfileCompletion(profile: CustomerProfile): number {
    const filledFields = COMPLETE_PROFILE_FIELDS.filter(field => Boolean(profile[field]));

    return Math.round((filledFields.length / COMPLETE_PROFILE_FIELDS.length) * 100);
}

/**
 * Counts orders that still need operational follow-up from the customer or sales team.
 */
export function getActiveOrderCount(orders: CustomerOrder[]): number {
    return orders.filter(order => !INACTIVE_ORDER_STATUSES.has(order.status)).length;
}

/**
 * Counts all units across an order, regardless of how many product lines it contains.
 */
export function getOrderItemQuantity(order: CustomerOrder): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
}
