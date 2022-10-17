import { useReducer, useCallback } from "react";

const initailState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...currHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return initailState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initailState);

  const clear = useCallback(() => {
    dispatchHttp({ type: "CLEAR" });
  }, []);

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      dispatchHttp({ type: "SEND", identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((resData) => {
          dispatchHttp({
            type: "RESPONSE",
            responseData: resData,
            extra: reqExtra,
          });
        })
        .catch((error) => {
          dispatchHttp({ type: "ERROR", errorMessage: error.message });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
      reqIdentifier: httpState.identifier,
    clear: clear
  };
};

export default useHttp;
