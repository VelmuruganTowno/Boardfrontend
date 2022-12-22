import React from 'react';
import { Typography, Tabs, Tab, Box, Stack, TextField, Grid, Button } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link } from "react-router-dom";
import { DatePicker } from "@material-ui/pickers";
import Select from "react-select";


const TrainClass = [{ label: "1AC", value: "1AC" }, { label: "2AC", value: "2AC" }, { label: "3AC", value: "3AC" }, { label: "Sleeper", value: "Sleeper" }];

export default function TrainForm({ trainInput, setTrainInput,trainInputError, setTrainInputError, classes }) {

    const validateField = (name,value)=>{
        var error = "";
        
        switch (name) {
            case 'trainFrom':
            case 'trainTo':
                error = value.length < 3 ? 'Required' : "";
                break;
            case 'trainAdults':
                error = /^\+?\d+$/.test(value) ? "" : "Enter a valid positive no.";
                break;
            case 'trainAmount':
                error = /^\+?\d+$/.test(value) ? "" : "Enter valid amount";
                break;
        }
        return error
    }

    const handleRemoveClickTrain = (index) => {
        const list = [...trainInput];
        list.splice(index, 1);
        setTrainInput(list);

        const listError = [...trainInputError];
        listError.splice(index, 1);
        setTrainInputError(listError);
    };

    const handleAddClickTrain = () => {
        setTrainInput([
            ...trainInput,
            { id: "", traintravelClass: "", trainName: "", trainFrom: "", trainTo: "", trainDepartDate: "", trainPnr: "", trainAdults: "", trainChild: "", trainInclusion: "", trainAmount: "", trainComission: "" },
        ]);

        setTrainInputError([
            ...trainInputError,
            { id: "", traintravelClass: "", trainName: "", trainFrom: "", trainTo: "", trainDepartDate: "", trainPnr: "", trainAdults: "", trainChild: "", trainInclusion: "", trainAmount: "", trainComission: "" },
        ]);
    };

    const handleTrainChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...trainInput];
        list[index][name] = value;
        setTrainInput(list);

        const listError = [...trainInputError];
        const error = validateField(name,value.trim())
        listError[index][name] = error;
        setTrainInputError(listError)
    };

    const handleTrainSelectChange = (name, value, index) => {
        const list = [...trainInput];
        list[index][name] = value;
        setTrainInput(list);
    };

    return (
        <>
            <Stack style={{ padding: '0.8em 0.5em'}}>
                {trainInput.map((x, i) => (
                    <>
                        <Grid container columnSpacing={1.5} rowSpacing={1} key={i}>
                            <Grid item sm={6}>
                                {i == 0 && (
                                    <p style={{fontSize:'18px',margin:'0',color:'#f46d25',fontWeight:'500'}}>Train Details</p>
                                )}
                            </Grid>
                            <Grid item sm={6} style={{ textAlign: "end",fontSize:'14px' }}>
                                {trainInput.length !== 1 && (
                                    <DeleteIcon
                                        onClick={() => handleRemoveClickTrain(i)}
                                        className={classes.plus}
                                    />
                                )}
                                {trainInput.length - 1 === i && (
                                    <AddCircleOutlineIcon
                                        onClick={handleAddClickTrain}
                                        size="small"
                                        className={classes.plus}
                                    />
                                )}
                            </Grid>
                            <div
                                style={{
                                    width: "2%",
                                    textAlign: "center",
                                    marginTop: "1em",
                                    fontSize:'14px' 
                                }}
                            >
                                {i + 1 + "."}
                            </div>
                            <div style={{ width: '97%', marginTop: '1em' }}>
                                <Stack direction='row' spacing={1} >
                                    <CustomTextInlineField name="trainName" label='Train Name' value={x.trainName} onChange={(e) => { handleTrainChange(e, i) }} />
                                    <CustomTextInlineField name="trainFrom" label='From*' value={x.trainFrom} onChange={(e) => { handleTrainChange(e, i) }} error={trainInputError[i]['trainFrom']} />
                                    <CustomTextInlineField name="trainTo" label='To*' value={x.trainTo} onChange={(e) => { handleTrainChange(e, i) }} error={trainInputError[i]['trainTo']}/>
                                    <DatePicker
                                        label="DepartureDate"
                                        size="small"
                                        autoOk
                                        required
                                        format="dd-MM-yyyy"
                                        inputVariant="outlined"
                                        fullWidth
                                        // disablePast={true}
                                        disablePast={x.trainDepartDate ? false : true}
                                        variant="inline"
                                        value={x.trainDepartDate ? x.trainDepartDate : null}
                                        onChange={(e) => handleTrainSelectChange("trainDepartDate", e, i)}
                                        minDate={x.trainDepartDate ? x.trainDepartDate : new Date()} />
                                </Stack>
                                <Box style={{marginTop:'0.7%'}}>
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={3}>
                                            <Select
                                                name="traintravelClass"
                                                placeholder='Travel Class'
                                                value={TrainClass.filter(i => i.value === x.traintravelClass)}
                                                options={TrainClass}
                                                onChange={(e) => handleTrainSelectChange("traintravelClass", e.value, i)}
                                                styles={{
                                                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                                    control: (base, state) => ({
                                                        ...base,
                                                        "&:hover": { borderColor: "#f46d25" },
                                                        borderColor: "#f46d25",
                                                        boxShadow: "none",
                                                        width: '100%',
                                                    }),
                                                }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CustomTextInlineField name="trainPnr" label='PNR No' value={x.trainPnr} onChange={(e) => { handleTrainChange(e, i) }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CustomTextInlineField name="trainAdults" label='Adults*' value={x.trainAdults} onChange={(e) => { handleTrainChange(e, i) }} error={trainInputError[i]['trainAdults']} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CustomTextInlineField name="trainChild" label='Children' style={{ backgroundColor: '#fff' }} value={x.trainChild} onChange={(e) => { handleTrainChange(e, i) }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box style={{marginTop:'0.7%'}}>
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={3}>
                                            <CustomTextInlineField name="trainInclusion" label='Inclusion' style={{ backgroundColor: '#fff' }} value={x.trainInclusion} onChange={(e) => { handleTrainChange(e, i) }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CustomTextInlineField name="trainAmount" label='Amount*' style={{ backgroundColor: '#fff' }} value={x.trainAmount} onChange={(e) => { handleTrainChange(e, i) }} error={trainInputError[i]['trainAmount']}  />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CustomTextInlineField name="trainComission" label='Commission' style={{ backgroundColor: '#fff' }} value={x.trainComission} onChange={(e) => { handleTrainChange(e, i) }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                        </Grid>
                    </>
                ))}
            </Stack>
            <br />
        </>
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
        onChange={props.onChange}
        sx={{
            // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
            '& .MuiInputBase-input': { height: 0 }
        }}
    />
    {props.error.length>0 && <span style={{"color":"#ff0000"}}>{props.error}</span>}
    </>)
}

CustomTextInlineField.defaultProps = {
    error: "",
  }      


