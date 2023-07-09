import { createContext, useContext, useReducer } from "react";

export const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

const intialState = {
  isOpenSidebar: false,
  isModal: false,
  isLoading: false,
  isKey: "",
  isMessage: { status: "", message: "" },
  isId: "",
  isEdit: false,
};

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SET_ID":
      return { ...state, isId: action.payload };
    case "SET_SIDEBAR_IS_OPEN":
      return { ...state, isOpenSidebar: action.payload };
    case "SET_IS_MODAL":
      return { ...state, isModal: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_KEY":
      return { ...state, isKey: action.payload };
    case "SET_MESSAGE":
      return { ...state, isMessage: action.payload };
    case "SET_IS_EDIT":
      return { ...state, isEdit: action.payload };
    default:
      throw new Error();
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);
  const appContextValue = [state, dispatch];

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
