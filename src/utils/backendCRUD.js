const axios = require('axios').default;

/*
function postHeaders() {
  let requestHeaders = new Headers();
  requestHeaders.append('accept', 'application/json');
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Access-Control-Allow-Origin', '*');
  requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);
  return requestHeaders;
} */

export const getSAFRunbyHash = async (user_id, project_id, run_hash) => {
  let requestHeaders = {
    accept: 'application/json',
  };

  let url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    user_id +
    '/projects/' +
    project_id +
    '/run/' +
    run_hash;

  let config = {
    method: 'GET',
    headers: requestHeaders,
    redirect: 'follow',
  };

  let safrun = await axios
    .get(url, config)
    .then((response) => {
      console.log(response);
      return response.data['output'];
    })
    .catch((error) => {
      console.log('error', error);
    });

  return safrun;
};

export const post_saf_run_and_get_hash = async (payload) => {
  let requestHeaders = {
    accept: 'application/json',
    Authorization: 'Bearer ' + sessionStorage.token,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    redirect: 'follow',
  };

  const url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    sessionStorage.user_id +
    '/projects/' +
    sessionStorage.project_id +
    '/run';

  let hash = await axios
    .post(url, payload, requestOptions)
    .then((result) => {
      return result.data['gus_run_hash'];
    })
    .catch((error) => {
      console.log('error', error);
    });
  return hash;
};

export const create_project_and_get_ID = async (payload) => {
  let requestHeaders = {
    accept: 'application/json',
    Authorization: 'Bearer ' + sessionStorage.token,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    redirect: 'follow',
  };

  const url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    sessionStorage.user_id +
    '/projects';

  let response = await axios
    .post(url, payload, requestOptions)
    .then((result) => {
      let data = result.data;
      const dbProjectId = data.id;
      sessionStorage.setItem('project_id', dbProjectId);
      return dbProjectId;
    })
    .catch((error) => {
      console.log('error', error);
    });

  return response;
};
