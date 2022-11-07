const axios = require('axios').default;

/* ------------------- Auth ------------------- */

export const getUserToken = async (tokenPayload) => {
  const getTokenRequestHeaders = {
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  let formBody = [];
  for (var property in tokenPayload) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(tokenPayload[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const getTokenRequestOptions = {
    method: 'POST',
    headers: getTokenRequestHeaders,
    redirect: 'follow',
  };

  const url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/token';

  let token = await axios
    .post(url, formBody, getTokenRequestOptions)
    .then((result) => {
      sessionStorage.setItem('token', result.data.access_token);
    })
    .catch((error) => console.log('error', error));

  return token;
};

export const getUserMeInfo = async () => {
  const getUserRequestHeaders = {
    accept: 'application/json',
    Authorization: 'Bearer ' + sessionStorage.token,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const config = {
    method: 'GET',
    headers: getUserRequestHeaders,
    redirect: 'follow',
  };

  let url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/users/me/';

  let userInfo = await axios
    .get(url, config)
    .then((response) => {
      sessionStorage.setItem('user_id', response.data.id);
      sessionStorage.setItem('user_name', response.data.name);
      return response.data;
    })
    .catch((error) => {
      console.log('error', error);
    });

  return userInfo;
};

/* ------------------- SAF ------------------- */
/*
function postHeaders() {
  let requestHeaders = new Headers();
  requestHeaders.append('accept', 'application/json');
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Access-Control-Allow-Origin', '*');
  requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);
  return requestHeaders;
} */

export const getSAFRunbyHash = async (run_hash) => {
  const user_id = sessionStorage.user_id;
  const project_id = sessionStorage.project_id;

  const requestHeaders = {
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

  return axios.get(url, config).then((res) => res.data['output']);
};

export const post_saf_run_and_get_hash = async (payload) => {
  const user_id = sessionStorage.user_id;
  const project_id = sessionStorage.project_id;

  const requestHeaders = {
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
    user_id +
    '/projects/' +
    project_id +
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
  const requestHeaders = {
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

/* ------------------- Account ------------------- */
export const getUserProjects = async (user_id) => {
  const getUserRequestHeaders = {
    accept: 'application/json',
    Authorization: 'Bearer ' + sessionStorage.token,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const config = {
    method: 'GET',
    headers: getUserRequestHeaders,
    redirect: 'follow',
  };

  let url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/saf/users/' + user_id + '/projects/';

  return await axios
    .get(url, config)
    .then((response) => response.data)
    .catch((error) => {
      console.log('error', error);
    });
};
