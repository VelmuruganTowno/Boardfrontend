import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";

const FlightTripOption = [{ label: "Oneway", value: "Oneway" }, { label: "Round", value: "Round" }];

export default function FlightForm({ flightInput, setFlightInput, flightInputError, setFlightInputError, classes }) {
    const validateField = (name,value)=>{
        var error = "";
        
        switch (name) {
            case 'flightFrom':
            case 'flightTo':
                error = value.length < 3 ? 'Required' : "";
                break;
            case 'flightAdults':
                error = /^\+?\d+$/.test(value) ? "" : "Enter a valid positive no.";
                break;
            case 'flightAmount':
                error = /^\+?\d+$/.test(value) ? "" : "Enter valid amount";
                break;
        }
        return error
    }
    const handleRemoveClickFlight = (index) => {
        const list = [...flightInput];
        list.splice(index, 1);
        setFlightInput(list);

        const listError = [...flightInputError];
        listError.splice(index, 1);
        setFlightInputError(listError);
    };
    const handleAddClickFlight = () => {
        setFlightInput([
            ...flightInput,
            { id: "", flightTrip: "", flightName: "", flightFrom: "", flightTo: "", flightDepartDate: "", flightReturnDate: "", flightPnr: "", flightAdults: " ", flightChild: " ", flightInclusion: "", flightAmount: "", flightComission: "" },
        ]);

        setFlightInputError([
            ...flightInputError,
            { id: "", flightTrip: "", flightName: "", flightFrom: "", flightTo: "", flightDepartDate: "", flightReturnDate: "", flightPnr: "", flightAdults: " ", flightChild: " ", flightInclusion: "", flightAmount: "", flightComission: "" },
        ]);
    };
    const handleFlightChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...flightInput];
        list[index][name] = value;
        setFlightInput(list);

        const listError = [...flightInputError];
        const error = validateField(name,value.trim())
        listError[index][name] = error;
        setFlightInputError(listError)
    };

    const handleFlightSelectChange = (name, value, index) => {
        const list = [...flightInput];
        list[index][name] = value;
        setFlightInput(list);
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ padding: '0.8em 0.5em' }}>
                    {flightInput.map((x, i) => (
                        <>
                            <Grid container columnSpacing={1.5} rowSpacing={1} key={i} >
                                <Grid item sm={6}>
                                    {i == 0 && (
                                        <p style={{fontSize:'18px',margin:'0',color:'#f46d25',fontWeight:'500'}}>Flight Details</p>
                                    )}
                                </Grid>
                                <Grid item sm={6} style={{ textAlign: "end",fontSize:'14px' }}>
                                    {flightInput.length !== 1 && (
                                        <DeleteIcon
                                            onClick={() => handleRemoveClickFlight(i)}
                                            className={classes.plus}
                                        />
                                    )}
                                    {flightInput.length - 1 === i && (
                                        <AddCircleOutlineIcon
                                            onClick={handleAddClickFlight}
                                            size="small"
                                            className={classes.plus}
                                        />
                                    )}
                                </Grid>
                                <Grid item sm={3}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={1}>
                                            <span style={{ marginTop: "1em", marginLeft: '-0.6em',fontSize:'14px' }}>{i + 1 + "."}</span>
                                        </Grid>
                                        <Grid item sm={11}>
                                            <Select
                                                name="flightTrip"
                                                placeholder='Trip'
                                                value={FlightTripOption.filter(i => i.value === x.flightTrip)}
                                                options={FlightTripOption}
                                                onChange={(e) => handleFlightSelectChange("flightTrip", e.value, i)}
                                                styles={{
                                                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                                    control: (base, state) => ({
                                                        ...base,
                                                        "&:hover": { borderColor: "#f46d25" },
                                                        borderColor: "#f46d25",
                                                        boxShadow: "none",
                                                        width: '109%',
                                                        marginLeft: '-1.5em'
                                                    }),
                                                    placeholder: (provided, state) => ({
                                                        ...provided,
                                                        position: "absolute",
                                                        top:
                                                            state.hasValue ||
                                                                state.selectProps.inputValue
                                                                ? -4
                                                                : "50%",
                                                        background: "#fff",
                                                        padding: "0px 5px",
                                                        transition: "top 0.1s, font-size 0.1s",
                                                        fontSize: "16px",
                                                    }),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={3}>
                                    <CustomTextInlineField name="flightName" label="Flight Name" value={x.flightName} onChange={(e) => { handleFlightChange(e, i) }} />
                                </Grid>
                                <Grid item sm={3}>
                                    <CustomTextInlineField name="flightFrom" label="From*" value={x.flightFrom} onChange={(e) => { handleFlightChange(e, i) }} error={flightInputError[i]['flightFrom']} />
                                </Grid>
                                <Grid item sm={3}>
                                    <CustomTextInlineField name="flightTo" label="To*" value={x.flightTo} onChange={(e) => { handleFlightChange(e, i) }} error={flightInputError[i]['flightTo']} />
                                </Grid>
                                <Grid item sm={3}>
                                    <DatePicker
                                        label="DepartureDate"
                                        size="small"
                                        autoOk
                                        required
                                        format="dd-MM-yyyy"
                                        inputVariant="outlined"
                                        fullWidth
                                        // disablePast={true}
                                        disablePast={x.flightDepartDate ? false : true}
                                        variant="inline"
                                        value={x.flightDepartDate ? x.flightDepartDate : null}
                                        onChange={(e) => handleFlightSelectChange("flightDepartDate", e, i)}
                                        minDate={x.flightDepartDate ? x.flightDepartDate : new Date()}
                                    />
                                </Grid>
                                {x.flightTrip === "Round" ? (
                                    <Grid item sm={3}>
                                        <DatePicker
                                            label="Return Date"
                                            size="small"
                                            autoOk
                                            required
                                            format="dd-MM-yyyy"
                                            inputVariant="outlined"
                                            fullWidth
                                            // disablePast={true}
                                            variant="inline"
                                            value={x.flightReturnDate ? x.flightReturnDate : null}
                                            onChange={(e) => handleFlightSelectChange("flightReturnDate", e, i)}
                                            minDate={x.flightDepartDate ? x.flightDepartDate : new Date()}
                                        />
                                    </Grid>) : null}
                                <Grid item sm={3}>
                                    <CustomTextInlineField name="flightPnr" label="PNR No" value={x.flightPnr} onChange={(e) => { handleFlightChange(e, i) }} />
                                </Grid>
                                <Grid item sm={3}>
                                    <CustomTextInlineField name="flightAdults" label="Adults*" value={x.flightAdults} onChange={(e) => { handleFlightChange(e, i) }} error={flightInputError[i]['flightAdults']} />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="flightChild" label='Children' style={{ backgroundColor: '#fff' }} value={x.flightChild} onChange={(e) => { handleFlightChange(e, i) }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="flightInclusion" label='Inclusion' style={{ backgroundColor: '#fff' }} value={x.flightInclusion} onChange={(e) => { handleFlightChange(e, i) }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="flightAmount" label='Amount*' style={{ backgroundColor: '#fff' }} value={x.flightAmount} onChange={(e) => { handleFlightChange(e, i) }} error={flightInputError[i]['flightAmount']} />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="flightComission" label='Commisssion' style={{ backgroundColor: '#fff' }} value={x.flightComission} onChange={(e) => { handleFlightChange(e, i) }} />
                                </Grid>
                            </Grid>
                        </>
                    ))}
                </div><br />
            </MuiPickersUtilsProvider>
        </div >
    )
}

function CustomTextInlineField(props) {
    return (<>
    <TextField
        name={props.name}
        fullWidth
        label={props.label}
        value={props.value}
        autoFocus
        variant="outlined"
        size="small"
        // style={{ backgroundColor: '#fff', color: "#f46d25" }}
        sx={{
            // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
            '& .MuiInputBase-input':{height:0}
        }}
        onChange={props.onChange}
    />
    {props.error.length>0 && <span style={{"color":"#ff0000"}}>{props.error}</span>}
    </>
    )
}

CustomTextInlineField.defaultProps = {
    error: "",
  }