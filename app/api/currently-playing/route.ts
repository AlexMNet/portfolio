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

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// If error return isPlaying false so that the UI can render the last played song
export async function GET(req: Request, res: Response) {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    const song = await response.json();

    if (song.is_playing === false) {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    if (song.currently_playing_type === 'episode' && song.is_playing === true) {
      const type = 'podcast';
      const isPlaying = true;
      return NextResponse.json({ type, isPlaying }, { status: 200 });
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
      return NextResponse.json(
        { album, albumImageUrl, artist, isPlaying, songUrl, title, artists },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log('Currently playing error: ', error);
    return NextResponse.json({ isPlaying: false }, { status: 200 });
  }
}
