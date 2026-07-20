import { getENV } from './env/env';

export const getLoginUrl = (): string => {
    return process.env.LOGIN_URL || 'https://aws-dev.d11zg0rn02l7j9.amplifyapp.com/login';
};

export const getConfig = () => {
    getENV();
    return {
        loginUrl: getLoginUrl(),
    };
};
