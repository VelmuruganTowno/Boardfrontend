import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px 25px",
  },
  silder: {
    width: "200px",
    height: "145px",
    margin: "1px",
  },
}));

export default function Images() {
  const classes = useStyles();
  const [photoList, setPhotoList] = useState([]);
  const { id } = useParams();

  const photoListGet = () => {
    const data = { propertyId: id };
    Api.post("propertyamenitiesphotovalue", data).then((res) => {
      setPhotoList(res.data.slice(0,6));
    });
  };
  useEffect(() => {
    photoListGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {photoList.map((dataImage) => (
          <div key={dataImage.id}>
            <Grid item sm={4}>
              <img
                src={`${baseurl}getimage/${dataImage.imagepath}`}
                alt="HotelImage"
                className={classes.silder}
              />
            </Grid>
          </div>
        ))}
      </Grid>
    </div>
  );
}
