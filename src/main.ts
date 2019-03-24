import { config } from 'dotenv';
import addSongToPlaylist from './handlers/addSongToPlaylist';

config();

export async function info() {
  const tokenData = {
    developerToken: process.env['DEVELOPER_TOKEN'],
    userToken: process.env['USER_TOKEN'],
  };
  const addData = {
    playlistId: 'p.1YeWgkXuqrqDQaN',
    songId: '1399735498',
  };

  return await addSongToPlaylist(addData, tokenData);
}

info();
