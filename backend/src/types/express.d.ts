import 'express';

declare global {
    namespace Express {
        interface Request {
            access_token?: string,
            return_address?: string
        }
    }
}

export {};
