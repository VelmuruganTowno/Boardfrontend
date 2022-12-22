import {React,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";

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

export default function CityForm({ open, onClose, selectedRow, selectedOption, fetchData }) {
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  var [name, setName] = useState(selectedRow.name);
  var [description, setDescription] = useState(selectedRow.description);


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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        createdBy: createdBy,
        name: name,
        description: description,
        uniqueId: uniqueid,
        menu: selectedOption.value
      })
    };

    fetch('/api/v1/commonfeature', requestOptions)
      .then(response => response.json())
      .then(data => {
        fetchData();
        onClose();
      });
  }

  const updateRecord = () => {

    const put_url = '/api/v1/commonfeature/' + selectedRow.id;
    const requestBody = {
      id: selectedRow.id,
      createdBy: createdBy,
      name: name,
      description: description,
      uniqueId: uniqueid,
      menu: selectedOption.value,
      status: "1",
      updatedBy: createdBy,
      updatedAt: null
    }

    // POST API CALL 
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    };

    fetch(put_url, requestOptions)
      .then(response => response.json())
      .then(data => {
        fetchData();
        onClose();
      });
  }

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
            <Button
              type="submit"
              className={classes.button}
              onClick={onClickFun}
            >
              {selectedRow.id ? "Update" : "Create"}
            </Button>

            <Button
              color="secondary"
              onClick={onClose}
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
