import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useLoading } from "../hooks/contexts/LoadingProvider";
import { useRouter } from "next/router";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
// Logged in users make their request with this axios instance with axios interceptors.
const useAxiosInterceptorFunction = () => {
  const [data, setData] = useState([]);
  const { setLoading } = useLoading();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  const [controller, setController] = useState<any>();

  const axiosFetch = async (configObj: any) => {
    const {
      method,
      url,
      requestConfig = {},
      axiosInstance = axiosPrivate,
    } = configObj;

    try {
      setLoading((prev) => {
        if (prev === false) {
          return true;
        }
        return prev;
      });
      const ctrl = new AbortController();
      setController(ctrl);
      const mthd = method.toLowerCase();
      const res = await axiosInstance[mthd](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setData(res.data);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("jwt");
        router.replace("/login");
      } else {
        toast.error(error.response?.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setLoading((prev) => {
        if (prev === true) {
          return false;
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  //console.log(data);
  return [data, axiosFetch];
};

export default useAxiosInterceptorFunction;

/*
// get
  axiosInstance: axios,
  method: 'GET',
  url: '/',
  requestConfig: {
      headers: {
          'Content-Language': 'en-US',
          //'Accept': 'text/html'
      }
  }

// post
  axiosInstance: axios,
  method: 'post',
  url: '/posts',
  requestConfig: {
      data: {
          userId: 10,
          title: 'Axios Stuff',
          body: 'Axios hook stuff'
      }
  }
*/
