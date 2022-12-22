import React, { useState, useEffect } from "react";
import { InputAdornment, OutlinedInput, Stack } from '@mui/material';
import PackageTable from './PackageTable';
import QuotationTable from './QuotationTable';
import { Link } from "react-router-dom";
import Api from '../../Service/Api';
import { useLocation, useParams } from 'react-router'
import { twnButtonStyles } from "../../utils/townoStyle";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    height: 32,
    transition: theme.transitions.create(["box-shadow", "width"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    "& fieldset": {
        borderWidth: `1px !important`,
        borderColor: `#f46d25 !important`,
    },
}));


const buttonStyles = {
    inActivePackageBtn: { fontSize: "15px", background: "#111", cursor: "pointer", border: 0, borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", color: "white", textAlign: 'center', padding: '8px 6px' },
    activePackageBtn: { fontSize: "15px", border: '2px solid #f46d25', fontWeight: "bold", background: "#f46d25", cursor: "pointer", borderRadius: "5px", color: "white", textAlign: 'center', padding: '6px 12px' },
    inActiveQuotationBtn: { fontSize: "15px", border: 0, background: "#111", cursor: "pointer", borderTopRightRadius: "4px", borderBottomRightRadius: "4px", color: "white", padding: '8px 6px' },
    activeQuotationBtn: { fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: '2px solid #f46d25', cursor: "pointer", borderRadius: "5px", color: "white", textAlign: 'center', padding: '6px 12px' },
    createBtn: { fontSize: "15px", fontWeight: "bold", background: "#f46d25", border: 0, cursor: "pointer", borderRadius: "4px", color: "white", padding: '0.5em', textAlign: 'center' }
}

const PackageOrQuotation = (isPackage) => { return isPackage ? "Package" : "Quotation" }

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function Lead(props) {
    var uniqueid = localStorage.getItem("unique_id");
    let hasAdmin = localStorage.getItem("role");
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdAt");
    var createdBy = localStorage.getItem("auth");
    const [textToSearch, setTextToSearch] = useState("");

    // variable to store table api data 
    const [rawData, setRawData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const location = useLocation();
    // console.log("Location Key: ",location.key);
    let { pkgOrQtn } = useParams();
    let isPackage = pkgOrQtn === "package" ? true : false

    useEffect(() => {
        let url = `/GetStaffPackageOrQuotation/${uniqueid}/${PackageOrQuotation(isPackage)}/${createdBy}`;
        if (hasAdmin === "Admin" ||
            hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin") {
            url = `/getallpackageorquotation/${uniqueid}/${PackageOrQuotation(isPackage)}`;
        }
        Api.get(url).then((res) => {
            const sortedData = applySortFilter(res.data, getComparator(order, orderBy));
            setTableData(sortedData);
            setRawData(sortedData)
        })
    }, [isPackage, location.key]);

    useEffect(() => {
        if (textToSearch.length > 2) {
            var filteredArrayPackage = rawData.filter((tableRow) => {
                return tableRow.packageId.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            });

            var filteredArrayName = rawData.filter((tableRow) => {
                return tableRow.name.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            });
            var filteredArrayClientName = rawData.filter((tableRow) => {
                return tableRow.clientName.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            });
            var filteredArrayMobileNo = rawData.filter((tableRow) => {
                return tableRow.clientMobileNo.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            });

            var mergedArray = filteredArrayPackage.concat(filteredArrayName,filteredArrayClientName,filteredArrayMobileNo)
            setTableData(mergedArray);
        }
        else {
            setTableData(rawData);
        }
    }, [textToSearch])

    return (
        <div style={twnButtonStyles.allPages}>
            <Stack direction='row' justifyContent='space-between' style={{ paddingTop: '1.95%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' style={{ backgroundColor: '#111', borderRadius: '5px', height: '36px' }}>
                    <Link to={{ pathname: `/packageOrQuotation/package` }} style={isPackage ? buttonStyles.activePackageBtn : buttonStyles.inActivePackageBtn}>
                        Package List
                    </Link>
                    <Link to={{ pathname: `/packageOrQuotation/quotation` }} style={isPackage ? buttonStyles.inActiveQuotationBtn : buttonStyles.activeQuotationBtn}>
                        Quotation List
                    </Link>
                </Stack>

                <Stack direction='row' spacing={2} justifyContent='right' alignItems='right'>
                    <SearchStyle
                        value={textToSearch}
                        onChange={(e) => { setTextToSearch(e.target.value) }}
                        placeholder="Search"
                        style={twnButtonStyles.smFonts}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
                            </InputAdornment>
                        }
                    />
                    <div onClick={() => { window.open(`/createPackageOrQuotation/${pkgOrQtn}/${isPackage}`, '_self') }} style={twnButtonStyles.linkOrangeBtn}>
                        {isPackage ? "Create Package" : "Create Quotation"}
                    </div>
                </Stack>
            </Stack>
            <div style={{ marginTop: '15px' }}>{isPackage === true ? <PackageTable tableData={tableData} /> : <QuotationTable tableData={tableData} />}</div>
        </div >
    );
}

