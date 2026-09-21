export type CustomerType = 'individual' | 'corporate';
export type OrderStatus =
    | 'registered'
    | 'under_review'
    | 'needs_information'
    | 'approved'
    | 'proforma_issued'
    | 'awaiting_payment'
    | 'preparing'
    | 'ready_to_ship'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
export type PaymentStatus = 'not_payable' | 'awaiting_payment' | 'paid' | 'failed';

export interface CustomerProfile {
    type: CustomerType;
    phone: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
    preferredCallTime: string;
    companyName: string;
    nationalId: string;
    economicCode: string;
}

export interface AuthSession {
    accessToken: string;
    profile: CustomerProfile;
}

export interface OrderItem {
    id: string;
    name: string;
    model: string;
    image: string;
    quantity: number;
    unitPrice: number;
    modules: string[];
}

export interface OrderEvent {
    status: OrderStatus;
    date: string;
    note: string;
    completed: boolean;
}

export interface ProformaInvoice {
    number: string;
    issueDate: string;
    validUntil: string;
    approvedAt: string;
    discount: number;
    shipping: number;
    tax: number;
}

export interface CustomerOrder {
    id: string;
    number: string;
    createdAt: string;
    updatedAt: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    items: OrderItem[];
    customer: CustomerProfile;
    events: OrderEvent[];
    invoice?: ProformaInvoice;
}
