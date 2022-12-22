{/* {" "}
                            <Formik enableReinitialize initialValues={initialValues}>
                                <Form autoComplete="off">
                                    <Accordion
                                        style={{ borderRadius: "6px", marginBottom: "10px" }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                                            style={{
                                                background: "#343A40",
                                                color: "#fff",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Typography className={classes.heading}>
                                                Basic Information
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            style={{ background: "#EEF1F3", paddingTop: "25px" }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item sm={12}>
                                                        <p style={{ margin: "0px" }}>
                                                            <b>Client Details</b>
                                                        </p>
                                                    </Grid>
                                                    <Grid item xs={11}>
                                                        {clientLists && (
                                                            <Select
                                                                placeholder="Select Client"
                                                                isSearchable
                                                                defaultValue={clientName}
                                                                options={Clientoptions}
                                                                onChange={handleChangeClient}
                                                                value={clientName}
                                                                components={{
                                                                    ValueContainer: CustomValueContainer,
                                                                }}
                                                                styles={{
                                                                    container: (provided) => ({
                                                                        ...provided,
                                                                    }),
                                                                    menu: (provided) => ({
                                                                        ...provided,
                                                                        zIndex: 9999,
                                                                    }),
                                                                    valueContainer: (provided) => ({
                                                                        ...provided,
                                                                        overflow: "visible",
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
                                                                        fontSize: "12px",
                                                                    }),
                                                                    control: (base, state) => ({
                                                                        ...base,
                                                                        "&:hover": { borderColor: "#f46d25" },
                                                                        borderColor: "#f46d25",
                                                                        boxShadow: "none",
                                                                    }),
                                                                }}
                                                            />
                                                        )}
                                                        <p className="errors">{formError.clientName}</p>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <AddCircleOutlineIcon
                                                            onClick={OpenDialog}
                                                            className={classes.plusmobile}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            name="clientMobile"
                                                            value={clientMobile || ""}
                                                            label="Mobile No."
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            onChange={(e) => setClientMobile(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            name="clientEmail"
                                                            value={clientEmail || ""}
                                                            label="Email Id."
                                                            onChange={(e) => setClientEmail(e.target.value)}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Select
                                                            placeholder="Destination City"
                                                            isSearchable
                                                            value={Cityoptions.label}
                                                            options={Cityoptions}
                                                            onChange={handleChangeCity}
                                                            components={{
                                                                ValueContainer: CustomValueContainer,
                                                            }}
                                                            styles={{
                                                                container: (provided) => ({
                                                                    ...provided,
                                                                }),
                                                                menu: (provided) => ({
                                                                    ...provided,
                                                                    zIndex: 9999,
                                                                }),
                                                                valueContainer: (provided) => ({
                                                                    ...provided,
                                                                    overflow: "visible",
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
                                                                    fontSize: "12px",
                                                                }),
                                                                control: (base, state) => ({
                                                                    ...base,
                                                                    "&:hover": { borderColor: "#f46d25" },
                                                                    borderColor: "#f46d25",
                                                                    boxShadow: "none",
                                                                }),
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <MaterialSelect
                                                            placeholder="Booking Source"
                                                            isSearchable
                                                            options={BookingSource}
                                                            onChange={handlebookingSoucre}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} className={classes.formCheck}>
                                                        <div className={classes.formCheck}>
                                                            <Checkbox
                                                                name="checked"
                                                                type="checkbox"
                                                                defaultChecked={checked}
                                                                onChange={() => setChecked(!checked)}
                                                                color="primary"
                                                            />
                                                            <label>Vaccinated</label>
                                                        </div>
                                                    </Grid>
                                                    <Grid item lg={1} className={classes.formCheck}>
                                                        <div className={classes.formCheck}>
                                                            <Checkbox
                                                                name="git"
                                                                type="checkbox"
                                                                defaultChecked={git}
                                                                onChange={() => setGit(!git)}
                                                                color="primary"
                                                            />
                                                            <label>GIT</label>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={12} xs={12} />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <p style={{ margin: "0px" }}>
                                                            <b>Hotel Details</b>
                                                        </p>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        {hotelList && (
                                                            <MaterialSelect
                                                                placeholder="Select Hotel *"
                                                                isSearchable
                                                                value={Hoteloptions.label}
                                                                options={Hoteloptions}
                                                                onChange={handleChangeHotel}
                                                            />
                                                        )}
                                                        <p className="errors">{formError.hotelName}</p>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            name="starRating"
                                                            label="Star Category"
                                                            value={hotelDetails.starRating || ""}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <TextField
                                                            name="hotelContact"
                                                            label="Hotel Phone"
                                                            value={hotelDetails.hotelContact || ""}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <TextField
                                                            name="hotelEmail"
                                                            label="Hotel Email"
                                                            value={hotelDetails.hotelEmail || ""}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            name="hotelAddress"
                                                            label="Hotel Address"
                                                            value={hotelDetails.hotelAddress || ""}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={12} xs={12} />
                                                <Grid item sm={12} xs={12}>
                                                    {personInput.map((x, i) => (
                                                        <Grid container spacing={2} key={i}>
                                                            <Grid item sm={6} xs={6}>
                                                                {i == 0 && (
                                                                    <p style={{ margin: "0px" }}>
                                                                        <b>Lead Pax</b>
                                                                    </p>
                                                                )}
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item sm={6} xs={6}>
                                                                    {i + 1}.
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    sm={6}
                                                                    xs={6}
                                                                    style={{ textAlign: "end" }}
                                                                >
                                                                    {personInput.length !== 1 && (
                                                                        <DeleteIcon
                                                                            onClick={() => handleRemoveClickPerson(i)}
                                                                            className={classes.plus}
                                                                        />
                                                                    )}
                                                                    {personInput.length - 1 === i && (
                                                                        <AddCircleOutlineIcon
                                                                            onClick={handleAddClickPerson}
                                                                            size="small"
                                                                            className={classes.plus}
                                                                        />
                                                                    )}
                                                                </Grid>
                                                                <Grid item sm={6} xs={6}>
                                                                    <TextField
                                                                        name="name"
                                                                        label="Name"
                                                                        value={x.name}
                                                                        onChange={(e) => handlePersonChange(e, i)}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        size="small"
                                                                        autoComplete="off"
                                                                    />
                                                                </Grid>
                                                                <Grid item sm={6} xs={6}>
                                                                    <TextField
                                                                        name="mobile"
                                                                        label="Mobile No"
                                                                        value={x.mobile}
                                                                        onChange={(e) => handlePersonChange(e, i)}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        size="small"
                                                                        type="number"
                                                                        autoComplete="off"
                                                                    />
                                                                </Grid>
                                                                <Grid item sm={6} xs={6}>
                                                                    <TextField
                                                                        name="altMobile"
                                                                        label="Alt Mobile"
                                                                        value={x.altMobile}
                                                                        onChange={(e) => handlePersonChange(e, i)}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        size="small"
                                                                        autoComplete="off"
                                                                        type="number"
                                                                    />
                                                                </Grid>
                                                                <Grid item sm={6} xs={6}>
                                                                    <TextField
                                                                        name="email"
                                                                        label="Email"
                                                                        value={x.email}
                                                                        onChange={(e) => handlePersonChange(e, i)}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        size="small"
                                                                        autoComplete="off"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        style={{ borderRadius: "6px", marginBottom: "10px" }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                                            style={{
                                                background: "#343A40",
                                                color: "#fff",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Typography className={classes.heading}>
                                                Booking Information
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            style={{ background: "#EEF1F3", paddingTop: "25px" }}
                                        >
                                            <Grid item xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6} sm={6}>
                                                        <div style={{ position: "relative" }}>
                                                            <DatePicker
                                                                required
                                                                label="Check-In"
                                                                inputVariant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                value={checkin}
                                                                onChange={handleCheckin}
                                                                animateYearScrolling
                                                                format="dd/MM/yyyy"
                                                                variant="inline"
                                                                disablePast="true"
                                                                autoOk="true"
                                                            />
                                                            <DateRangeIcon className={classes.icon} />
                                                        </div>
                                                        <p className="errors">{formError.checkin}</p>
                                                    </Grid>
                                                    <Grid item sm={6} xs={6}>
                                                        <div style={{ position: "relative" }}>
                                                            <DatePicker
                                                                required
                                                                label="Check-Out"
                                                                value={checkout}
                                                                inputVariant="outlined"
                                                                size="small"
                                                                fullWidth
                                                                onChange={handleCheckout}
                                                                format="dd/MM/yyyy"
                                                                minDate={new Date(date)}
                                                                animateYearScrolling
                                                                variant="inline"
                                                                disablePast="true"
                                                                autoOk="true"
                                                            />
                                                            <DateRangeIcon className={classes.icon} />
                                                        </div>
                                                        <p className="errors">{formError.checkout}</p>
                                                        <p className="errors">{formError.checkoutValid}</p>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="night1"
                                                            type="number"
                                                            value={night1}
                                                            label="No of Nights"
                                                            onChange={handleNight}
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled
                                                            size="small"
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        {roomInputs.map((x, i) => (
                                                            <Grid container spacing={2} key={i}>
                                                                <Grid item sm={12} xs={12}>
                                                                    {i == 0 && (
                                                                        <p style={{ margin: "0px" }}>
                                                                            <b>Room Details</b>
                                                                        </p>
                                                                    )}
                                                                </Grid>
                                                                <Grid container spacing={2}>
                                                                    <Grid item sm={6} xs={6}>
                                                                        {i + 1}. Room
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        sm={6}
                                                                        xs={6}
                                                                        style={{ textAlign: "end" }}
                                                                    >
                                                                        {roomInputs.length !== 1 && (
                                                                            <DeleteIcon
                                                                                onClick={() => handleRemoveClickRoom(i)}
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                        {roomInputs.length - 1 === i && (
                                                                            <AddCircleOutlineIcon
                                                                                onClick={handleAddClickRoom}
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                    </Grid>
                                                                    <Grid item sm={6} xs={6}>
                                                                        {roomDisplayNameList && (
                                                                            <MaterialSelect
                                                                                name="roomType"
                                                                                placeholder="Room Type"
                                                                                isSearchable
                                                                                value={RoomDisplayName.label || ""}
                                                                                options={RoomDisplayName}
                                                                                onChange={(option) =>
                                                                                    handleRoomChange(
                                                                                        option,
                                                                                        i,
                                                                                        "roomType"
                                                                                    )
                                                                                }
                                                                            />
                                                                        )}
                                                                    </Grid>
                                                                    <Grid item sm={6} xs={6}>
                                                                        <MaterialSelect
                                                                            name="boardBasic"
                                                                            placeholder="Meal Plan"
                                                                            value={x.boardBasic}
                                                                            onChange={(option) =>
                                                                                handleRoomAmountOtherChange(
                                                                                    option,
                                                                                    i,
                                                                                    "boardBasic"
                                                                                )
                                                                            }
                                                                            options={BoardBasic}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item sm={6} xs={6}>
                                                                        <MaterialSelect
                                                                            name="adult"
                                                                            value={x.adult}
                                                                            placeholder="No of Adults"
                                                                            onChange={(option) =>
                                                                                handleRoomAmountOtherChange(
                                                                                    option,
                                                                                    i,
                                                                                    "adult"
                                                                                )
                                                                            }
                                                                            options={
                                                                                adultLimit[i] !== undefined
                                                                                    ? [
                                                                                        ...Array(
                                                                                            parseInt(adultLimit[i])
                                                                                        ).keys(),
                                                                                    ].map((x) => ({
                                                                                        label: x + 1,
                                                                                        value: x + 1,
                                                                                    }))
                                                                                    : [...Array(0).keys()].map((x) => ({
                                                                                        label: x,
                                                                                        value: x,
                                                                                    }))
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid item sm={6} xs={6}>
                                                                        <MaterialSelect
                                                                            name="child"
                                                                            value={x.child}
                                                                            placeholder="No of Children"
                                                                            onChange={(option) =>
                                                                                handleRoomAmountOtherChange(
                                                                                    option,
                                                                                    i,
                                                                                    "child"
                                                                                )
                                                                            }
                                                                            options={
                                                                                childLimit[i] !== undefined
                                                                                    ? [
                                                                                        ...Array(
                                                                                            parseInt(childLimit[i]) + 1
                                                                                        ).keys(),
                                                                                    ].map((x, index) => ({
                                                                                        label: x,
                                                                                        value: x,
                                                                                    }))
                                                                                    : [...Array(0).keys()].map((x) => ({
                                                                                        label: x,
                                                                                        value: x,
                                                                                    }))
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    {git ? (
                                                                        <Grid item sm={6} xs={6}>
                                                                            <MaterialSelect
                                                                                name="rooms"
                                                                                placeholder="No of Rooms"
                                                                                value={x.rooms}
                                                                                onChange={(option) =>
                                                                                    handleRoomAmountOtherChange(
                                                                                        option,
                                                                                        i,
                                                                                        "rooms"
                                                                                    )
                                                                                }
                                                                                options={[...Array(10).keys()].map(
                                                                                    (x) => ({
                                                                                        label: x + 1,
                                                                                        value: x + 1,
                                                                                    })
                                                                                )}
                                                                            />
                                                                        </Grid>
                                                                    ) : null}
                                                                    <Grid item sm={12} xs={12}>
                                                                        <TextField
                                                                            name="totalGrossRoomRent"
                                                                            label="Selling Price"
                                                                            type="number"
                                                                            value={x.totalGrossRoomRent}
                                                                            onChange={(e) =>
                                                                                handleGrossRoomRent(e, i)
                                                                            }
                                                                            variant="outlined"
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        ₹
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                                style: {
                                                                                    color: "#fff",
                                                                                    background: "#f46d25",
                                                                                    borderRadius: "4px",
                                                                                    padding: "2px 4px",
                                                                                },
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item sm={12} xs={12}>
                                                                        <TextField
                                                                            name="perRoomRent"
                                                                            label="Net to Hotel per Night(P)"
                                                                            value={x.perRoomRent}
                                                                            onChange={(e) => handleRoomRent(e, i)}
                                                                            variant="outlined"
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        ₹
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                                style: {
                                                                                    color: "#fff",
                                                                                    background: "#282828",
                                                                                    borderRadius: "4px",
                                                                                    padding: "2px 4px",
                                                                                },
                                                                            }}
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item sm={12} xs={12}>
                                                                        <TextField
                                                                            name="totalNetRoomRent"
                                                                            label="Net to Hotel Total(H = N*P)"
                                                                            type="number"
                                                                            value={x.totalNetRoomRent}
                                                                            onChange={(e) => handleNetRoomRent(e, i)}
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        ₹
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                                style: {
                                                                                    color: "#fff",
                                                                                    background: "#282828",
                                                                                    borderRadius: "4px",
                                                                                    padding: "2px 4px",
                                                                                },
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        {inclusionInput.map((x, i) => (
                                                            <Grid container spacing={2} key={i}>
                                                                <Grid item sm={6} xs={6}>
                                                                    {i == 0 && (
                                                                        <p style={{ margin: "0px" }}>
                                                                            <b>Inclusion</b>
                                                                        </p>
                                                                    )}
                                                                </Grid>
                                                                <Grid container spacing={2}>
                                                                    <Grid item sm={6} xs={6}>
                                                                        Inclusion No.:{i + 1}
                                                                    </Grid>{" "}
                                                                    <Grid
                                                                        item
                                                                        sm={6}
                                                                        xs={6}
                                                                        style={{ textAlign: "end" }}
                                                                    >
                                                                        {inclusionInput.length !== 1 && (
                                                                            <DeleteIcon
                                                                                onClick={() =>
                                                                                    handleRemoveClickInclusion(i)
                                                                                }
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                        {inclusionInput.length - 1 === i && (
                                                                            <AddCircleOutlineIcon
                                                                                onClick={handleAddClickInclusion}
                                                                                size="small"
                                                                                className={classes.plus}
                                                                            />
                                                                        )}
                                                                    </Grid>
                                                                    <Grid item sm={12} xs={12}>
                                                                        <TextField
                                                                            name="inclusion"
                                                                            label="Inclusion"
                                                                            value={x.inclusion}
                                                                            onChange={(e) =>
                                                                                handleInclusionName(e, i)
                                                                            }
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            autoComplete="off"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item sm={12} xs={12}>
                                                                        <TextField
                                                                            name="amount"
                                                                            label="Inclusion Amount"
                                                                            value={x.amount}
                                                                            onChange={(e) =>
                                                                                handleInclusionAmount(e, i)
                                                                            }
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            size="small"
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        ₹
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                            type="number"
                                                                            autoComplete="off"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                                style: {
                                                                                    color: "#fff",
                                                                                    background: "#f46d25",
                                                                                    borderRadius: "4px",
                                                                                    padding: "2px 4px",
                                                                                },
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item sm={12} xs={12}>
                                                                        <TextField
                                                                            name="vendorAmount"
                                                                            label="Vendor Amount"
                                                                            value={x.vendorAmount}
                                                                            onChange={(e) =>
                                                                                handleInclusionVendorAmount(e, i)
                                                                            }
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        ₹
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                            size="small"
                                                                            type="number"
                                                                            autoComplete="off"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                                style: {
                                                                                    color: "#fff",
                                                                                    background: "#000",
                                                                                    borderRadius: "4px",
                                                                                    padding: "2px 4px",
                                                                                },
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        style={{ borderRadius: "6px", marginBottom: "10px" }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                                            style={{
                                                background: "#343A40",
                                                color: "#fff",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <Typography className={classes.heading}>
                                                Payment Details
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            style={{ background: "#EEF1F3", paddingTop: "25px" }}
                                        >
                                            <Grid item sm={12} xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item sm={12} xs={12}>
                                                        <b>Payment Breakup</b>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="totalRoomRent"
                                                            label="Total Room Rent(R)"
                                                            variant="outlined"
                                                            style={{
                                                                backgroundColor: "#ffe2d7",
                                                            }}
                                                            fullWidth
                                                            size="small"
                                                            value={totalRoomRent || ""}
                                                            autoComplete="off"
                                                            disabled
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#f46d25",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="totalInclusionAmount"
                                                            value={totalInclusionAmount || ""}
                                                            label="Total Inclusion Amount"
                                                            variant="outlined"
                                                            fullWidth
                                                            style={{
                                                                backgroundColor: "#ffe2d7",
                                                            }}
                                                            size="small"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            autoComplete="off"
                                                            disabled
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#f46d25",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="grossValue"
                                                            value={grossValue || ""}
                                                            label="Total Booking Amount(R+I)"
                                                            variant="outlined"
                                                            fullWidth
                                                            size="small"
                                                            autoComplete="off"
                                                            style={{
                                                                backgroundColor: "#ffe2d7",
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#f46d25",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            disabled
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        <p className="errors">
                                                            {formError.totalGrossPrice}
                                                        </p>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="netValue"
                                                            label="Net Payout (H+V)"
                                                            variant="outlined"
                                                            fullWidth
                                                            style={{
                                                                borderColor: "#a1a1a1",
                                                                backgroundColor: "#cccccc",
                                                            }}
                                                            size="small"
                                                            value={netValue || ""}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            autoComplete="off"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#282828",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            disabled
                                                        />
                                                        <p className="errors">{formError.totalNetPrice}</p>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="profitValue"
                                                            value={profitValue || ""}
                                                            label="Commission"
                                                            variant="outlined"
                                                            fullWidth
                                                            style={{
                                                                backgroundColor: "#deffde",
                                                            }}
                                                            size="small"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            autoComplete="off"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#00a300",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            disabled
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item sm={12} xs={12}>
                                                        <b>Transaction Summary</b>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="paidAmount"
                                                            label="Amount Received"
                                                            variant="outlined"
                                                            style={{
                                                                backgroundColor: "#ffe2d7",
                                                            }}
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#f46d25",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            size="small"
                                                            value={paidAmount || ""}
                                                            onChange={handlePaid}
                                                            autoComplete="off"
                                                            type="number"
                                                        />
                                                        <p className="errors">{formError.paidAmount}</p>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="hotelPendingAmount"
                                                            value={hotelPendingAmount}
                                                            label="Balance Payable on Arrival (BPAH)"
                                                            disabled
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            variant="outlined"
                                                            fullWidth
                                                            size="small"
                                                            style={{
                                                                backgroundColor: "#ffe2d7",
                                                            }}
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#f46d25",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <MaterialSelect
                                                            placeholder="Payment Mode"
                                                            options={paymentMode}
                                                            onChange={handlePayment}
                                                            value={paymentType}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name=""
                                                            value={referenceNumber || ""}
                                                            label="Reference Number"
                                                            onChange={handleReference}
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            style={{
                                                                borderColor: "#a1a1a1",
                                                            }}
                                                            fullWidth
                                                            size="small"
                                                            autoComplete="off"
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <div style={{ marginLeft: "20px" }}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Field
                                                                        as={Radio}
                                                                        type="radio"
                                                                        name="status"
                                                                        color="primary"
                                                                        value="active"
                                                                        onClick={() => setFull("active") || settownoPending(0)}
                                                                        style={{
                                                                            color: "#f46d25",
                                                                            fontSize: "18px",
                                                                        }}
                                                                        checkedIcon={<CheckBoxIcon />}
                                                                        icon={<CheckBoxOutlineBlankIcon />}
                                                                    />
                                                                }
                                                                label={
                                                                    <span style={{ fontSize: "18px" }}>
                                                                        Full Payment
                                                                    </span>
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Field
                                                                        as={Radio}
                                                                        type="radio"
                                                                        name="status"
                                                                        color="primary"
                                                                        value="inactive"
                                                                        onClick={() => setFull("inactive")}
                                                                        style={{
                                                                            color: "#f46d25",
                                                                            fontSize: "18px",
                                                                        }}
                                                                        checkedIcon={<CheckBoxIcon />}
                                                                        icon={<CheckBoxOutlineBlankIcon />}
                                                                    />
                                                                }
                                                                label={
                                                                    <span style={{ fontSize: "18px" }}>
                                                                        Partial Payment
                                                                    </span>
                                                                }
                                                            />
                                                        </div>
                                                    </Grid>
                                                    {full == "active" ? null : (
                                                        <Grid item sm={12} xs={12}>
                                                            <TextField
                                                                name="townoPending"
                                                                value={townoPending || ""}
                                                                type="number"
                                                                label="Balance payable to Towno (if any)"
                                                                variant="outlined"
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                    style: {
                                                                        color: "#fff",
                                                                        background: "#f46d25",
                                                                        borderRadius: "4px",
                                                                        padding: "2px 4px",
                                                                    },
                                                                }}
                                                                style={{
                                                                    backgroundColor: "#ffe2d7",
                                                                }}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            ₹
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                size="small"
                                                                autoComplete="off"
                                                                onChange={ChangeTownoPending}
                                                            />
                                                        </Grid>
                                                    )}
                                                    <Grid item sm={12} xs={12}>
                                                        <b> Booking P&L</b>
                                                    </Grid>
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            label="Towno Gross Amount (Projected)"
                                                            name="townoGrossAmount"
                                                            variant="outlined"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            value={projectorAmount || ""}
                                                            disabled
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#f46d25",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            autoComplete="off"
                                                            type="number"
                                                            style={{
                                                                backgroundColor: "#ffe2d7",
                                                            }}
                                                        />
                                                    </Grid>{" "}
                                                    <Grid item sm={12} xs={12}>
                                                        <TextField
                                                            name="profitTax"
                                                            variant="outlined"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                style: {
                                                                    color: "#fff",
                                                                    background: "#00a300",
                                                                    borderRadius: "4px",
                                                                    padding: "2px 4px",
                                                                },
                                                            }}
                                                            style={{
                                                                backgroundColor: "#deffde",
                                                            }}
                                                            size="small"
                                                            label={"Profit After Tax"}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        ₹
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            value={profitTax || ""}
                                                            disabled
                                                            autoComplete="off"
                                                            type="number"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Grid item xs={12} style={{ textAlign: "center" }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={OpenDialogView}
                                        >
                                            Next
                                        </Button>
                                    </Grid>
                                </Form>
                            </Formik> */}