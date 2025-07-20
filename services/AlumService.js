import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/alumni';

export const getAllAlumni = () => {
  return axios.get(REST_API_BASE_URL);
};
export const searchAlumniByquery = (name) => {
  return axios.get(REST_API_BASE_URL + '/search?name=' + name);
}

export const createAlumni = (alumni) => axios.post(REST_API_BASE_URL, alumni);

