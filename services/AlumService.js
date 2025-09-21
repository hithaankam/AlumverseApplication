import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Replace with your computer's actual local network IP address
const API_BASE_URL = "https://alumversebackend-production.up.railway.app/api"; 

// --- Create a dedicated Axios instance ---
const apiClient = axios.create({
    baseURL: API_BASE_URL
});

// --- Axios Request Interceptor ---
// This function will run before every request is sent.
apiClient.interceptors.request.use(
    async (config) => {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            // If the token exists, add it to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// --- Authentication Service ---
class AlumniAuthService {
    register(registerData) {
        return axios.post(`${API_BASE_URL}/auth/register`, registerData);
    }

    login(loginData) {
        return axios.post(`${API_BASE_URL}/auth/login`, loginData);
    }

    // Now an async function to store the token
    async storeToken(token) {
        try {
            await AsyncStorage.setItem('authToken', token);
        } catch (e) {
            console.error("Failed to save the auth token.", e);
        }
    }

    // Now an async function to get the token
    async getToken() {
        try {
            return await AsyncStorage.getItem('authToken');
        } catch (e) {
            console.error("Failed to fetch the auth token.", e);
            return null;
        }
    }

    // Now an async function to remove the token
    async logout() {
        try {
            await AsyncStorage.removeItem('authToken');
        } catch (e) {
            console.error("Failed to remove the auth token.", e);
        }
    }
}

export const authService = new AlumniAuthService();


// --- Alumni and Post Functions (Using the secure apiClient) ---

export const getAllAlumni = () => {
  return apiClient.get('/alumni');
};

export const searchAlumniByQuery = (name) => {
  return apiClient.get(`/alumni/search?name=${name}`);
}

export const getFeedPosts = () => {
  return apiClient.get('/posts');
};

export const createNewPost = (postData) => {
  return apiClient.post('/posts', postData);
};

export const likePost = (postId, alumniId) => {
  return apiClient.post(`/posts/${postId}/like`, `"${alumniId}"`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
