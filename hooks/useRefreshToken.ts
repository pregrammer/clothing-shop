import axios from "../api/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const { accessToken } = response.data;
    localStorage.setItem("jwt", accessToken);
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
