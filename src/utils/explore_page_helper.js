import useSWR from 'swr';

import { get_explore_table } from './backendCRUD';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useProjects() {
  const { data, error } = useSWR({} ,get_explore_table, swrOptions);

  return {
    dBprojects: data,
    isLoading: !error && !data,
    isError: error,
  };
}
