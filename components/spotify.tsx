'use client';

import { Typography } from './ui/typography';
import Image from 'next/image';
import { SiSpotify } from '@icons-pack/react-simple-icons';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export function Spotify() {
  const { data, error, isLoading } = useSWR('/api/spotify-song', fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (error) return null;

  return (
    <>
      {isLoading ? (
        <div className="flex flex-row h-24 border p-2 rounded-md animate-pulse">
          <div className="aspect-square h-full">
            <div className="h-full w-full bg-gray-400 rounded-md"></div>
          </div>
          <div className="flex flex-col justify-center space-y-2 ml-2">
            <Typography variant="xsText" className="text-gray-500 font-mono">
              Loading...
            </Typography>
            <div className="h-2 w-36 bg-gray-400"></div>
            <div className="h-2 w-24 bg-gray-400"></div>
          </div>
          <div className="ml-auto self-center">
            <div className="w-16 h-16 rounded-full bg-gray-400"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-row h-24 border p-2 rounded-md">
          <div className="aspect-square h-full">
            <Image
              src={data.albumImageUrl}
              width={1000}
              height={1000}
              alt="Album art cover"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-2 ml-2">
            <Typography
              variant="xsText"
              weight="light"
              className={`font-mono text-gray-500 ${
                data.isPlaying ? 'animate-pulse' : ''
              }`}
            >
              {data.isPlaying ? 'Now Playing' : 'Last Played'}
            </Typography>
            <Typography
              variant="smallText"
              weight="bold"
              className="line-clamp-1"
            >
              {data.title}
            </Typography>

            <Typography
              variant="xsText"
              weight="light"
              className="line-clamp-1"
            >
              {data.artists[0].name}
            </Typography>
          </div>
          <div className="ml-auto self-center px-2">
            <SiSpotify
              size={40}
              className={`text-[#1DB954] ${
                data.isPlaying ? 'animate-spin' : ''
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
}
