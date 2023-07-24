import { NextResponse } from 'next/server';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

//Do not throw error if API fails. Instead, return isPlaying: false so that the UI can render the last played song
const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const song = await response.json();

  if (song.is_playing === false) {
    return { isPlaying: false };
  }

  //Consider handling podcasts differently if Podcast data becomes available
  if (song.currently_playing_type === 'episode' && song.is_playing === true) {
    const type = 'podcast';
    const isPlaying = false;
    return { type, isPlaying };
  }

  if (song.currently_playing_type === 'track') {
    const artists = song.item.artists;
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: any) => _artist.name)
      .join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      artists,
    };
  }
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(RECENTLY_PLAYED, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    throw new Error('Error getting recently played songs');
  }

  const songs = await response.json();
  const album = songs.items[0].track.album.name;
  const albumImageUrl = songs.items[0].track.album.images[0].url;
  const title = songs.items[0].track.name;
  const songUrl = songs.items[0].track.external_urls.spotify;
  const artists = songs.items[0].track.artists;
  const artist = songs.items[0].track.artists;
  const isPlaying = false;

  return {
    title,
    songUrl,
    artists,
    albumImageUrl,
    album,
    artist,
    isPlaying,
  };
};

export async function GET(req: Request, res: Response) {
  const url = req.url;
  const response = await getNowPlaying();

  if (response?.isPlaying === true) {
    return NextResponse.json(response, { status: 200 });
  }

  if (response?.isPlaying === false) {
    const res = await getRecentlyPlayed();

    return NextResponse.json(res, { status: 200 });
  }
}
