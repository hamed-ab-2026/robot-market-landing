import type {Locale} from '@/types/domain';
import type {OrderStatus, PaymentStatus} from '@/types/account';

export const orderStatusLabels: Record<Locale, Record<OrderStatus, string>> = {
    fa: {
        registered: 'ثبت‌شده', under_review: 'در حال بررسی', needs_information: 'نیازمند تکمیل اطلاعات',
        approved: 'تأییدشده', proforma_issued: 'پیش‌فاکتور صادرشده', awaiting_payment: 'در انتظار پرداخت',
        preparing: 'در حال آماده‌سازی', ready_to_ship: 'آماده ارسال', shipped: 'ارسال‌شده',
        delivered: 'تحویل‌شده', cancelled: 'لغوشده',
    },
    en: {
        registered: 'Registered', under_review: 'Under review', needs_information: 'More information required',
        approved: 'Approved', proforma_issued: 'Proforma issued', awaiting_payment: 'Awaiting payment',
        preparing: 'Preparing', ready_to_ship: 'Ready to ship', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
    },
};

export const paymentStatusLabels: Record<Locale, Record<PaymentStatus, string>> = {
    fa: {not_payable: 'در انتظار تأیید', awaiting_payment: 'در انتظار پرداخت', paid: 'پرداخت‌شده', failed: 'ناموفق'},
    en: {not_payable: 'Pending approval', awaiting_payment: 'Awaiting payment', paid: 'Paid', failed: 'Failed'},
};

const fa = {
    login: 'ورود', account: 'حساب کاربری', dashboard: 'داشبورد', profile: 'اطلاعات حساب', orders: 'سفارش‌ها', logout: 'خروج',
    robotMasterPanel: 'پنل روبات مستر', otpLogin: 'ورود با کد یک‌بارمصرف', passwordLogin: 'ورود با رمز عبور',
    phone: 'شماره موبایل', password: 'رمز عبور', otp: 'کد تأیید', sendOtp: 'دریافت کد', verifyAndLogin: 'تأیید و ورود',
    loginButton: 'ورود به حساب', demoTitle: 'اطلاعات ورود آزمایشی', demoOtp: 'کد نمونه: ۱۲۳۴۵', demoPassword: 'شماره ۰۹۱۲۳۴۵۶۷۸۹ و رمز ۱۲۳۴۵۶',
    otpSent: 'کد آزمایشی برای این شماره آماده است.', invalidPhone: 'شماره موبایل معتبر وارد کنید.', invalidCredentials: 'شماره یا رمز عبور صحیح نیست.',
    protectedTitle: 'برای ادامه وارد حساب شوید', protectedDescription: 'مشاهده جزئیات دستگاه، سبد خرید و داشبورد فقط پس از ورود امکان‌پذیر است.',
    openLogin: 'ورود به حساب', welcome: 'خوش آمدید', dashboardDescription: 'اطلاعات حساب و روند سفارش‌های خود را از اینجا مدیریت کنید.',
    profileCompletion: 'تکمیل اطلاعات', activeOrders: 'سفارش فعال', totalOrders: 'همه سفارش‌ها', recentOrders: 'آخرین سفارش‌ها', viewAll: 'مشاهده همه',
    save: 'ذخیره اطلاعات', saved: 'اطلاعات با موفقیت ذخیره شد.', individual: 'شخص حقیقی', corporate: 'شخص حقوقی', customerType: 'نوع خریدار',
    firstName: 'نام', lastName: 'نام خانوادگی', email: 'ایمیل', province: 'استان', city: 'شهر', address: 'نشانی کامل', postalCode: 'کد پستی', preferredCallTime: 'زمان مناسب تماس',
    companyName: 'نام شرکت', nationalId: 'شناسه ملی', economicCode: 'کد اقتصادی', verifiedPhone: 'شماره تأییدشده و قابل ویرایش نیست.',
    orderNumber: 'شماره سفارش', orderDate: 'تاریخ ثبت', lastUpdate: 'آخرین به‌روزرسانی', orderStatus: 'وضعیت سفارش', paymentStatus: 'وضعیت پرداخت', details: 'مشاهده جزئیات',
    orderItems: 'اقلام سفارش', quantity: 'تعداد', unitPrice: 'قیمت واحد', total: 'جمع کل', modules: 'ماژول‌ها و امکانات', timeline: 'روند سفارش',
    invoice: 'پیش‌فاکتور', invoicePending: 'پیش‌فاکتور پس از بررسی تلفنی و تأیید ادمین در این بخش قرار می‌گیرد.', downloadPdf: 'دانلود PDF', downloadExcel: 'دانلود Excel', print: 'چاپ',
    invoiceNumber: 'شماره پیش‌فاکتور', issueDate: 'تاریخ صدور', validUntil: 'اعتبار تا', buyer: 'خریدار', seller: 'فروشنده', subtotal: 'جمع اقلام', discount: 'تخفیف', shipping: 'هزینه ارسال', tax: 'مالیات', finalTotal: 'مبلغ نهایی',
    sellerName: 'شرکت نگین سازان پیشگام رادمهر آتوسا (روبات مارکت)', sellerPhone: 'تلفن سفارش: ۰۹۱۵۱۶۰۱۸۴۷', emptyOrders: 'هنوز سفارشی ثبت نشده است.', backToOrders: 'بازگشت به سفارش‌ها', notFound: 'سفارش پیدا نشد.',
};

