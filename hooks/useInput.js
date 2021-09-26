import { useState } from "react";

const useInput = (
  initialValue,
  required = false,
  sensitive = false,
  validation = { regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/, errorMessage: "Password must contain at least 8 characters,one numeric digit, one uppercase and one lowercase letter !" }
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("This field is required!");

  var passrgx = validation.regex;

  const handleChange = (event) => {
    setError(false);
    setValue(event.target.value);
    if (sensitive) {
      if (event.target.value.match(passrgx)) {
        setError(false);
      } else {
        setErrorMessage(validation.errorMessage);
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
