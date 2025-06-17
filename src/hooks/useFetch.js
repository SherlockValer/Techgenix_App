import { useState, useEffect } from "react";

const useFetch = (apiUrl, type) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl, {
      mode: 'cors'
    })
      .then((res) => {
        if (!res.ok) {
          throw "Failed to fetch data. Try again later!";
        }
        return res.json();
      })
      .then((data) => {
        if (type === "product") {
          setData(data.productData);
        } else {
          setData(data);
        }
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  return { data, loading, error };
};

export default useFetch;
