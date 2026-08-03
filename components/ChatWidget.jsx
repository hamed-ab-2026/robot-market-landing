'use client';

// آیکون شناور چت گوشه صفحه؛ با کلیک یک مودال گفتگوی ساده باز می‌شود (فعلاً بدون اتصال به بک‌اند واقعی).

import { useEffect, useRef, useState } from 'react';
import { Modal, Input, Button, Tooltip } from 'antd';
import { MessageOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ChatWidget() {
  const { t, dir } = useLanguage();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  // Seed the bot greeting once, in the current language.
  useEffect(() => {
    setMessages([{ from: 'bot', text: t.chat.initialBotMessage }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.chat.initialBotMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setDraft('');

    // -----------------------------------------------------------------
    // TODO: Connect to a real chat/support backend (e.g. via axios or a
    // websocket) instead of this local placeholder reply.
    //
    // import axios from 'axios';
    // const { data } = await axios.post('/api/chat', { message: text });
    // setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
    // api() <===> todo : use this func to fetch ...

    // -----------------------------------------------------------------
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: t.chat.fallbackReply }]);
    }, 600);
  };

  return (
    <>
      <Tooltip title={t.chat.fabLabel} placement="left">
        <button
          onClick={() => setOpen(true)}
          aria-label={t.chat.fabLabel}
          className="fixed bottom-6 z-40 w-14 h-14 rounded-full bg-brand hover:bg-brand-400 text-ink-950 shadow-brandGlow flex items-center justify-center text-2xl transition-transform hover:scale-105"
          style={dir === 'rtl' ? { left: '1.5rem' } : { right: '1.5rem' }}
        >
          <MessageOutlined />
        </button>
      </Tooltip>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        closeIcon={<CloseOutlined />}
        title={t.chat.title}
        centered
      >
        <div
          ref={scrollRef}
          className="flex flex-col gap-3 h-80 overflow-y-auto py-2 px-1"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                m.from === 'user'
                  ? 'self-end bg-brand text-ink-950'
                  : 'self-start bg-surface-strong text-primary'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3 border-t border-subtle pt-3">
          <Input
            size="large"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onPressEnter={handleSend}
            placeholder={t.chat.placeholder}
          />
          <Button type="primary" size="large" icon={<SendOutlined />} onClick={handleSend}>
            {t.chat.send}
          </Button>
        </div>
      </Modal>
    </>
  );
}
