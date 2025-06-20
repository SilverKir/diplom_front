import React, { useState, useEffect } from "react";

export const withDataFC = (endpoint, dataToState) => (Component) => {
  return (props) => {
    const [state, setState] = useState([]);

    const fetchData = () => {
      if (typeof endpoint === "function") {
        endpoint = endpoint(props);
      }

      fetch(endpoint)
        .then((result) => result.json())
        .then((data) => setState(dataToState(data)));
    };

    useEffect(() => {
      fetchData(endpoint);
    }, [endpoint]);

    return <Component {...props} {...state} />;
  };
};
