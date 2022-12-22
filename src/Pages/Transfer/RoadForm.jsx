import React from 'react';
import { Box, Stack, TextField, Grid } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Select from "react-select";

const CabTrip = [{ label: "Pickup", value: "Pickup" }, { label: "Drop", value: "Drop" }, { label: "Round", value: "Round" }];
const CabType = [{ label: "Private", value: "Private" }, { label: "SIC", value: "SIC" }];
const CabVehicle = [{ label: "Hatchback", value: "Hatchback" }, { label: "SUV", value: "SUV" }, { label: "Sedan", value: "Sedan" }, { label: "12 Seater", value: "12 Seater" }, { label: "24 Seater", value: "24 Seater" }, { label: "48 Seater", value: "48 Seater" }]

const getTransferVehicleOptions = (transferType) => {
    if (transferType === "Private") {
        return [{ label: "Sedan", value: "Sedan" }, { label: "Hatchback", value: "Hatchback" }, { label: "SUV", value: "SUV" }]
    } else if (transferType === "SIC") {
        return [{ label: "12 Seater", value: "12 Seater" }, { label: "24 Seater", value: "24 Seater" }, { label: "48 Seater", value: "48 Seater" }]
    } else { return [] }

}

export default function RoadForm({ cabInput, setCabInput, busInput, setBusInput, cabInputError, setCabInputError, busInputError, setBusInputError, classes }) {

    const validateField = (name, value) => {
        var error = "";

        switch (name) {
            case 'cabFrom':
            case 'busFrom':
            case 'cabTo':
            case 'busTo':
                error = value.length < 3 ? 'Required' : "";
                break;
            case 'cabAdults':
            case 'busAdults':
                error = /^\+?\d+$/.test(value) ? "" : "Enter a valid positive no.";
                break;
            case 'cabAmount':
            case 'busAmount':
                error = /^\+?\d+$/.test(value) ? "" : "Enter valid amount";
                break;
        }
        return error
    }

    const handleRemoveClickCab = (index) => {
        const list = [...cabInput];
        list.splice(index, 1);
        setCabInput(list);

        const listError = [...cabInputError];
        listError.splice(index, 1);
        setCabInputError(listError);
    };
    const handleAddClickCab = () => {
        setCabInput([
            ...cabInput,
            { id: "", cabFrom: "", cabTo: "", cabTrip: "", cabType: "", cabVehicle: "", cabAdults: "", cabChild: "", cabAmount: "", cabCommission: "" },
        ]);

        setCabInputError([
            ...cabInputError,
            { id: "", cabFrom: "", cabTo: "", cabTrip: "", cabType: "", cabVehicle: "", cabAdults: "", cabChild: "", cabAmount: "", cabCommission: "" },
        ]);
    };
    const handleCabChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...cabInput];
        list[index][name] = value;
        setCabInput(list);

        const listError = [...cabInputError];
        const error = validateField(name, value.trim())
        listError[index][name] = error;
        setCabInputError(listError)
    };
    const handleCabSelectChange = (name, value, index) => {
        const list = [...cabInput];
        list[index][name] = value;
        setCabInput(list);
    };

    const handleRemoveClickBus = (index) => {
        const list = [...busInput];
        list.splice(index, 1);
        setBusInput(list);
    };
    const handleAddClickBus
        = () => {
            setBusInput([
                ...busInput,
                { id: "", busName: "", busFrom: "", busTo: "", busSeatNo: "", busAdults: "", busChild: "", busAmount: "", busCommission: "" },
            ]);

            setBusInputError([
                ...busInputError,
                { id: "", busName: "", busFrom: "", busTo: "", busSeatNo: "", busAdults: "", busChild: "", busAmount: "", busCommission: "" },
            ]);
        };
    const handleBusChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...busInput];
        list[index][name] = value;
        setBusInput(list);

        const listError = [...busInputError];
        const error = validateField(name, value.trim())
        listError[index][name] = error;
        setBusInputError(listError)
    };

    return (<div>
        <Stack style={{ padding: '0.8em 0.5em'}}>
            {cabInput.map((x, i) => (<div key={i}>
                <Grid container columnSpacing={1.5} rowSpacing={1} >
                    <Grid item sm={6}>
                        {i == 0 && (
                            <p style={{fontSize:'18px',margin:'0',color:'#f46d25',fontWeight:'500'}}>Cab Details</p>
                        )}
                    </Grid>
                    <Grid item sm={6} style={{ textAlign: "end",fontSize:'14px' }}>
                        {cabInput.length !== 1 && (
                            <DeleteIcon
                                onClick={() => handleRemoveClickCab(i)}
                                className={classes.plus}
                            />
                        )}
                        {cabInput.length - 1 === i && (
                            <AddCircleOutlineIcon
                                onClick={handleAddClickCab}
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
                            <CustomTextInlineField name="cabFrom" label='From*' value={x.cabFrom} onChange={(e) => { handleCabChange(e, i) }} error={cabInputError[i]['cabFrom']}/>
                            <CustomTextInlineField name="cabTo" label='To*' value={x.cabTo} onChange={(e) => { handleCabChange(e, i) }} error={cabInputError[i]['cabTo']}/>
                            <Select
                                name="cabTrip"
                                placeholder='Pickup/Drop/Round'
                                value={CabTrip.filter(i => i.value === x.cabTrip)}
                                options={CabTrip}
                                onChange={(e) => handleCabSelectChange("cabTrip", e.value, i)}
                                styles={{
                                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                    control: (base, state) => ({
                                        ...base,
                                        "&:hover": { borderColor: "#f46d25" },
                                        borderColor: "#f46d25",
                                        boxShadow: "none",
                                        width: '310px',
                                    }),
                                }}
                            />
                            <Select
                                name="cabType"
                                placeholder='Private/SIC'
                                value={CabType.filter(i => i.value === x.cabType)}
                                options={CabType}
                                onChange={(e) => handleCabSelectChange("cabType", e.value, i)}
                                styles={{
                                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                    control: (base, state) => ({
                                        ...base,
                                        "&:hover": { borderColor: "#f46d25" },
                                        borderColor: "#f46d25",
                                        boxShadow: "none",
                                        width: '310px',
                                    }),
                                }}
                            />
                        </Stack>
                        <Box style={{ marginTop: '0.7%' }}>
                            <Grid container columnSpacing={1}>
                                <Grid item xs={3}>
                                    <Select
                                        name="cabVehicle"
                                        placeholder='Select'
                                        value={CabVehicle.filter(i => i.value === x.cabVehicle)}
                                        // options={CabVehicle}
                                        options={getTransferVehicleOptions(x.cabType)}
                                        onChange={(e) => handleCabSelectChange("cabVehicle", e.value, i)}
                                        styles={{
                                            menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                            control: (base, state) => ({
                                                ...base,
                                                "&:hover": { borderColor: "#f46d25" },
                                                borderColor: "#f46d25",
                                                boxShadow: "none",
                                                width: '100%',
                                            }),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="cabAdults" label='Adults*' value={x.cabAdults} onChange={(e) => { handleCabChange(e, i) }} error={cabInputError[i]['cabAdults']}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="cabChild" label='Children' value={x.cabChild} onChange={(e) => { handleCabChange(e, i) }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="cabAmount" label='Amount*' style={{ backgroundColor: '#fff' }} value={x.cabAmount} onChange={(e) => { handleCabChange(e, i) }} error={cabInputError[i]['cabAmount']} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box style={{ marginTop: '0.7%' }}>
                            <Grid container columnSpacing={1}>
                                <Grid item xs={3}>
                                    <CustomTextInlineField name="cabCommission" label='Commission' style={{ backgroundColor: '#fff' }} value={x.cabCommission} onChange={(e) => { handleCabChange(e, i) }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Grid>
            </div>
            ))
            }
        </Stack >
        <Stack style={{padding: '0.8em 0.5em'}}>
            {busInput.map((x, i) => (
                <div key={i}>
                    <Grid container columnSpacing={1.5} rowSpacing={1}>
                        <Grid item sm={6}>
                            {i == 0 && (
                                <p style={{fontSize:'18px',margin:'0',color:'#f46d25',fontWeight:'500'}}>Bus Details</p>
                            )}
                        </Grid>
                        <Grid item sm={6} style={{ textAlign: "end" }}>
                            {busInput.length !== 1 && (
                                <DeleteIcon
                                    onClick={() => handleRemoveClickBus(i)}
                                    className={classes.plus}
                                />
                            )}
                            {busInput.length - 1 === i && (
                                <AddCircleOutlineIcon
                                    onClick={handleAddClickBus}
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
                                <CustomTextInlineField name="busName" label='Bus Name' value={x.busName} onChange={(e) => { handleBusChange(e, i) }} />
                                <CustomTextInlineField name="busFrom" label='From*' value={x.busFrom} onChange={(e) => { handleBusChange(e, i) }} error={busInputError[i]['busFrom']} />
                                <CustomTextInlineField name="busTo" label='To*' value={x.busTo} onChange={(e) => { handleBusChange(e, i) }} error={busInputError[i]['busTo']}/>
                                <CustomTextInlineField name="busSeatNo" label='Seat No' value={x.busSeatNo} onChange={(e) => { handleBusChange(e, i) }} />
                            </Stack>
                            <Box style={{ marginTop: '0.7%' }}>
                                <Grid container columnSpacing={1}>
                                    <Grid item xs={3}>
                                        <CustomTextInlineField name="busAdults" label='Adult*' value={x.busAdults} onChange={(e) => { handleBusChange(e, i) }} error={busInputError[i]['busAdults']}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomTextInlineField name="busChild" label='Children' value={x.busChild} onChange={(e) => { handleBusChange(e, i) }} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomTextInlineField name="busAmount" label='Amount*' style={{ backgroundColor: '#fff' }} value={x.busAmount} onChange={(e) => { handleBusChange(e, i) }} error={busInputError[i]['busAmount']}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomTextInlineField name="busCommission" label='Commission' style={{ backgroundColor: '#fff' }} value={x.busCommission} onChange={(e) => { handleBusChange(e, i) }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </Grid>
                </div>
            ))
            }
        </Stack > <br />
    </div>
    );
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
        style={{ backgroundColor: '#fff', color: "#f46d25",borderColor:'#f46d25' }}
        onChange={props.onChange}
        // sx={{
        //     // '& .MuiOutlinedInput-input': { m: 1,p:0, width: '25ch' },
        //     '& .MuiInputBase-input': { height: 1}
        // }}
    />
    {props.error.length>0 && <span style={{"color":"#ff0000"}}>{props.error}</span>}
    </>
    )
}

CustomTextInlineField.defaultProps = {
    error: "",
  }