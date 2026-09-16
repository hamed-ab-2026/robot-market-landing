'use client';

import {useEffect, useState} from 'react';
import {Alert, App, Button, Form, Input, Modal, Segmented, Typography} from 'antd';
import {LockOutlined, MobileOutlined, SafetyCertificateOutlined} from '@ant-design/icons';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

type LoginMode = 'otp' | 'password';

export default function AuthModal() {
    const auth = useAuth();
    const {message} = App.useApp();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const [mode, setMode] = useState<LoginMode>('otp');
    const [step, setStep] = useState<'phone' | 'code'>('phone');
    const [phone, setPhone] = useState('09123456789');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (auth.loginOpen) {
            setMode('otp');
            setStep('phone');
            setError('');
        }
    }, [auth.loginOpen]);

    const submit = async (values: {phone?: string; code?: string; password?: string}) => {
        setLoading(true);
        setError('');
        try {
            const currentPhone = (values.phone || phone).replace(/\s/g, '');
            if (mode === 'otp' && step === 'phone') {
                await auth.sendOtp(currentPhone);
                setPhone(currentPhone);
                setStep('code');
                message.success(copy.otpSent);
            } else if (mode === 'otp') {
                await auth.verifyOtp(currentPhone, values.code || '');
            } else {
                await auth.loginPassword(currentPhone, values.password || '');
            }
        } catch (caught) {
            setError(
                caught instanceof Error && caught.message === 'INVALID_PHONE'
                    ? copy.invalidPhone
                    : copy.invalidCredentials,
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={auth.loginOpen}
            onCancel={auth.closeLogin}
            footer={null}
            centered
            title={copy.login}
            destroyOnClose
        >
            <Segmented<LoginMode>
                block
                value={mode}
                onChange={value => {
                    setMode(value);
                    setStep('phone');
                    setError('');
                }}
                options={[
                    {label: copy.otpLogin, value: 'otp'},
                    {
                        label: copy.passwordLogin,
                        value: 'password',
                    },
                ]}
            />
            <Alert
                className="mt-5"
                type="info"
                showIcon
                message={copy.demoTitle}
                description={
                    <div>
                        <div>{copy.demoOtp}</div>
                        <div>{copy.demoPassword}</div>
                    </div>
                }
            />
            {error && <Alert className="mt-4" type="error" showIcon message={error} />}
            <Form
                layout="vertical"
                className="mt-5"
                onFinish={submit}
                initialValues={{phone: '09123456789', code: '12345', password: '123456'}}
            >
                {(mode === 'password' || step === 'phone') && (
                    <Form.Item
                        name="phone"
                        label={copy.phone}
                        rules={[{required: true, pattern: /^09\d{9}$/, message: copy.invalidPhone}]}
                    >
                        <Input dir="ltr" size="large" maxLength={11} prefix={<MobileOutlined />} />
                    </Form.Item>
                )}
                {mode === 'password' && (
                    <Form.Item name="password" label={copy.password} rules={[{required: true}]}>
                        <Input.Password dir="ltr" size="large" prefix={<LockOutlined />} />
                    </Form.Item>
                )}
                {mode === 'otp' && step === 'code' && (
                    <>
                        <Typography.Paragraph type="secondary">
                            {copy.phone}: <span dir="ltr">{phone}</span>
                        </Typography.Paragraph>
                        <Form.Item name="code" label={copy.otp} rules={[{required: true}]}>
                            <Input dir="ltr" size="large" maxLength={5} prefix={<SafetyCertificateOutlined />} />
                        </Form.Item>
                    </>
                )}
                <Button htmlType="submit" type="primary" size="large" block loading={loading}>
                    {mode === 'otp' ? (step === 'phone' ? copy.sendOtp : copy.verifyAndLogin) : copy.loginButton}
                </Button>
            </Form>
        </Modal>
    );
}
