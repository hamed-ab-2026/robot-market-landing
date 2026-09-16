import type {CustomerOrder, CustomerProfile} from '@/types/account';

const wait = () => new Promise(resolve => setTimeout(resolve, 300));

function createOrders(customer: CustomerProfile): CustomerOrder[] {
    const buyer = {
        ...customer,
        firstName: customer.firstName || 'کاربر',
        lastName: customer.lastName || 'روبات مارکت',
        city: customer.city || 'مشهد',
        address: customer.address || 'نشانی خریدار پس از تکمیل پروفایل ثبت می‌شود',
    };
    return [
        {
            id: 'order-128',
            number: 'RM-1405-00128',
            createdAt: '1405/06/12',
            updatedAt: '1405/06/15',
            status: 'proforma_issued',
            paymentStatus: 'awaiting_payment',
            customer: buyer,
            items: [
                {
                    id: 'rm-48',
                    name: 'دستگاه وندینگ روبات مارکت ۴۸',
                    model: 'RM-48',
                    image: '/images/machine-48-base.webp',
                    quantity: 1,
                    unitPrice: 4850000000,
                    modules: ['کارت‌خوان بانکی', 'سیستم سرمایش', 'برچسب اختصاصی برند'],
                },
            ],
            events: [
                {status: 'registered', date: '1405/06/12', note: 'درخواست شما ثبت شد.', completed: true},
                {
                    status: 'under_review',
                    date: '1405/06/13',
                    note: 'کارشناس فروش درخواست را بررسی کرد.',
                    completed: true,
                },
                {status: 'approved', date: '1405/06/14', note: 'جزئیات سفارش تلفنی تأیید شد.', completed: true},
                {status: 'proforma_issued', date: '1405/06/15', note: 'پیش‌فاکتور قابل دریافت است.', completed: true},
            ],
            invoice: {
                number: 'PF-1405-0081',
                issueDate: '1405/06/15',
                validUntil: '1405/06/22',
                approvedAt: '1405/06/15',
                discount: 50000000,
                shipping: 25000000,
                tax: 480000000,
            },
        },
        {
            id: 'order-127',
            number: 'RM-1405-00127',
            createdAt: '1405/06/08',
            updatedAt: '1405/06/10',
            status: 'under_review',
            paymentStatus: 'not_payable',
            customer: buyer,
            items: [
                {
                    id: 'rm-35',
                    name: 'دستگاه وندینگ روبات مارکت ۳۵',
                    model: 'RM-35',
                    image: '/images/machine-35-base.webp',
                    quantity: 2,
                    unitPrice: 3950000000,
                    modules: ['کارت‌خوان بانکی'],
                },
            ],
            events: [
                {status: 'registered', date: '1405/06/08', note: 'درخواست شما ثبت شد.', completed: true},
                {
                    status: 'under_review',
                    date: '1405/06/10',
                    note: 'کارشناس برای هماهنگی با شما تماس می‌گیرد.',
                    completed: true,
                },
            ],
        },
    ];
}

export async function getOrders(customer: CustomerProfile): Promise<CustomerOrder[]> {
    await wait();
    /*
      GET /orders
      Response: { "orders": [{ "id": "order-128", "number": "RM-1405-00128", "status": "proforma_issued", "paymentStatus": "awaiting_payment" }] }
    */
    return createOrders(customer);
}

export async function getOrder(id: string, customer: CustomerProfile): Promise<CustomerOrder | undefined> {
    await wait();
    /*
      GET /orders/:id
      Response: { "order": { "id": "order-128", "items": [], "events": [], "invoice": { "approvedAt": "1405/06/15" } } }
      The backend must verify that the signed-in customer owns this order.
    */
    return createOrders(customer).find(order => order.id === id);
}
