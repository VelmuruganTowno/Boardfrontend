import React from "react";
import Select, { components } from "react-select";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const customStyles = {
  width: "100%",
  container: (provided) => ({
    ...provided,
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: "visible",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -4 : "50%",
    background: "#fff",
    padding: "0px 5px",
    transition: "top 0.1s, font-size 0.1s",
    fontSize: "12px",
  }),
  control: (base, state) => ({
    ...base,
    "&:hover": { borderColor: "#f46d25" },
    borderColor: "#f46d25",
    boxShadow: "none",
  }),
  indicatorsContainer: (styles, { data }) => ({
    ...styles,
    color: "#f46d25",
  }),
};

function CustomSelect({
  style,
  label,
  options,
  onChange,
  defaultValue,
  isMulti,
  placeholder,
}) {
  return (
    <div style={style}>
      <Select
        styles={customStyles}
        isMulti={isMulti}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        components={{
          ValueContainer: CustomValueContainer,
        }}
      />
    </div>
  );
}

export default CustomSelect;
