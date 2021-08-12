import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setError(false);
    setValue(event.target.value);
    if (event.target.value === "") setError(true);
  };

  return {
    value,
    onChange: handleChange,
    error: error,
    helperText: error ? "This field is required!" : "",
  };
};

export default useInput;
