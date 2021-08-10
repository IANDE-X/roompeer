import { useState } from "react";

const useSelect = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (value) => {
    setValue(value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useSelect;
