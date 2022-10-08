import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useLoading } from "../hooks/contexts/LoadingProvider";

import axios from "../api/axios";
// for making normal request
const useAxiosFunction = () => {
  const [data, setData] = useState([]);
  const { setLoading } = useLoading();

  const [controller, setController] = useState<any>();

  const axiosFetch = async (configObj: any) => {
    const {
      method,
      url,
      requestConfig = {},
      axiosInstance = axios,
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
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

export default useAxiosFunction;

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
