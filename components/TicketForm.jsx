'use client';

import { Form, Input, Select, Button, message } from 'antd';
import { useLanguage } from '@/app/context/LanguageContext';

const { TextArea } = Input;

export default function TicketForm() {
  const { t, locale } = useLanguage();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    // -------------------------------------------------------------------
    // TODO: Connect to the real ticketing/support API.
    //
    // import axios from 'axios';
    //
    // try {
    //   await axios.post('/api/tickets', values);
    // } catch (err) {
    //   message.error('...');
    //   return;
    // }
    // -------------------------------------------------------------------
    console.log('Ticket submitted (placeholder):', values);
    message.success(t.ticket.successMsg);
    form.resetFields();
  };

  return (
    <section id="support" className="relative px-6 md:px-16 py-20 md:py-28 bg-page border-t border-subtle">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-brand-400 text-sm font-semibold tracking-wide">{t.ticket.eyebrow}</span>
          <h2 className="text-2xl md:text-4xl font-extrabold brand-gradient-text mt-3 mb-3">
            {t.ticket.title}
          </h2>
          <p className="text-secondary text-sm md:text-base">{t.ticket.subtitle}</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          initialValues={{ priority: 'medium' }}
        >
          <div className="grid md:grid-cols-2 gap-x-4">
            <Form.Item
              label={<span className="text-secondary">{t.ticket.name}</span>}
              name="name"
              rules={[{ required: true, message: t.ticket.requiredMsg }]}
            >
              <Input size="large" placeholder={t.ticket.namePlaceholder} />
            </Form.Item>

            <Form.Item
              label={<span className="text-secondary">{t.ticket.phone}</span>}
              name="phone"
              rules={[
                { required: true, message: t.ticket.requiredMsg },
                { pattern: /^[0-9+\s-]{7,15}$/, message: t.ticket.invalidPhone },
              ]}
            >
              <Input size="large" placeholder={t.ticket.phonePlaceholder} dir="ltr" />
            </Form.Item>
          </div>

          <div className="grid md:grid-cols-2 gap-x-4">
            <Form.Item
              label={<span className="text-secondary">{t.ticket.email}</span>}
              name="email"
              rules={[{ type: 'email', message: t.ticket.invalidEmail }]}
            >
              <Input size="large" placeholder={t.ticket.emailPlaceholder} dir="ltr" />
            </Form.Item>

            <Form.Item
              label={<span className="text-secondary">{t.ticket.priority}</span>}
              name="priority"
            >
              <Select
                size="large"
                options={t.ticket.priorities.map((p) => ({ value: p.value, label: p.label }))}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-secondary">{t.ticket.subject}</span>}
            name="subject"
            rules={[{ required: true, message: t.ticket.requiredMsg }]}
          >
            <Input size="large" placeholder={t.ticket.subjectPlaceholder} />
          </Form.Item>

          <Form.Item
            label={<span className="text-secondary">{t.ticket.message}</span>}
            name="message"
            rules={[{ required: true, message: t.ticket.requiredMsg }]}
          >
            <TextArea rows={5} placeholder={t.ticket.messagePlaceholder} />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button type="primary" size="large" htmlType="submit" block>
              {t.ticket.submit}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
