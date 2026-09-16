'use client';

import type {ReactNode} from 'react';
import type {AuthSession, CustomerProfile} from '@/types/account';
import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {AUTH_STORAGE_KEY, loginWithOtp, loginWithPassword, requestOtp} from '@/services/auth';
import {saveProfile} from '@/services/profile';
import AuthModal from '@/components/auth/AuthModal';

interface AuthContextValue {
    session: AuthSession | null;
    isAuthenticated: boolean;
    ready: boolean;
    loginOpen: boolean;
    openLogin: (onSuccess?: () => void) => void;
    closeLogin: () => void;
    sendOtp: (phone: string) => Promise<void>;
    verifyOtp: (phone: string, code: string) => Promise<void>;
    loginPassword: (phone: string, password: string) => Promise<void>;
    updateProfile: (profile: CustomerProfile) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [ready, setReady] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const successCallback = useRef<(() => void) | undefined>();

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
            if (saved) setSession(JSON.parse(saved) as AuthSession);
        } catch {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
        } finally {
            setReady(true);
        }
    }, []);

    const persist = useCallback((next: AuthSession | null) => {
        setSession(next);
        if (next) {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
            window.localStorage.setItem('rm-auth-token', next.accessToken);
        } else {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
            window.localStorage.removeItem('rm-auth-token');
        }
    }, []);

    const finishLogin = useCallback((next: AuthSession) => {
        persist(next);
        setLoginOpen(false);
        const callback = successCallback.current;
        successCallback.current = undefined;
        callback?.();
    }, [persist]);

    const openLogin = useCallback((onSuccess?: () => void) => {
        successCallback.current = onSuccess;
        setLoginOpen(true);
    }, []);

    const closeLogin = useCallback(() => {
        successCallback.current = undefined;
        setLoginOpen(false);
    }, []);

    const value: AuthContextValue = {
        session,
        isAuthenticated: Boolean(session),
        ready,
        loginOpen,
        openLogin,
        closeLogin,
        sendOtp: async phone => { await requestOtp(phone); },
        verifyOtp: async (phone, code) => finishLogin(await loginWithOtp(phone, code)),
        loginPassword: async (phone, password) => finishLogin(await loginWithPassword(phone, password)),
        updateProfile: async profile => {
            if (!session) return;
            const saved = await saveProfile(profile);
            persist({...session, profile: saved});
        },
        logout: () => persist(null),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            <AuthModal/>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const value = useContext(AuthContext);
    if (!value) throw new Error('useAuth must be used within AuthProvider');
    return value;
}
