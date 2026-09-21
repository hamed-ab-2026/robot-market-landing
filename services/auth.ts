import type {AuthSession, CustomerProfile} from '@/types/account';

export const AUTH_STORAGE_KEY = 'rm-auth-session';
const DEMO_PHONE = '09123456789';
const DEMO_PASSWORD = '123456';
const DEMO_OTP = '12345';

const wait = (milliseconds = 450) => new Promise(resolve => setTimeout(resolve, milliseconds));
const emptyProfile = (phone: string): CustomerProfile => ({
    type: 'individual',
    phone,
    avatarUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
    preferredCallTime: '',
    companyName: '',
    nationalId: '',
    economicCode: '',
});

export function isIranianMobile(phone: string) {
    return /^09\d{9}$/.test(phone.replace(/\s/g, ''));
}

export async function requestOtp(phone: string): Promise<{expiresIn: number}> {
    await wait();
    if (!isIranianMobile(phone)) throw new Error('INVALID_PHONE');
    /*
      POST /auth/otp/request
      Request:  { "phone": "09123456789" }
      Response: { "success": true, "expiresIn": 120 }
    */
    return {expiresIn: 120};
}

export async function loginWithOtp(phone: string, code: string): Promise<AuthSession> {
    await wait();
    if (!isIranianMobile(phone) || code !== DEMO_OTP) throw new Error('INVALID_CREDENTIALS');
    /*
      POST /auth/otp/verify
      Request:  { "phone": "09123456789", "code": "12345" }
      Response: { "accessToken": "...", "user": { "phone": "09123456789", "firstName": "", "lastName": "" } }
      In production, prefer a Secure, HttpOnly session cookie instead of localStorage.
    */
    return {accessToken: `mock-${phone}`, profile: emptyProfile(phone)};
}

export async function loginWithPassword(phone: string, password: string): Promise<AuthSession> {
    await wait();
    if (phone !== DEMO_PHONE || password !== DEMO_PASSWORD) throw new Error('INVALID_CREDENTIALS');
    /*
      POST /auth/password/login
      Request:  { "phone": "09123456789", "password": "123456" }
      Response: { "accessToken": "...", "user": { "phone": "09123456789", "firstName": "حامد", "lastName": "عبدالله‌زاده" } }
    */
    return {accessToken: `mock-${phone}`, profile: {...emptyProfile(phone), firstName: 'کاربر', lastName: 'آزمایشی'}};
}
