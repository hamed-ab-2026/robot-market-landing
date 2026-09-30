import {describe, expect, it} from 'vitest';
import type {CustomerOrder, CustomerProfile} from '@/types/account';
import {getActiveOrderCount, getOrderItemQuantity, getProfileCompletion} from '../lib/orderSummary';

const completeProfile: CustomerProfile = {
    type: 'individual',
    phone: '09123456789',
    firstName: 'Sara',
    lastName: 'Ahmadi',
    email: 'sara@example.com',
    province: 'Razavi Khorasan',
    city: 'Mashhad',
    address: 'Main street',
    postalCode: '1234567890',
    preferredCallTime: '',
    companyName: '',
    nationalId: '',
    economicCode: '',
};

const makeOrder = (status: CustomerOrder['status'], quantities: number[] = [1]): CustomerOrder => ({
    id: status,
    number: `RM-${status}`,
    createdAt: '1405/06/12',
    updatedAt: '1405/06/15',
    status,
    paymentStatus: 'not_payable',
    customer: completeProfile,
    items: quantities.map((quantity, index) => ({
        id: `item-${index}`,
        name: 'Robot Market vending machine',
        model: 'RM-48',
        image: '/images/machine-48-base.webp',
        quantity,
        unitPrice: 100,
        modules: [],
    })),
    events: [],
});

describe('dashboard order summary helpers', () => {
    it('calculates required profile completion percentage', () => {
        expect(getProfileCompletion(completeProfile)).toBe(100);
        expect(getProfileCompletion({...completeProfile, city: '', postalCode: ''})).toBe(67);
    });

    it('counts active orders and excludes terminal statuses', () => {
        const orders = [makeOrder('under_review'), makeOrder('delivered'), makeOrder('cancelled')];

        expect(getActiveOrderCount(orders)).toBe(1);
    });

    it('totals item quantities for an order card', () => {
        expect(getOrderItemQuantity(makeOrder('registered', [1, 2, 4]))).toBe(7);
    });
});
