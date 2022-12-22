import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import Api from "../../Service/Api";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
    agentRoledetailsInitial,
    agentRoleCreateInitial,
    agentRoleUpdateInitial,
    agentRoleclearFormInitial,
} from "../../redux/actions/agentRoleAction";
import { twnButtonStyles } from "../../utils/townoStyle";

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

const initialValues = {
    id: "",
    name: "",
    description: "",
};
export default function AgentRoleForm(props) {
    const classes = useStyles();
    const [agentRoleError, setAgentRoleError] = useState(false);
    const [agentRoleNameValid, setAgentRoleNameValid] = useState(false);
    var uniqueid = localStorage.getItem("unique_id");
    var createdBy = localStorage.getItem("auth");
    const create = { uniqueId: uniqueid, createdBy: createdBy };
    const { onClose, selectedId, open } = props;
    const dispatch = useDispatch();
    // const agentRoleDetails = useSelector((state) => state.agentRoleDetails);
    // const { agentRoleDetail } = agentRoleDetails;
    const [agentRoleDetail, setAgentRoleDetail] = useState([]);

    // useEffect(()=>{
    //     Api.get(`/agentroleall/${uniqueid}`).then((res)=>{
    //         setAgentRoleDetail(res.data);
    //     })
    // },[])

    useEffect(() => {
        if (selectedId) {
            // dispatch(agentRoledetailsInitial(selectedId));
            Api.get(`/agentrole/${selectedId}`).then((res) => {
                setAgentRoleDetail(res.data);
            })
        }
        // }, [dispatch, selectedId]);
    }, [selectedId]);

    function onSubmit(fields, { setStatus }) {
        const id = selectedId;
        setStatus();
        if (id) {
            updateAgentRole(fields);
        } else {
            createAgentRole(fields);
        }
    }

    function createAgentRole(fields) {
        const createData = { ...create, ...fields };
        // dispatch(agentRoleCreateInitial(createData, uniqueid));
        Api.post("/agentrole").then((res) => {
            setAgentRoleDetail(res.data);
        })
        onClose(true);
    }

    function updateAgentRole(fields) {
        fields.updateBy = createdBy;
        // dispatch(agentRoleUpdateInitial(fields, uniqueid));
        Api.put(`/agentrole/${selectedId}`).then((res) => {
            setAgentRoleDetail(res.data);
            onClose(true);
        })
    }

    const handleClose = () => {
        onClose(true);

        // dispatch(agentRoleclearFormInitial());
    };
    const validationAgentRole = Yup.object({
        name: Yup.string().required("Role Name Required"),
    });

    const validCheck = async (values) => {
        if (values !== "" && values !== undefined && values !== null) {
            const valid = { name: values, id: agentRoleDetail.id };
            Api.post("agentrolecheck/" + uniqueid, valid).then((res) => {
                // eslint-disable-next-line eqeqeq
                if (res.data == "Invalid") {
                    setAgentRoleError(true);
                } else {
                    setAgentRoleError(false);
                }
            });
        }
        const nameField = { name: values };
        const isValid = await validationAgentRole.isValid(nameField);
        setAgentRoleNameValid(!isValid);
    };

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
                    {agentRoleDetail.id ? "Update Role" : "Create Role"}
                </Typography>
                <Formik
                    initialValues={agentRoleDetail || initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ values, isValid }) => {
                        return (
                            <Form autoComplete="off" style={{ marginTop: '15px' }}>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <Field
                                            name="name"
                                            as={TextField}
                                            label="Role Name"
                                            onBlur={() => validCheck(values.name)}
                                            autoFocus
                                            variant="outlined"
                                            required
                                            fullWidth
                                            size="small"
                                            value={values.name || ""}
                                        />
                                        {agentRoleNameValid ? (
                                            <span className={classes.error}>
                                                Role Name Required
                                            </span>
                                        ) : null}
                                        {agentRoleError ? (
                                            <span className={classes.error}>
                                                Role Already There!
                                            </span>
                                        ) : null}
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Field
                                            name="description"
                                            as={TextField}
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            value={values.description || ""}
                                        />
                                    </Grid>

                                    <Grid item sm={12} style={{ textAlign: "center" }}>
                                        <Button
                                            type="submit"
                                            className={classes.button}
                                            disabled={agentRoleNameValid || agentRoleError}
                                            style={{ boxShadow: 'none' }}
                                        >
                                            {agentRoleDetail.id ? "Update" : "Create"}
                                        </Button>

                                        <Button
                                            color="secondary"
                                            onClick={handleClose}
                                            style={{
                                                background: "#121212",
                                                color: "#fff",
                                                margin: "10px",
                                                boxShadow: 'none'
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
            </Dialog>
        </>
    );
}
