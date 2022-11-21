import toast from 'react-hot-toast';

const axios = require('axios').default;

/* ------------------- default parameters ------------------- */

const requestHeaders = {
  accept: 'application/json',
  Authorization: 'Bearer ' + sessionStorage.token,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const getConfig = {
  method: 'GET',
  headers: requestHeaders,
  redirect: 'follow',
};

/* ------------------- Auth ------------------- */

export const register_user = async (createUserPayload) => {
  const createUserRequestHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const createUserRequestOptions = {
    method: 'POST',
    headers: createUserRequestHeaders,
    redirect: 'follow',
  };

  let url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/users/';

  return axios
    .post(url, createUserPayload, createUserRequestOptions)
    .then((res) => res.data)
    .catch((error) => onError(error));
};

export const get_user_token = async (tokenPayload) => {
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

  return axios
    .post(url, formBody, getTokenRequestOptions)
    .then((result) => {
      sessionStorage.setItem('token', result.data.access_token);
    })
    .catch((error) => onError(error));
};

export const get_user_me_info = async () => {
  const url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/users/me/';

  return await axios
    .get(url, getConfig)
    .then((response) => {
      sessionStorage.setItem('user_id', response.data.id);
      sessionStorage.setItem('user_name', response.data.name);
      return response.data;
    })
    .catch((error) => onError(error));
};

/* ------------------- SAF ------------------- */

export const get_saf_run_by_hash = async (run_hash) => {
  const user_id = sessionStorage.user_id;
  const project_id = sessionStorage.project_id;

  const url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    user_id +
    '/projects/' +
    project_id +
    '/run/' +
    run_hash;

  return axios
    .get(url, getConfig)
    .then((res) => res.data['output'])
    .catch((error) => onError(error));
};

export const post_saf_run_and_get_hash = async (payload) => {
  const user_id = sessionStorage.user_id;
  const project_id = sessionStorage.project_id;

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
    .catch((error) => onError(error));
  return hash;
};

export const create_project_and_get_ID = async (payload) => {
  let requestOptions = {
    method: 'POST',
    headers: requestHeaders,
    redirect: 'follow',
  };

  const url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    sessionStorage.user_id +
    '/projects/';

  let response = await axios
    .post(url, payload, requestOptions)
    .then((result) => {
      let data = result.data;
      const dbProjectId = data.id;
      sessionStorage.setItem('project_id', dbProjectId);
      return dbProjectId;
    })
    .catch((error) => onError(error));

  return response;
};

/* ------------------- Account ------------------- */
export const get_user_projects = async (user_id) => {
  const url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/saf/users/' + user_id + '/projects/';

  return await axios
    .get(url, getConfig)
    .then((response) => response.data)
    .catch((error) => onError(error));
};

export const get_saf_runs_by_projectID = async (project_id) => {
  const user_id = sessionStorage.user_id;

  const url =
    process.env.REACT_APP_API_ENDPOINT +
    '/api/v1/saf/users/' +
    user_id +
    '/projects/' +
    project_id +
    '/runs';

  return await axios.get(url, getConfig).then((res) => res.data['runs']);
};

export const get_all_user_runs = async (projectList) => {
  // Initialize empty array to store all runs
  let allRuns = [];
  // Loop through each project and get all runs
  for (let i = 0; i < projectList.projects.length; i++) {
    let runs = await get_saf_runs_by_projectID(projectList.projects[i].id);
    allRuns = allRuns.concat(runs);
  }
  // Return all runs
  return allRuns;
};

/* ------------------- Explore ------------------- */

export const get_all_portfolio_projects = async () => {
  const url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/saf/projects/in_portfolio';

  return await axios
    .get(url, getConfig)
    .then((response) => response.data['projects'])
    .catch((error) => onError(error));
};

export const get_all_locs_for_portfolio_projects = async () => {
  const url = process.env.REACT_APP_API_ENDPOINT + '/api/v1/saf/projects/in_portfolio/locations/';

  return await axios
    .get(url, getConfig)
    .then((response) => response.data)
    .catch((error) => onError(error));
};

/* ------------------- Error Handling ------------------- */
function onError(error) {
  console.error(error);
  toast.error(error.message);
}
