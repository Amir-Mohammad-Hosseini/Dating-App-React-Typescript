import axios from "axios";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const publicPaths = ["/", "/login", "/signup"];
    const isPublic = publicPaths.includes(window.location.pathname);

    if (status === 401 && !isPublic) {
      window.location.replace("/");
    }
    return Promise.reject(error);
  },
);

export default customFetch;
