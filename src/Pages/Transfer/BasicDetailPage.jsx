import React from 'react';

export default function BasicDetailPage(){
    return(
        <Stack style={{ padding: '0.4em 0.5em' }}>
                        {basicInput.map((x, i) => (
                            <Grid container spacing={2} key={i}>
                                <Grid item sm={6}>
                                    {i == 0 && (<p className={classes.title}>Basic Details</p>)}
                                </Grid>

                                <Grid item sm={6} style={{ textAlign: "end", fontSize: '14px' }}>
                                    {basicInput.length !== 1 && i > 0 && (
                                        <DeleteIcon onClick={() => handleRemoveClickBasic(i)} className={classes.plus} />
                                    )}
                                    {basicInput.length - 1 === i && (
                                        <AddCircleOutlineIcon onClick={handleAddClickBasic} size="small" className={classes.plus} />
                                    )}
                                </Grid>

                                <div style={{ width: "2%", textAlign: "center", marginTop: "1em", marginLeft: '5px' }}> {i + 1 + "."}</div>
                                <div style={{ width: '97%', marginTop: '1em' }}>
                                    <Box>
                                        <Grid container spacing={2}>
                                            {i === 0 ?
                                                transferId ?
                                                    <Grid item xs={3}>
                                                        <CustomTextInlineField name="clientName" label='Client Name' fullWidth size="small" style={{ backgroundColor: '#fff' }} value={x.clientName} onChange={(e) => handleBasicChange(e, i)} disabled />
                                                    </Grid> :
                                                    <>
                                                        <Grid item xs={2.7}>
                                                            <Select
                                                                isSearchable
                                                                placeholder='Client Name'
                                                                defaultInputValue={x.clientName}
                                                                value={Clientoptions.filter(i => i.value === x.clientName)}
                                                                options={Clientoptions}
                                                                onChange={(e) => handleChangeClient(i, e)}
                                                                components={{
                                                                    ValueContainer: CustomValueContainer,
                                                                }}
                                                                styles={{
                                                                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                                                                    control: (base, state) => ({
                                                                        ...base,
                                                                        "&:hover": { borderColor: "#f46d25" },
                                                                        borderColor: "#f46d25",
                                                                        boxShadow: "none",
                                                                        width: '275px',
                                                                    }),
                                                                    placeholder: (provided, state) => ({
                                                                        ...provided,
                                                                        position: "absolute",
                                                                        top:
                                                                            state.hasValue ||
                                                                                state.selectProps.inputValue
                                                                                ? -7
                                                                                : "50%",
                                                                        background: "#fff",
                                                                        padding: "0px 5px",
                                                                        transition: "top 0.1s, font-size 0.1s",
                                                                        fontSize: "17px",
                                                                    }),
                                                                }}
                                                            />
                                                            <span style={{ "color": "#ff0000" }}>{basicInputError[i]['clientName']}</span>
                                                        </Grid>
                                                        <Grid item xs={0.3}>
                                                            <AddCircleOutlineIcon style={{ fontSize: '20px', color: '#f46d25', cursor: 'pointer', paddingTop: '0.5em' }} onClick={() => { setOpen(true) }} />
                                                        </Grid>
                                                    </> :
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientName" label='Client Name' style={{ backgroundColor: '#fff' }} value={x.clientName} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            }
                                            {i === 0 ?
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientMobileNo" label="Mobile No" value={x.clientMobileNo} disabled />
                                                </Grid> :
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientMobileNo" label='Mobile No' style={{ backgroundColor: '#fff' }} value={x.clientMobileNo} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            }

                                            {i === 0 ?
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientEmail" fullWidth label="Email Id" value={x.clientEmail} variant="outlined" size="small" style={{ backgroundColor: '#fff', color: "#f46d25" }} disabled />
                                                </Grid> :
                                                <Grid item xs={3}>
                                                    <CustomTextInlineField name="clientEmail" label='Email Id' style={{ backgroundColor: '#fff' }} value={x.clientEmail} onChange={(e) => handleBasicChange(e, i)} />
                                                </Grid>
                                            }
                                            <Grid item xs={3}>
                                                <CustomTextInlineField name="clientAltNo" label='Alternate No' style={{ backgroundColor: '#fff' }} value={x.clientAltNo} onChange={(e) => handleBasicChange(e, i)} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            </Grid>
                        ))}
                    </Stack>
    );
}