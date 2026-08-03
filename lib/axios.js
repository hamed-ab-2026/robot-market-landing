import axios from 'axios';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== 'undefined' ? window.localStorage.getItem('rm-auth-token') : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

// console.log('[API request]', config.method?.toUpperCase(), config.url);

        return config;


    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response) {

            const status = error.response.status;

            if (status === 401) {
                // window.localStorage.removeItem('rm-auth-token');
                // window.location.href = '/login';
            }

            if (status >= 500) {
                // message.error('خطایی در سرور رخ داد. لطفاً بعداً تلاش کنید.');
            }
        } else if (error.request) {
            // درخواست ارسال شد ولی هیچ جوابی نیومد (قطعی اینترنت، سرور خاموش و ...)
            // TODO: message.error('اتصال با سرور برقرار نشد.');
        }


        return Promise.reject(error);

    }
);

export default api;