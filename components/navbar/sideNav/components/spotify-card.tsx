'use client';

import useGetSpotifyData from '@/hooks/useGetSpotifyData';
import { SiSpotify } from '@icons-pack/react-simple-icons';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

export default function SpotifyCard() {
  const { data, error, isLoading } = useGetSpotifyData();

  if (error) return null;
  return (
    <>
      {isLoading ? (
        <Card className="w-[200px] animate-pulse bg-transparent">
          <div className="p-2 pb-0">
            <div className="w-[182px] h-[182px] bg-gray-400 rounded-md"></div>
          </div>

          <CardHeader className="px-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="w-1/2 h-2 rounded-sm bg-gray-400"></div>
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            </div>
            <div className="w-3/4 h-4 bg-gray-400 rounded-sm"></div>
            <div className="w-2/3 h-3 bg-gray-400 rounded-sm"></div>
          </CardHeader>
        </Card>
      ) : (
        <a href={data.songUrl} target="_blank">
          <Card className="w-[200px] bg-transparent">
            <div className="p-2 pb-0">
              <img
                src={data.albumImageUrl}
                className="w-100 aspect-square object-contain rounded-md"
                alt="Spotify album cover art"
              />
            </div>

            <CardHeader className="px-4 pt-4">
              <div className="flex justify-between items-center">
                <Typography
                  variant="xsText"
                  weight="light"
                  className={`font-mono text-gray-500 ${
                    data.isPlaying ? 'animate-pulse' : ''
                  }`}
                >
                  {data.isPlaying ? 'Now Playing' : 'Last Played'}
                </Typography>
                <SiSpotify
                  size={12}
                  className={`text-[#1DB954] ${
                    data.isPlaying ? 'animate-spin' : ''
                  }`}
                />
              </div>
              <CardTitle className="line-clamp-2">{data.title}</CardTitle>
              <CardDescription className="line-clamp-1">
                {data.artists[0].name}
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
      )}
    </>
  );
}
