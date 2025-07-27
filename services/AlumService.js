import axios from 'axios';

const ALUMNI_API_BASE_URL = 'http://localhost:8080/api/alumni';
const POSTS_API_BASE_URL = 'http://localhost:8080/api/posts';

// Alumni-related functions
export const getAllAlumni = () => {
  return axios.get(ALUMNI_API_BASE_URL);
};

export const searchAlumniByquery = (name) => {
  return axios.get(`${ALUMNI_API_BASE_URL}/search?name=${name}`);
}

export const createAlumni = (alumni) => {
  return axios.post(ALUMNI_API_BASE_URL, alumni);
}

// New functions for the posts and feed feature
export const getFeedPosts = () => {
  return axios.get(POSTS_API_BASE_URL);
};

export const createNewPost = (postData) => {
  return axios.post(POSTS_API_BASE_URL, postData);
};

export const likePost = (postId, alumniId) => {
  // We need to send the alumniId as a JSON string in the request body
  return axios.post(`${POSTS_API_BASE_URL}/${postId}/like`, `"${alumniId}"`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};