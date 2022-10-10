import toast from 'react-hot-toast';

import fetch from './fetchWithTimeout';

export const getSAFRunbyHash = async (user_id, project_id, run_hash) => {
  let requestHeaders = new Headers();
  requestHeaders.append('accept', 'application/json');

  let payload;

  let requestOptions = {
    method: 'GET',
    headers: requestHeaders,
    body: payload,
    redirect: 'follow',
  };

  let url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    user_id +
    '/projects/' +
    project_id +
    '/run/' +
    run_hash;

  let safrun = await fetch(
    url,
    requestOptions,
    1000 * 60 * 30, // 30 mins
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((result) => {
      console.log(result);
      return result['output'];
    })
    .catch((error) => {
      console.log('error', error);
      toast.error('Run not found');
      return [];
    });

  return safrun;
};

export const post_saf_run_and_get_hash = async (payload) => {
  let requestHeaders = new Headers();
  requestHeaders.append('accept', 'application/json');
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Access-Control-Allow-Origin', '*');
  requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

  let requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    body: payload,
    redirect: 'follow',
  };

  let hash = await fetch(
    process.env.REACT_APP_API_ENDPOINT +
      '/api/v1/saf/users/' +
      sessionStorage.user_id +
      '/projects/' +
      sessionStorage.project_id +
      '/run',
    requestOptions,
    1000 * 60 * 30, // 30 mins
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      toast.error('Could not run SAF');
      throw new Error('Something went wrong');
    })
    .then((result) => {
      return result['gus_run_hash'];
    })
    .catch((error) => {
      console.log('error', error);
    });
  return hash;
};

export const create_project_and_get_ID = async (payload) => {
  let requestHeaders = new Headers();
  requestHeaders.append('accept', 'application/json');
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Access-Control-Allow-Origin', '*');
  requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

  let requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    body: payload,
    redirect: 'follow',
  };

  let response;

  try {
    response = await fetch(
      process.env.REACT_APP_API_ENDPOINT +
        '/api/v1/saf/users/' +
        sessionStorage.user_id +
        '/projects',
      requestOptions,
    );
  } catch (ex) {
    return toast.error(ex);
  }
  if (!response.ok) {
    return toast.error(response.status + ' : ' + response.statusText);
  }
  if (response.ok) {
    let data = await response.json();
    const dbProjectId = JSON.stringify(data.id);
    sessionStorage.setItem('project_id', dbProjectId);
    return dbProjectId;
  }
};
