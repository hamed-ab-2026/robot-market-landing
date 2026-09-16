'use client';

import type {ReactNode} from 'react';
import {useEffect, useRef} from 'react';
import {Button, Skeleton} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

export default function ProtectedPage({children}: {children: ReactNode}) {
    const auth = useAuth();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const prompted = useRef(false);

    useEffect(() => {
        if (auth.ready && !auth.isAuthenticated && !prompted.current) {
            prompted.current = true;
            auth.openLogin();
        }
    }, [auth]);

    if (!auth.ready)
        return (
            <main className="max-w-5xl mx-auto min-h-[70vh] px-5 pt-32">
                <Skeleton active />
            </main>
        );
    if (!auth.isAuthenticated)
        return (
            <main className="max-w-3xl mx-auto min-h-[70vh] px-5 pt-32 pb-20 text-center">
                <div className="rounded-3xl border border-subtle bg-surface p-10">
                    <LockOutlined className="text-4xl text-brand-400" />
                    <h1 className="text-2xl font-extrabold text-primary mt-5">{copy.protectedTitle}</h1>
                    <p className="text-secondary mt-3 mb-7">{copy.protectedDescription}</p>
                    <Button type="primary" size="large" onClick={() => auth.openLogin()}>
                        {copy.openLogin}
                    </Button>
                </div>
            </main>
        );
    return children;
}
