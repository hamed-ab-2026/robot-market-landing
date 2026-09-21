'use client';

import {useEffect, useState} from 'react';
import {DeleteOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import {Alert, App, Avatar, Button, Form, Input, Radio, Upload} from 'antd';
import type {UploadProps} from 'antd';
import type {CustomerProfile} from '@/types/account';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

export default function ProfilePage() {
    const auth = useAuth();
    const {message} = App.useApp();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const [form] = Form.useForm<CustomerProfile>();
    const [saving, setSaving] = useState(false);
    const customerType = Form.useWatch('type', form);
    const avatarUrl = Form.useWatch('avatarUrl', form);

    const uploadProps: UploadProps = {
        accept: 'image/png,image/jpeg,image/webp',
        maxCount: 1,
        showUploadList: false,
        beforeUpload: async file => {
            const isValidImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            if (!isValidImage || file.size > MAX_AVATAR_SIZE) {
                message.error(copy.invalidAvatar);
                return Upload.LIST_IGNORE;
            }

            form.setFieldsValue({avatarUrl: await fileToDataUrl(file)});
            return false;
        },
    };

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
                <Form.Item name="avatarUrl" hidden>
                    <Input />
                </Form.Item>
                <Form.Item label={copy.avatar}>
                    <div className="flex flex-wrap items-center gap-4">
                        <Avatar size={88} src={avatarUrl} icon={<UserOutlined />} className="bg-primary/10 text-primary" />
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>{avatarUrl ? copy.changePhoto : copy.uploadPhoto}</Button>
                                </Upload>
                                {avatarUrl && (
                                    <Button icon={<DeleteOutlined />} onClick={() => form.setFieldsValue({avatarUrl: ''})}>
                                        {copy.removePhoto}
                                    </Button>
                                )}
                            </div>
                            <p className="text-xs text-secondary">{copy.avatarHint}</p>
                        </div>
                    </div>
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
