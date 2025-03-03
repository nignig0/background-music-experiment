import 'express';

declare global {
    namespace Express {
        interface Request {
            access_token?: any
        }
    }
}

export {};
