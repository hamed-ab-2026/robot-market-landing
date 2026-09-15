'use client';

import {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import {ToolOutlined} from '@ant-design/icons';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';

const STORAGE_KEY = 'rm-development-notice-seen';

export default function DevelopmentNotice() {
    const [open, setOpen] = useState(false);
    const {locale} = useLanguage();
    const copy = commerceCopy[locale];

    useEffect(() => {
        try {
            setOpen(localStorage.getItem(STORAGE_KEY) !== 'true');
        } catch {
            // Show the notice even when browser storage is unavailable.
            setOpen(true);
        }
    }, []);

    const dismiss = () => {
        setOpen(false);
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
            // Dismissing the notice must not depend on storage access.
        }
    };

    return (
        <Modal open={open} centered title={copy.developmentTitle} onCancel={dismiss}
               footer={<Button type="primary" onClick={dismiss}>{copy.acknowledge}</Button>}>
            <ToolOutlined className="text-brand-400 text-3xl my-4"/>
            <p className="text-secondary leading-8">{copy.developmentMessage}</p>
        </Modal>
    );
}
