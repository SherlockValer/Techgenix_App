import { createContext, useContext, useEffect, useState } from "react";



const GlobalContext = createContext();

const useGlobalContext = () => useContext(GlobalContext);
export default useGlobalContext;

export const GlobalContextProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState({});


  // Fetch user data
  useEffect(() => {
    fetch(`${API_URL}/login/67dce53d2b5635c333cd19df`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        API_URL,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
