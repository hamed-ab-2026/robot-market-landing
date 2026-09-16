'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from 'antd';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

export default function LoginPage() {
    const auth = useAuth();
    const router = useRouter();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    useEffect(() => {
        if (auth.isAuthenticated) router.replace('/dashboard');
        else if (auth.ready) auth.openLogin(() => router.replace('/dashboard'));
    }, [auth.isAuthenticated, auth.ready, auth.openLogin, router]);
    return <main className="max-w-2xl mx-auto min-h-[70vh] px-5 pt-32 pb-20 text-center">
        <div className="rounded-3xl border border-subtle bg-elevated p-10"><h1 className="text-3xl font-extrabold text-primary">{copy.login}</h1><p className="text-secondary mt-3 mb-7">{copy.protectedDescription}</p><Button type="primary" size="large" onClick={() => auth.openLogin(() => router.replace('/dashboard'))}>{copy.openLogin}</Button></div>
    </main>;
}
