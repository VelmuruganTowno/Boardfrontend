import React from "react";
import Select from "react-select";
import { useField } from "formik";

export default function SelectField(props) {
  // eslint-disable-next-line no-unused-vars
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  
  const customStyles = {
    control: (base, state) => ({
      ...base,
      '&:hover': { borderColor: "#f46d25" },
      boxShadow: "none",
      borderColor: "#f46d25",
      // You can also use state.isFocused to conditionally style based on the focus state
    }),
    multiValue: (styles, { data }) => {
      
      return {
        ...styles,
        backgroundColor: "#F46D25",
        color:"#fff",
        borderRadius:"5px"
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#fff",
    }),
    indicatorsContainer: (styles, { data }) => ({
      ...styles,
      color: "#f46d25",
    }),
  };

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Select
      {...props}
      value={state?.value}
      isMulti
      onChange={onChange}
      onBlur={setTouched}
      styles={customStyles}
    />
  );
}
