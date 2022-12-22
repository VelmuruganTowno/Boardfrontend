import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import Api from "../../Service/Api";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  dropDowndetailsInitial,
  dropDownCreateInitial,
  dropDownclearFormInitial,
  dropDownUpdateInitial,
} from "../../redux/actions/dropDownAction";
import { twnButtonStyles } from "../../utils/townoStyle";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    width: 400,
    padding: "23px 15px",
    borderRadius: "5px",
    overflow: "unset",
    boxShadow:'none',
  },
  error: {
    color: "red",
  },
  // heading: {
  //   fontSize: "24px",
  //   margin: "20px 0px",
  // },
}));

const initialValues = {
  id: "",
  name: "",
  description: "",
};
export default function DropForm(props) {
  const classes = useStyles();
  const [dropError, setDropError] = useState(false);
  const [dropNameValid, setDropNameValid] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const { onClose, selectedId, open, selectedOption } = props;
  const dispatch = useDispatch();
  const dropDownDetails = useSelector((state) => state.dropDownDetails);
  const { dropDownDetail } = dropDownDetails;
  useEffect(() => {
    if (selectedId) {
      dispatch(dropDowndetailsInitial(selectedId));
    }
  }, [dispatch, selectedId]);

  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateDrop(fields);
    } else {
      createDrop(fields);
    }
  }

  const AddNew = {
    type: selectedOption.value,
  };

  function createDrop(fields) {
    const createData = { ...create, ...fields, ...AddNew };
    dispatch(dropDownCreateInitial(createData, AddNew));
    onClose(true);
  }

  function updateDrop(fields) {
    fields.updateBy = createdBy;
    dispatch(dropDownUpdateInitial(fields, AddNew));
    onClose(true);
  }

  const handleClose = () => {
    onClose(true);
    dispatch(dropDownclearFormInitial());
  };
  const validationDrop = Yup.object({
    name: Yup.string().required("DropDown Name Required"),
  });

  const validCheck = async (values) => {
    if (values !== "" && values !== undefined && values !== null) {
      const valid = { name: values, id: dropDownDetail.id };
      Api.post("productdropdowncheck", valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          setDropError(true);
        } else {
          setDropError(false);
        }
      });
    }
    const nameField = { name: values };
    const isValid = await validationDrop.isValid(nameField);
    setDropNameValid(!isValid);
  };

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {/* <Typography variant="h5" component="h5" className={classes.heading}> */}
        <Typography variant="h5" component="h5" style={twnButtonStyles.lgFonts}>
          {dropDownDetail.id ? "Edit Feature" : "Add Feature"}
        </Typography>
        <Formik
          initialValues={dropDownDetail || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, isValid }) => {
            return (
              <Form autoComplete="off" style={{marginTop:'15px'}}>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Field
                      name="name"
                      as={TextField}
                      label="DropDown Name"
                      onBlur={() => validCheck(values.name)}
                      autoFocus
                      variant="outlined"
                      required
                      fullWidth
                      size='small'
                      value={values.name || ""}
                    />
                    {dropNameValid ? (
                      <span className={classes.error}>
                        DropDown Name Required
                      </span>
                    ) : null}
                    {dropError ? (
                      <span className={classes.error}>
                        DropDown Name Already There!
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
                      size='small'
                      value={values.description || ""}
                    />
                  </Grid>

                  <Grid item sm={12} style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      className={classes.button}
                      disabled={dropNameValid || dropError}
                      style={{boxShadow:'none'}}
                    >
                      {dropDownDetail.id ? "Update" : "Create"}
                    </Button>

                    <Button
                      color="secondary"
                      onClick={handleClose}
                      style={{
                        background: "#121212",
                        color: "#fff",
                        margin: "10px",
                        boxShadow:'none'
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
