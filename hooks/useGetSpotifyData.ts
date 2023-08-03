import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useGetSpotifyData = () => {
  const { data, error, isLoading } = useSWR('/api/spotify-song', fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetSpotifyData;
