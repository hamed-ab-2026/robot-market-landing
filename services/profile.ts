import type {CustomerProfile} from '@/types/account';

const wait = () => new Promise(resolve => setTimeout(resolve, 350));

export async function saveProfile(profile: CustomerProfile): Promise<CustomerProfile> {
    await wait();
    /*
      PATCH /me
      Request:  { "type": "corporate", "firstName": "...", "lastName": "...", "companyName": "...", "address": "..." }
      Response: { "user": { "phone": "09123456789", "type": "corporate", "firstName": "...", "lastName": "..." } }
    */
    return {...profile};
}
