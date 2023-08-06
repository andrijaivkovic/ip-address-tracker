import { createContext, useContext, useReducer, useEffect } from "react";

// const API_KEY = "at_ILyj2Mly8ZIotD9XF5LFAfLA6bajb";
const API_KEY = "at_804cmMHvpnD6B7NXaIEDiETAlueR5";

const formatSearchQuery = (searchQuery) => {
  try {
    const splitSearchQuery = searchQuery.split(".");

    if (splitSearchQuery.length === 2) {
      // console.log("stripped domain");
      return searchQuery;
    }

    if (splitSearchQuery.length === 4) {
      // console.log("ip address");
      return searchQuery;
    }

    const { hostname: formatedSearchQuery } = new URL(searchQuery);

    console.log("manually stripped domain", formatedSearchQuery);

    return searchQuery;
  } catch (error) {
    throw new Error("Enter a valid IP address or domain name...");
  }
};

const AppContext = createContext();

const initialState = {
  info: null,
  isLoading: false,
  searchQuery: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "info/loading":
      return { ...state, isLoading: true, error: "" };
    case "info/loaded":
      return { ...state, info: action.payload, isLoading: false };
    case "info/rejected":
      return { ...state, error: action.payload, isLoading: false };
    case "info/searched":
      return { ...state, searchQuery: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
};

const AppProvider = ({ children }) => {
  const [{ info, isLoading, searchQuery, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (searchQuery) return;
    const getInfo = async () => {
      try {
        dispatch({ type: "info/loading" });
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to load info...");

        const data = await res.json();
        console.log(data);
        dispatch({ type: "info/loaded", payload: data });
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "info/rejected", payload: error.message });
      }
    };

    getInfo();
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const getSearchedInfo = async () => {
        try {
          dispatch({ type: "info/loading" });

          const formatedSearchQuery = formatSearchQuery(searchQuery);

          const res = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${formatedSearchQuery}&domain=${formatedSearchQuery}`
          );

          if (!res.ok) throw new Error("Failed to load info...");

          const data = await res.json();
          dispatch({ type: "info/loaded", payload: data });
        } catch (error) {
          console.error(error.message);
          dispatch({ type: "info/rejected", payload: error.message });
        }
      };
      getSearchedInfo();
    }
  }, [searchQuery]);

  return (
    <AppContext.Provider
      value={{ info, isLoading, searchQuery, error, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("This context was used outside of AppContext!");

  return context;
};

export { useApp, AppProvider };
