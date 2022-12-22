import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Boardlead from "./boardlead";
import LeadAgent from "./leadAgent";
import { Stack, Paper } from '@mui/material';
import LeadCount from "./LeadCount";
import { twnButtonStyles } from "../../utils/townoStyle";

const buttonStyles = {
  boardLeadInactive: {
    fontSize: "15px", background: "#111", borderColor: "#111", cursor: "pointer", border: 0, borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px",
    borderWidth: " thin", color: "white", height: "42px", width: '110px'
  },
  boadLeadActive: {
    fontSize: "15px", border: 0, fontWeight: "bold", background: "#f46d25", borderColor: "#f46d25", boxShadow: '0px 3px 5px #999', cursor: "pointer",
    borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", borderWidth: " thin", color: "white", height: "42px", width: '110px'
  },
  travelLeadInactive: {
    fontSize: "15px", border: 0, background: "#111", borderColor: "#111", cursor: "pointer", borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px", borderWidth: " thin", color: "white", height: "42px", width: '150px'
  },
  travelLeadActive: {
    fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, borderColor: "#f46d25", cursor: "pointer", boxShadow: '0px 3px 5px #999', borderTopRightRadius: "4px", borderBottomRightRadius: "4px", borderWidth: " thin",
    color: "white", height: "42px", width: '150px'
  }
}
export default function Lead() {
  let hasAdmin = localStorage.getItem("role");

  let [full, setFull] = useState(true);

  const board = () => {
    setFull(true);
  };

  const lead = () => {
    setFull(false);
  };

  return (
    <div style={twnButtonStyles.allPages}>
      <LeadCount />
    {hasAdmin === "Admin" ||hasAdmin === "Super Admin" ?
      <><button
        onClick={board}
        style={full ? buttonStyles.boadLeadActive : buttonStyles.boardLeadInactive}>
        Board Lead
      </button>

      <button
        onClick={lead}
        style={full ? buttonStyles.travelLeadInactive : buttonStyles.travelLeadActive}
      >
        Travel Agent Lead
      </button></>:<><Typography style={{...twnButtonStyles.xlFonts,paddingBottom:'-30px'}}>Leads</Typography></>
      }
      {full? <Boardlead /> : <LeadAgent />}

    </div >
  );
}
