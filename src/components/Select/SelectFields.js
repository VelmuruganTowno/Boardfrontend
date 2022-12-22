import React from "react";
import Select from "react-select";
import "./Select.css";

const SelectFields = ({ onChange, options, value, className, placeholder }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      '&:hover': { borderColor: "#f46d25" },
      boxShadow: "none",
      borderColor: "#f46d25",
    }),
    indicatorsContainer: (styles, { data }) => ({
      ...styles,
      color: "#f46d25",
    }),
  };

  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
};

export default SelectFields;
