import { useState } from "react";

const useInput = (initialValue, required = false, sensitive = false) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("This field is required!");

  var passrgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/;

  const handleChange = (event) => {
    setError(false);
    setValue(event.target.value);
    if (event.target.value === "") setError(true);
    if (sensitive) {
      if (event.target.value.match(passrgx)) {
        setError(false);
      } else {
        setErrorMessage("Password must contain at least 8 characters,one numeric digit, one uppercase and one lowercase letter !");
        setError(true);
      }
    }
  };

  return required
    ? {
        value,
        onChange: handleChange,
        error: error,
        helperText: error ? errorMessage : "",
        required,
      }
    : {
        value,
        onChange: handleChange,
      };
};

export default useInput;
