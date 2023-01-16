import useSWR from 'swr';

import { get_explore_summary } from './backendCRUD';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useProjects() {
  const { data, error } = useSWR({}, get_explore_summary, swrOptions);

  return {
    dBprojects: data,
    isLoading: !error && !data,
    isError: error,
  };
}
