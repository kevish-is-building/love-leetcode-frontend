import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "production"
      ? `${import.meta.env.VITE_BACKEND_URL}/api/v1`
      : "http://localhost:8080/api/v1",
  withCredentials: true,
});

// Emit backend status events so UI can react globally
const emitBackendStatus = (status, detail = {}) => {
  if (typeof window !== "undefined" && window?.dispatchEvent) {
    try {
      window.dispatchEvent(
        new CustomEvent(`backend:${status}`, { detail: { ts: Date.now(), ...detail } }),
      );
    } catch (_) {
      // no-op
    }
  }
};

// Consider backend down on network errors (no response) or 5xx
axiosInstance.interceptors.response.use(
  (response) => {
    emitBackendStatus("up");
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const isNetworkError = !error?.response;
    if (isNetworkError || (status >= 500 && status <= 599)) {
      emitBackendStatus("down", { status, message: error?.message });
    }
    return Promise.reject(error);
  },
);
