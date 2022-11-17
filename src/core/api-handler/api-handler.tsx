import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ErrorHandler = ({ children }: any) => {
  let API = process.env.REACT_APP_API_URL;
  const [errorStatusCode, setErrorStatusCode] = useState();
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => setErrorStatusCode(undefined));
    return unlisten;
  }, [history]);

  const renderContent = () => {
    if (errorStatusCode === 401) {
      axios.get(`${API}/Auth/refresh`, {
        withCredentials: true,
      });
    }
    return children;
  };
  const contextPayload = useMemo(
    () => ({ setErrorStatusCode }),
    [setErrorStatusCode]
  );

  return (
    <ErrorStatusContext.Provider value={contextPayload}>
      {renderContent()}
    </ErrorStatusContext.Provider>
  );
};

export const ErrorStatusContext = createContext<any>(undefined as any);

export const useErrorStatus = () => useContext(ErrorStatusContext);
