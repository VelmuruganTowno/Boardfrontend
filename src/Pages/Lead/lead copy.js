import { Box, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import Boardlead from "./boardlead";
import LeadAgent from "./leadAgent";
import { Stack, Paper } from '@mui/material';
import LeadCount from "./LeadCount";

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
    <>
      {hasAdmin === "Admin" || hasAdmin === "Super Admin" ?
        <div style={{ padding: "4% 1%", width: '98%' }}>
          <LeadCount />
          {full !== true ?
            <button
              onClick={board}
              style={{
                fontSize: "15px",
                background: "#111",
                borderColor: "#111",
                cursor: "pointer",
                border: 0,
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
                borderWidth: " thin",
                color: "white",
                height: "42px",
                width: '110px'
              }}
            >
              Board Lead
            </button> :
            <button
              onClick={board}
              style={{
                fontSize: "15px",
                border: 0,
                fontWeight: "bold",
                background: "#f46d25",
                borderColor: "#f46d25",
                boxShadow: '0px 3px 5px #999',
                cursor: "pointer",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
                borderWidth: " thin",
                color: "white",
                height: "42px",
                width: '110px'
              }}
            >
              Board Lead
            </button>}
          {full !== false ?
            <button
              onClick={lead}
              style={{
                fontSize: "15px",
                border: 0,
                background: "#111",
                borderColor: "#111",
                cursor: "pointer",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderWidth: " thin",
                color: "white",
                height: "42px",
                width: '150px'
              }}
            >
              Travel Agent Lead
            </button>
            : <button
              onClick={lead}
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                background: "#f46d25",
                border: 0,
                borderColor: "#f46d25",
                cursor: "pointer",
                boxShadow: '0px 3px 5px #999',
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderWidth: " thin",
                color: "white",
                height: "42px",
                width: '150px'
              }}
            >
              Travel Agent Lead
            </button>}
          {full === true ? <Boardlead /> : <LeadAgent />}

        </div >
        :
        <div style={{ padding: "4% 1%", width: '98%' }}>
          <LeadCount />
          <Boardlead />
        </div>
      }
    </>
  );
}