export const accountCopy: Record<Locale, typeof fa> = {
    fa,
    en: {
        login: 'Login', account: 'Account', dashboard: 'Dashboard', profile: 'Profile', orders: 'Orders', logout: 'Log out',
        robotMasterPanel: 'Robot Master Panel', otpLogin: 'Login with OTP', passwordLogin: 'Login with password',
        phone: 'Mobile number', password: 'Password', otp: 'Verification code', sendOtp: 'Send code', verifyAndLogin: 'Verify and login',
        loginButton: 'Login', demoTitle: 'Demo credentials', demoOtp: 'Demo code: 12345', demoPassword: 'Phone 09123456789 and password 123456',
        otpSent: 'The demo code is ready for this number.', invalidPhone: 'Enter a valid Iranian mobile number.', invalidCredentials: 'Incorrect phone number or password.',
        protectedTitle: 'Log in to continue', protectedDescription: 'Product details, cart, and dashboard are available after login.',
        openLogin: 'Login', welcome: 'Welcome', dashboardDescription: 'Manage your account details and follow your orders.',
        profileCompletion: 'Profile completion', activeOrders: 'Active orders', totalOrders: 'All orders', recentOrders: 'Recent orders', viewAll: 'View all',
        save: 'Save profile', saved: 'Your profile was saved.', individual: 'Individual', corporate: 'Company', customerType: 'Customer type',
        firstName: 'First name', lastName: 'Last name', email: 'Email', province: 'Province', city: 'City', address: 'Full address', postalCode: 'Postal code', preferredCallTime: 'Preferred call time',
        companyName: 'Company name', nationalId: 'National ID', economicCode: 'Economic code', verifiedPhone: 'This verified number cannot be edited.',
        orderNumber: 'Order number', orderDate: 'Created', lastUpdate: 'Last update', orderStatus: 'Order status', paymentStatus: 'Payment status', details: 'View details',
        orderItems: 'Order items', quantity: 'Quantity', unitPrice: 'Unit price', total: 'Total', modules: 'Modules and options', timeline: 'Order progress',
        invoice: 'Proforma invoice', invoicePending: 'The invoice appears here after phone review and admin approval.', downloadPdf: 'Download PDF', downloadExcel: 'Download Excel', print: 'Print',
        invoiceNumber: 'Invoice number', issueDate: 'Issue date', validUntil: 'Valid until', buyer: 'Buyer', seller: 'Seller', subtotal: 'Subtotal', discount: 'Discount', shipping: 'Shipping', tax: 'Tax', finalTotal: 'Grand total',
        sellerName: 'Negin Sazan Pishgam Radmehr Atousa (Robot Market)', sellerPhone: 'Sales: 09151601847', emptyOrders: 'No orders have been registered.', backToOrders: 'Back to orders', notFound: 'Order not found.',
    },
};
