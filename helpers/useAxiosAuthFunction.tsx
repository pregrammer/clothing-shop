import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useLoading } from "../hooks/contexts/LoadingProvider";
import { useRouter } from "next/router";

import axios, { axiosPrivate } from "../api/axios";
// Logged in users make their request with this axios instance.
const useAxiosAuthFunction = () => {
  const [data, setData] = useState([]);
  const { setLoading } = useLoading();
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
      const accessToken = localStorage.getItem("jwt");
      const getConfig = {
        ...requestConfig,
        signal: ctrl.signal,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      let res;
      if (mthd === "get") {
        res = await axiosInstance[mthd](url, {
          ...requestConfig,
          signal: ctrl.signal,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        res = await axiosInstance[mthd](
          url,
          {
            ...requestConfig,
            signal: ctrl.signal,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      setData(res.data);
    } catch (error: any) {
      if (error.response?.status === 403) {
        try {
          setLoading((prev) => {
            if (prev === false) {
              return true;
            }
            return prev;
          });
          const response = await axios.get("/auth/refresh", {
            withCredentials: true,
          });

          const { accessToken: newAccessToken } = response.data;
          localStorage.setItem("jwt", newAccessToken);
          const mthd = method.toLowerCase();
          let res;
          if (mthd === "get") {
            res = await axiosInstance[mthd](url, {
              ...requestConfig,
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
          } else {
            res = await axiosInstance[mthd](
              url,
              {
                ...requestConfig,
              },
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
          }
          setData(res.data);
        } catch (error: any) {
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
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
      } /* else if (error.response?.status === 401) {
        localStorage.removeItem("jwt");
        router.replace("/login");
      } */ else {
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

export default useAxiosAuthFunction;

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
