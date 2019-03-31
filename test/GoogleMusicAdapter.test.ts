import { expect } from 'chai';
import GoogleMusicAdapter from '../src/musicServiceAdapters/GoogleMusicAdapter';

describe('GoogleMusicAdapter', () => {
  it('returns valid music service name', () => {
    const adapter = new GoogleMusicAdapter();

    expect(adapter.getName()).to.be.equal('google');
  });

  it('gets song information by google music link', async () => {
    const adapter = new GoogleMusicAdapter();
    const remoteSongInfo = await adapter.getSongInfoRemote(
      'https://play.google.com/music/m/Trfjwvhk3hmcgvsxkti56v75ere?t=Summer_Sun_-_Cari_Cari'
    );

    expect(remoteSongInfo).to.be.not.empty;
    expect(remoteSongInfo.meta).to.be.not.empty;
    expect(remoteSongInfo.meta.title).to.be.equal('Summer Sun - Cari Cari');
  });

  it('gets song information with special chars by google music link', async () => {
    const adapter = new GoogleMusicAdapter();
    const remoteSongInfo = await adapter.getSongInfoRemote(
      'https://play.google.com/music/m/T7hr6ohuqcuqnmwmw23m6wbkroq?t=Baba_O_Riley_-_The_Who'
    );

    expect(remoteSongInfo).to.be.not.empty;
    expect(remoteSongInfo.meta).to.be.not.empty;
    expect(remoteSongInfo.meta.title).to.be.equal('Baba O\'Riley - The Who');
  });
});
