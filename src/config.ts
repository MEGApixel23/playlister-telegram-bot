import { config } from 'dotenv';

config();

export const TELEGRAM_TOKEN: string = process.env['TELEGRAM_TOKEN'];
export const APPLE_MUSIC_DEVELOPER_TOKEN: string = process.env['APPLE_MUSIC_DEVELOPER_TOKEN'];
export const APPLE_MUSIC_USER_TOKEN: string = process.env['APPLE_MUSIC_USER_TOKEN'];
