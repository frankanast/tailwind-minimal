import { AgGridReact } from 'ag-grid-react';
import {useMemo, useState} from "react";
import { themeQuartz, iconSetQuartzLight } from '@ag-grid-community/theming';

// to use myTheme in an application, pass it to the theme grid option
const brandGridTheme = themeQuartz
    .withPart(iconSetQuartzLight)
    .withParams({
        accentColor: "#2E5749",
        backgroundColor: "#ffffff",
        browserColorScheme: "light",
        cellHorizontalPaddingScale: null,
        checkboxCheckedBackgroundColor: "#CD7529",
        checkboxCheckedBorderColor: "#CD7529",
        columnBorder: false,
        fontFamily: {
            googleFont: "Inter"
        },
        fontSize: "14px",
        foregroundColor: "rgb(46, 55, 66)",
        headerBackgroundColor: "#F9FAFB",
        headerFontSize: 14,
        headerFontWeight: 500,
        headerHeight: "45px",
        headerTextColor: "#919191",
        oddRowBackgroundColor: "#F9FAFB",
        rowBorder: false,
        rowVerticalPaddingScale: 0.7,
        selectedRowBackgroundColor: "#E3A65629",
        sidePanelBorder: false,
        spacing: "12px",
        wrapperBorder: false,
        wrapperBorderRadius: 0
    });

// A BasicSolutionCard is responsible for parsing and representing a dataset from our API endpoint for a specific occupancy

const BasicSolutionCard = ({rows, columns}) => {
    // TODO: In reality, the data is passed as a JSON object (or Javascript object) straight from the endpoint.
    //  It will be responsibility of this component to represent it by dynamically populate rowData and colDefs.

    const [rowData, setRowData] = useState([
        {category: "Premium Deluxe", rateGri: 600, rateTww: 550, rate4x3: 400},
        {category: "Prestige", rateGri: 650, rateTww: 600, rate4x3: 400},
        {category: "Suite", rateGri: 700, rateTww: 650, rate4x3: 400},
        {category: "Suite Premium", rateGri: 600, rateTww: 550, rate4x3: 400},
        {category: "Loggia", rateGri: 650, rateTww: 600, rate4x3: 400},
        {category: "Legnaia", rateGri: 700, rateTww: 650, rate4x3: 400},
        {category: "Pieve", rateGri: 700, rateTww: 650, rate4x3: 400},
        {category: "Uliveta", rateGri: 700, rateTww: 650, rate4x3: 400},
        {category: "Erbe", rateGri: 700},

    ]);

    const [colDefs, setColDefs] = useState([
        {field: "category", headerName: "Category", },
        {field: "rateGri", headerName: "Grigio", valueFormatter: p => p.value ? `€ ${p.value?.toLocaleString()}` : ""},
        {field: "rateTww", headerName: "TWW", valueFormatter: p => p.value ? `€ ${p.value?.toLocaleString()}` : ""},
        {field: "rate4x3", headerName: "4x3", valueFormatter: p => p.value ? `€ ${p.value?.toLocaleString()}` : ""},
    ]);

    const selection = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);


    return (
        <div className="h-96">
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={brandGridTheme}
                selection={selection}
                loadThemeGoogleFonts
            />
        </div>
    )
}

export default BasicSolutionCard