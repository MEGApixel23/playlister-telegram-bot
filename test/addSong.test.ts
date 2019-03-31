import { expect } from 'chai';
import { addSong } from '../src/handlers';
import * as TelegramBot from 'node-telegram-bot-api';

const botStub: TelegramBot = new TelegramBot('test-token');

botStub.sendMessage = async (chatId: string|number, text: string): Promise<TelegramBot.Message> => (
  <TelegramBot.Message><any> { text }
);

const messages = [
  {
    input: <TelegramBot.Message><any> {
      chat: {
        id: 'chat-id'
      },
      text: 'Some message https://google.com?i=1440532827 test',
    },
    output: 'Link format is unknown',
  },  {
    input: <TelegramBot.Message><any> {
      chat: {
        id: 'chat-id'
      },
      text: 'Some message https://itunes.apple.com/us/album/compass/1440532502?i=1440532827 test',
    },
    output: 'Song was successfully added to playlist',
  },
  {
    input: <TelegramBot.Message><any> {
      chat: {
        id: 'chat-id'
      },
      text: 'Some message https://play.google.com/music/m/Trfjwvhk3hmcgvsxkti56v75ere?t=Summer_Sun_-_Cari_Cari test',
    },
    output: 'Song was successfully added to playlist',
  }
];

describe('addSong handler', function () {
  this.timeout(5000);

  it('correctly adds song from apple music to apple music playlist', async () => {
    const handler = addSong(botStub);

    for (let i = 0; i < messages.length; i++) {
      const message = await handler(messages[i].input);

      expect(message).to.have.key('text');
      expect(message.text).to.be.equal(messages[i].output);
    }
  });
});
