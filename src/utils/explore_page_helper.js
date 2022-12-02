import useSWR from 'swr';

import { get_projects } from './backendCRUD';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useProjects() {
  const args = { publish: true };
  const { data, error } = useSWR(args, get_projects, swrOptions);

  return {
    dBprojects: data,
    isLoading: !error && !data,
    isError: error,
  };
}
