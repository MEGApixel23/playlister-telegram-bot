export interface AddSongToPlaylistRequest {
  playlistId: string
  songId: string
}

export interface AppleMusicAddRequestEntity {
  id: string
  type: string
}

export interface AppleMusicAddRequest {
  data: AppleMusicAddRequestEntity[]
}