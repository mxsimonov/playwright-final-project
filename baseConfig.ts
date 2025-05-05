import path from 'path';

export const authFile = path.join(__dirname, process.env.AUTH_FILE as string);