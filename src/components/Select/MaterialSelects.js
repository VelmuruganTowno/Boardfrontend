import React from "react";
import Select, { components } from "react-select";
import "./Select.css";

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

const MaterialSelects = ({
  onChange,
  options,
  value,
  className,
  placeholder,
  isClearable,
}) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        defaultValue={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
        placeholder={placeholder}
        components={{
          ValueContainer: CustomValueContainer,
        }}
        isClearable={isClearable}
        styles={{
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
            backgroundColor:"#fff",
            padding: "0px 5px",
            transition: "top 0.1s, font-size 0.1s",
            fontSize: "12px",
          }),
          control: (base, state) => ({
            ...base,
            "&:hover": { borderColor: "#080808" },
            borderColor: "#f46d25",
            backgroundColor:"#fff",
            boxShadow: "none",
          }),
          indicatorsContainer: (styles, { data }) => ({
            ...styles,
            color: "#f46d25",
          }),
        }}
      />
    </div>
  );
};

export default MaterialSelects;
