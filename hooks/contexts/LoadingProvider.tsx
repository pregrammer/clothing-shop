import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Props {
  children: React.ReactNode;
}
interface LoadingObjectProp {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext({} as LoadingObjectProp);

export const useLoading = () => {
  return useContext(LoadingContext);
};

const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
