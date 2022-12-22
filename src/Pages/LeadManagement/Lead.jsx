import { Container, Stack, Button, ButtonGroup, IconButton, InputBase, darkScrollbar } from '@mui/material'
import { React, useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Search from '@material-ui/icons/Search';
import View from './View';
import LeadModal from './LeadModal';
import LeadTable from './LeadTable';
import Api from '../../Service/Api';

const tabStyle = {
    default_tab: {
        color: '#333',
        backgroundColor: '#eee',
        border: '2px solid #eee',
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        textDecoration: 'None'
    },
    active_tab: {
        backgroundColor: "rgb(244, 109, 37)",
        color: "#eee",
        border: '2px solid rgb(244, 109, 37)',
        fontWeight: 'bold',   
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        textDecoration: 'None',
        fontWeight: 700
    }
};

const getStyle = (isActive) => {
    return isActive ? tabStyle.active_tab : tabStyle.default_tab
}


export default function Lead() {

    var uniqueid = localStorage.getItem("unique_id");
    var username = localStorage.getItem("auth");
    const [boardData, setBoardData] = useState([]);
    const [tableBoardData, setTableBoardData] = useState([]);
    const [selectedTable, setSelectedTable] = useState("boardlead")


    //api call for board
    const fetchBoard = () => {
        var url = `/boardleademployee/${uniqueid}/${username}`;
        if (selectedTable==="agentlead"){
            url = `/agentleademployee/${username}`
        }
        Api.get(url)            
            .then((response) => {
                setBoardData(response.data);
                setTableBoardData(response.data);
                console.log("FETCH RECORD: ", response.data); // 6
            })
    }

    useEffect(() => {
        fetchBoard();
    }, [selectedTable]);

    //search filter
    const filterFun = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const filteredData = boardData.filter((eachData) => {
                const entries = Object.entries(eachData);
                const nonEmptyOrNull = entries.filter(([key, val]) => val !== '' && val !== null);
                const isMatch = nonEmptyOrNull.some(([key, val]) => {
                    return val.toString().toLowerCase().startsWith(keyword.toLowerCase())
                })
                return isMatch;
            });
            setTableBoardData(filteredData);
        } else {
            // If the text field is empty, show all users
            setTableBoardData(boardData);
        }
    };

   

    // Variables for Lead Scoring
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Variables for View 
    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const [clickedRowData, setClickedRowData] = useState({});
    
    const onClickFun = (value, rowData) => {
        console.log(rowData);
        setClickedRowData(rowData);
        if (value === "lead") { handleOpen() }
        if (value === "view") { handleOpenView() }

    }


    return (
        <Container sx={{ paddingTop: '120px', width: '95%' }} maxWidth="false">
            <Stack direction='row' justifyContent="space-between">
                <ButtonGroup direction='row'>
                    <Button onClick={()=>setSelectedTable("boardlead")} sx={getStyle(selectedTable === "boardlead")}>Board Lead</Button>
                    <Button onClick={()=>setSelectedTable("agentlead")} sx={getStyle(selectedTable === "agentlead")}>Travel Agent Lead</Button>
                </ButtonGroup>
                <Stack direction='row'>
                    <Paper
                        component="form"
                        variant="outlined"
                        sx={{ mr: "10px ", display: 'flex', alignItems: 'center', width: 200, height: 35, borderColor: "#F16E24" }}
                    >
                        <IconButton sx={{ color: "#F16E24" }}>
                            <Search />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search your Lead"
                            onChange={filterFun}
                        />
                    </Paper>
                </Stack>
            </Stack> <br />
            <LeadTable selectedTable={selectedTable} tableBoardData={tableBoardData} onClickFun={onClickFun} totalLength={boardData.length} />
            <View selectedTable={selectedTable}  openView={openView} handleCloseView={handleCloseView} clickedRowData={clickedRowData}/>
            <LeadModal selectedTable={selectedTable} open={open} handleClose={handleClose} clickedRowData={clickedRowData} fetchBoard={fetchBoard}/>
        </Container>
    )
}

