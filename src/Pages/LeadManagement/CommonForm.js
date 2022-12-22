import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import Api from "../../Service/Api";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    width: 400,
    borderRadius: "0px",
    padding: "20px",
  },
  error: {
    color: "red",
  },
  heading: {
    fontSize: "24px",
    margin: "20px 0px",
  },
}));

export default function CommonForm({ open, onClose, selectedRow, selectedOption, fetchData }) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitActive,setSubmitActive] = useState(false);
  const onClickFun = () => {
    const id = selectedRow.id;
    if (id) {
      updateRecord();
    }
    else {
      createRecord();
    }
  }

  const createRecord = () => {
    // POST API CALL 
    const requestOptions = {
      "createdBy": createdBy,
      "name": name,
      "description": description,
      "uniqueId": uniqueid,
      "menu": selectedOption.value
    };

    Api.post("commonfeature/", requestOptions)
      .then((res) => {
        fetchData();
        setName("");
        setDescription("");
        onClose();
      });
  }

  const updateRecord = () => {
    console.log("from commonform:", name, description, name === "", description === "");
    console.log("from commonform2:", selectedRow);
    var updatedName = name === "" ? selectedRow.name : name;
    var updatedDescription = description === "" ? selectedRow.description : description;
    console.log("from commonform3:", updatedName, updatedDescription);
    const requestBody = {
      "id": selectedRow.id,
      "createdBy": selectedRow.createdBy,
      "name": updatedName,
      "description": updatedDescription,
      "uniqueId": uniqueid,
      "menu": selectedOption.value,
      "status": "1",
      "updatedBy": createdBy,
      "updatedAt": null
    }

    Api.put("commonfeature/" + selectedRow.id, requestBody)
      .then(data => {
        fetchData();
        setName("");
        setDescription("");
        onClose();
      });
  }

  useEffect(()=>{
if(name.trim()!== "" ){
  setSubmitActive(true);
}
else{
  setSubmitActive(false);
}
  },[name,description])
  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
      >
        <Typography variant="h5" component="h5" className={classes.heading}>
          {selectedRow.id ? "Edit Feature" : "Add Feature"}
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <TextField
              id="menu"
              label="DropDown Menu"
              variant="outlined"
              required
              fullWidth
              disabled
              defaultValue={selectedOption.label}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id="name"
              label="DropDown Name"
              autoFocus
              variant="outlined"
              required
              fullWidth
              defaultValue={selectedRow.name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              defaultValue={selectedRow.description}
              onChange={(e) => { setDescription(e.target.value) }}
            />
          </Grid>

          <Grid item sm={12} style={{ textAlign: "center" }}>
            {
              submitActive?
              <Button
              type="submit"
              className={classes.button}
              onClick={onClickFun}
            >
              {selectedRow.id ? "Update" : "Create"}
            </Button>:
            <Button
            disabled
            type="submit"
            className={classes.button}
          >
            {selectedRow.id ? "Update" : "Create"}
          </Button>
            }
            

            <Button
              color="secondary"
              onClick={()=>{onClose();setSubmitActive(false)}}
              style={{
                background: "#121212",
                color: "#fff",
                margin: "10px",
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
