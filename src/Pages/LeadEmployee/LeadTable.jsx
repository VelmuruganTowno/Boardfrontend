import { React, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Paper from '@mui/material/Paper';

import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(244, 109, 37)',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const tHeadBoard = [
    { label: 'Client Name', value: 'clientName' },
    { label: 'Client No.', value: 'clientMobileNo' },
    { label: 'Check-in', value: 'checkin' },
    { label: 'Check-out', value: 'checkout' },
    { label: 'Destination', value: 'designation' },
    { label: 'Nights', value: 'noofnights' },
    { label: 'Lead Type', value: 'leadType' },
    { label: 'Assigned To', value: 'leadassignto' },
    { label: 'Lead Scoring', value: 'leadscoring' }
];

const tHeadAgent = [
    { label: 'Agent Name', value: 'createdBy' },
    { label: 'Check-in', value: 'checkin' },
    { label: 'Check-out', value: 'checkout' },
    { label: 'Hotel Name', value: 'propertyName' },
    { label: 'Room Type', value: 'displayName' },
    { label: 'No of Rooms', value: 'noofrooms' },
    { label: 'Assigned To', value: 'assignTo' },
    { label: 'Lead Scoring', value: 'leadscoring' }
];

export default function LeadTable({ selectedTable, tableBoardData, onClickFun, totalLength }) {

    var tHead = selectedTable === "boardlead" ? tHeadBoard : tHeadAgent;


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [maxPageNum, setMaxPageNum] = useState(Math.ceil(totalLength / postsPerPage));
    var lastIndex = currentPage * postsPerPage; //1*5=5
    var firstIndex = lastIndex - postsPerPage; //(1*5)-5=0
    var slicedData = tableBoardData.slice(firstIndex, lastIndex);

    const getIcon = (leadscoringvalue, col_index) => {
        if (leadscoringvalue === "followuphot") {
            return <StyledTableCell align="center" key={col_index}><WhatshotTwoToneIcon color="error" /></StyledTableCell>
        }
        else if (leadscoringvalue === "followupwarm") {
            return <StyledTableCell align="center" key={col_index}><BrightnessHighIcon color="primary" /></StyledTableCell>
        }
        else if (leadscoringvalue === "followupcold") {
            return <StyledTableCell align="center" key={col_index}><AcUnitIcon style={{ color: "#006994" }} /></StyledTableCell>
        }
    }


    //  // Get current posts
    //  const sliceData = () =>{
    //     indexOfLastPost = currentPage * postsPerPage; //if 5<(6+1=7) is true, print 5 else 6
    //     indexOfFirstPost = indexOfLastPost - postsPerPage; //5-5 or 6-5
    //     console.log("NO of RECORDS: ", indexOfFirstPost, indexOfLastPost)
    //     // setTableBoardData(boardData.slice(indexOfFirstPost, indexOfLastPost));
    //     // setTableAgentData(agentData.slice(indexOfFirstPost, indexOfLastPost));
    // }

    // // Change page
    // const postsPerPageFun = perPageVal => {
    //     setPostsPerPage(perPageVal);
    //     setMaxPageNum(Math.ceil(totalLength / postsPerPage));
    //     // setMaxPageNum(Math.ceil(agentData.length / perPageVal));
    //     setCurrentPage(1);
    //     sliceData();
    // }

    // // Add or decrease current page by 1
    // const changeCurrentPage = (value) => {
    //     const newValue = currentPage + value;
    //     if (newValue >= 1 && newValue <= maxPageNum) {
    //         setCurrentPage(newValue);
    //         sliceData();
    //     }
    // }


    return (
        <TableContainer component={Paper}  >
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        {
                            tHead.map((each, index) => {
                                return <StyledTableCell align="center" padding='5px' key={index}>{each.label}</StyledTableCell>
                            })
                        }
                        <StyledTableCell align="center" padding='5px'>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {slicedData.map((each, index) => {
                        return (
                            <StyledTableRow key={index}>
                                {
                                    tHead.map((col_each, col_index) => {
                                        return each[col_each.value] != "followup" ?
                                            <StyledTableCell align="center" key={col_index}>{each[col_each.value]}</StyledTableCell> :
                                            getIcon(each["leadscoringvalue"], col_index)
                                    })
                                }
                                <StyledTableCell align="center">
                                    <FolderOpenIcon style={{ color: 'rgb(244, 109, 37)', cursor: 'pointer', marginRight: '5px' }} onClick={() => onClickFun("lead", each)} />
                                    <VisibilityIcon style={{ color: 'rgb(244, 109, 37)', cursor: 'pointer' }} onClick={() => onClickFun("view", each)} />
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    }
                    )}
                    <TableRow>

                        <StyledTableCell colSpan={10}>
                            <div style={{ textAlign: 'end' }}>
                                <span>Rows per page:</span> &nbsp;
                                <select
                                    // onChange={e => postsPerPageFun(e.target.value)}
                                    name="option"
                                    style={{ "width": "40px", "border": "none", "outline": "none" }} >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                                <span className='mr-3 ml-3'>
                                    {firstIndex + 1}-{lastIndex} of {totalLength}
                                </span>
                                {/* <Button style={{ color: 'rgb(244, 109, 37)' }} onClick={() => changeCurrentPage(-1)}>&#10094;</Button>
                                    <Button style={{ color: 'rgb(244, 109, 37)' }} onClick={() => changeCurrentPage(1)}>&#10095;</Button> */}
                            </div>
                        </StyledTableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}