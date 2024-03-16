import axios from "axios";

export const METHOD = {
    "GET": "GET",
    "POST": "POST",
    "PUT": "PUT",
    "PATCH": "PATCH",
    "DELETE": "DELETE"
  };  // uppercase constant or configuration object
  
Object.freeze(METHOD);

const axiosOptions = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const makeRequest = async (dispatch, requestAction, successAction, failureAction, method, url, data) => {
  try {
    dispatch(requestAction());
    let response;
  
    switch (method.toUpperCase()) {
      case METHOD.GET:
        response = await axios.get(url);
        break;
      case METHOD.POST:
        response = await axios.post(url, data, axiosOptions);
        break;
      case METHOD.PUT:
        response = await axios.put(url, data, axiosOptions);
        break;
      case METHOD.PATCH:
        response = await axios.patch(url, data, axiosOptions);
        break;
      case METHOD.DELETE:
        response = await axios.delete(url, {data}, axiosOptions);
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }

    dispatch(successAction(response?.data));
  } catch (error) {
    dispatch(failureAction(error.response?.data?.message)); 
  }
};

{ /*

import axios from "axios";

// Create a custom Axios instance with default configurations
const apiClient = axios.create({
  baseURL: "https://your-api-url.com",
  headers: {
    "Content-Type": "application/json",
    // Add other default headers if needed
  },
});

// Add request and response interceptors for error handling and authorization
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available (example)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses or perform other actions
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    // Log and handle errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export const makeRequest = async (dispatch, requestAction, successAction, failureAction, method, url, data) => {
  try {
    dispatch(requestAction());
    let response;

    switch (method.toUpperCase()) {
      case 'GET':
        response = await apiClient.get(url);
        break;
      case 'POST':
        response = await apiClient.post(url, data);
        break;
      case 'PUT':
        response = await apiClient.put(url, data);
        break;
      case 'PATCH':
        response = await apiClient.patch(url, data);
        break;
      case 'DELETE':
        response = await apiClient.delete(url, { data });
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }

    dispatch(successAction(response?.data));
  } catch (error) {
    dispatch(failureAction(error.response?.data?.message)); 
  }
};



*/}