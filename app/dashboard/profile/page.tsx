'use client';

import {useEffect, useState} from 'react';
import {Alert, App, Button, Form, Input, Radio} from 'antd';
import type {CustomerProfile} from '@/types/account';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

export default function ProfilePage() {
    const auth = useAuth();
    const {message} = App.useApp();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const [form] = Form.useForm<CustomerProfile>();
    const [saving, setSaving] = useState(false);
    const customerType = Form.useWatch('type', form);
    useEffect(() => {
        if (auth.session) form.setFieldsValue(auth.session.profile);
    }, [auth.session, form]);
    const submit = async (values: CustomerProfile) => {
        setSaving(true);
        try {
            await auth.updateProfile(values);
            message.success(copy.saved);
        } finally {
            setSaving(false);
        }
    };
    return (
        <>
            <h1 className="text-3xl font-extrabold text-primary">{copy.profile}</h1>
            <p className="text-secondary mt-3 mb-7">{copy.invoicePending}</p>
            <Form
                form={form}
                layout="vertical"
                onFinish={submit}
                className="rounded-2xl border border-subtle bg-elevated p-5 md:p-7"
            >
                <Form.Item name="type" label={copy.customerType} rules={[{required: true}]}>
                    <Radio.Group
                        optionType="button"
                        buttonStyle="solid"
                        options={[
                            {
                                label: copy.individual,
                                value: 'individual',
                            },
                            {
                                label: copy.corporate,
                                value: 'corporate',
                            },
                        ]}
                    />
                </Form.Item>
                <div className="grid md:grid-cols-2 gap-x-5">
                    <Form.Item name="firstName" label={copy.firstName} rules={[{required: true}]}>
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item name="lastName" label={copy.lastName} rules={[{required: true}]}>
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item name="phone" label={copy.phone}>
                        <Input size="large" dir="ltr" disabled />
                    </Form.Item>
                    <Form.Item name="email" label={copy.email} rules={[{type: 'email'}]}>
                        <Input size="large" dir="ltr" />
                    </Form.Item>
                    {customerType === 'corporate' && (
                        <>
                            <Form.Item name="companyName" label={copy.companyName} rules={[{required: true}]}>
                                <Input size="large" />
                            </Form.Item>
                            <Form.Item name="nationalId" label={copy.nationalId} rules={[{required: true}]}>
                                <Input size="large" dir="ltr" />
                            </Form.Item>
                            <Form.Item name="economicCode" label={copy.economicCode}>
                                <Input size="large" dir="ltr" />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item name="province" label={copy.province} rules={[{required: true}]}>
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item name="city" label={copy.city} rules={[{required: true}]}>
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item name="postalCode" label={copy.postalCode} rules={[{required: true}]}>
                        <Input size="large" dir="ltr" maxLength={10} />
                    </Form.Item>
                    <Form.Item name="preferredCallTime" label={copy.preferredCallTime}>
                        <Input size="large" />
                    </Form.Item>
                </div>
                <Form.Item name="address" label={copy.address} rules={[{required: true}]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Alert type="info" showIcon message={copy.verifiedPhone} className="mb-6" />
                <Button type="primary" htmlType="submit" size="large" loading={saving}>
                    {copy.save}
                </Button>
            </Form>
        </>
    );
}
