import React from "react";
import { Modal, Box, Stack, Typography } from '@mui/material';

const mystyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '1px solid #000',
  backgroundColor: '#fff',
  padding: "40px 20px",
  width:'500px',
};

const tHeadBoard = [
  { label: 'Client Name', value: 'clientName' },
  { label: 'Client No.', value: 'clientMobileNo' },
  { label: 'Check-in', value: 'checkin' },
  { label: 'Check-out', value: 'checkout' },
  { label: 'Destination', value: 'designation' },
  { label: 'Nights', value: 'noofnights' },
  { label: 'Lead Type', value: 'leadType' },
  { label: 'Assigned To', value: 'leadassignto' },
  { label: 'Lead Scoring', value: 'leadscoring' },
  { label: 'Lead Scoring Value', value: 'leadscoringvalue' },
  { label: 'Reason', value: 'reason' }
];

const tHeadAgent = [
  { label: 'Agent Name', value: 'createdBy' },
  { label: 'Check-in', value: 'checkin' },
  { label: 'Check-out', value: 'checkout' },
  { label: 'Hotel Name', value: 'propertyName' },
  { label: 'Room Type', value: 'displayName' },
  { label: 'No of Rooms', value: 'noofrooms'},
  { label: 'Assigned To', value: 'assignTo' },
  { label: 'Lead Scoring', value: 'leadscoring' },
  { label: 'Lead Scoring Value', value: 'leadscoringvalue' },
  { label: 'Reason', value: 'reason' }
];


export default function ViewModal(props) {
  var tHead = props.selectedTable === "boardlead" ? tHeadBoard : tHeadAgent;
  return (
    <Modal
    open={props.openView}
    onClose={props.handleCloseView}
  >
    <Box style={mystyle}>
      <Typography style={{color:'rgb(244, 109, 37)',fontWeight:'700',}}>Board Lead</Typography>
      <hr />
      <Stack spacing={3}>
        {
          tHead.map((each,index)=>{
            return <span key={index}>{each.label}: {props.clickedRowData[each.value]}</span>
          })
        }
      </Stack>
    </Box>
  </Modal>
  )
}
