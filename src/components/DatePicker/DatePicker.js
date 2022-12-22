import React from 'react';
import { KeyboardDatePicker,MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                clearable
                name={field.name}
                value={field.value}
                format="dd/MM/yyyy"
                inputVariant="outlined"
                fullWidth
                size="small"
                helperText={currentError}
                onChange={date => form.setFieldValue(field.name, date, false)}
                {...other}
            />
        </MuiPickersUtilsProvider>
    );
};


export default DatePicker;
