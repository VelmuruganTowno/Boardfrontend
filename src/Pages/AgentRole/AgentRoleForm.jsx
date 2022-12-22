import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import Api from "../../Service/Api";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Stack } from "@mui/material";

const useStyles = makeStyles(() => ({
    dialogPaper: {
        width: 400,
        borderRadius: "5px",
        padding: "23px 15px",
        boxShadow: 'none',
    },
    error: {
        color: "red",
    },
}));


export default function AgentRoleForm(props) {
    const classes = useStyles();
    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const [agentName, setAgentName] = useState("");
    const [agentDescription, setAgentDescription] = useState("");
    const { onClose, selectedId, open } = props;

    useEffect(() => {
        if (selectedId) {
            Api.get(`/agentrole/${selectedId}`).then((res) => {
            })
        }
    }, [selectedId]);

    function onSubmit() {
        if (selectedId) {
            updateAgentRole();
        } else {
            createAgentRole();
        }
    }

    function createAgentRole() {
        let data = {
            "uniqueId": uniqueid,
            "name": agentName,
            "description": agentDescription
        }
        console.log(data)
        Api.post("/agentrole", data).then((res) => {
            console.log(res.data);
            onClose(true);
            resetData();
            window.open("/roleList", "_self");
        })

    }

    function updateAgentRole() {
        let data = {
            "uniqueId": uniqueid,
            "name": agentName,
            "description": agentDescription
        }
        Api.put(`/agentrole/${selectedId}`, data).then((res) => {
            console.log(res.data);
            onClose(true);
            resetData();
            window.open("/roleList", "_self");
        })
    }

    const handleClose = () => {
        onClose(true);
        resetData();
    };

    const resetData = () => {
        setAgentName(" ");
        setAgentDescription(" ");
    }

    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                {/* <Typography variant="h5" component="h5" className={classes.heading}> */}
                <Typography variant="h5" component="h5" style={{ ...twnButtonStyles.lgFonts, color: '#f46d25' }}>
                    {selectedId ? "Update Role" : "Create Role"}
                </Typography>
                <br />
                <Stack spacing={2}>
                    <Grid item sm={12}>
                        <TextField
                            name="name"
                            label="Role Name"
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            size="small"
                            value={agentName}
                            onChange={(e) => { setAgentName(e.target.value) }}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={agentDescription}
                            onChange={(e) => { setAgentDescription(e.target.value) }}
                        />
                    </Grid>

                    <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" >
                        {agentName !== "" && agentDescription !== "" ?

                            <Button
                                onClick={onSubmit}
                                style={{ ...twnButtonStyles.orangeBtn, boxShadow: 'none' }}
                            >
                                {selectedId ? "Update" : "Create"}
                            </Button> :
                            <Button
                                className={classes.button}
                                style={{ ...twnButtonStyles.disabledBtn, boxShadow: 'none' }}>
                                {selectedId ? "Update" : "Create"}
                            </Button>
                        }

                        <Button color="secondary" onClick={handleClose} style={twnButtonStyles.blackBtn}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
}
