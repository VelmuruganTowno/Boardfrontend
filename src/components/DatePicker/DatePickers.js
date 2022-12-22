import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePickers = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable={true}
        name={field.name}
        value={field.value}
        format="dd/MM/yyyy"
        helperText={currentError}
        variant="inline"
        autoOk={true}
        disableFuture
        fullWidth
        size="small"
        emptyLabel="DD/MM/YYYY"
        inputVariant="outlined"
        onChange={(date) => form.setFieldValue(field.name, date, false)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickers;
