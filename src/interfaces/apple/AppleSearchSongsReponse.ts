declare namespace AppleSearchSongsResponse {
  export interface Preview {
    url: string;
  }

  export interface Artwork {
    width: number;
    height: number;
    url: string;
    bgColor: string;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
  }

  export interface PlayParams {
    id: string;
    kind: string;
  }

  export interface Attributes {
    previews: Preview[];
    artwork: Artwork;
    artistName: string;
    url: string;
    discNumber: number;
    genreNames: string[];
    durationInMillis: number;
    releaseDate: string;
    name: string;
    isrc: string;
    albumName: string;
    playParams: PlayParams;
    trackNumber: number;
    composerName: string;
  }

  export interface Datum {
    id: string;
    type: string;
    href: string;
    attributes: Attributes;
  }

  export interface Songs {
    href: string;
    next: string;
    data: Datum[];
  }

  export interface Results {
    songs: Songs;
  }

  export interface AppleSearchSongsResponse {
    results: Results;
  }
}

export default AppleSearchSongsResponse;
