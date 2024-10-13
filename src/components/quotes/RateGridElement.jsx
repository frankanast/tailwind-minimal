import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from "react";
import { themeQuartz, iconSetQuartzLight } from '@ag-grid-community/theming';

const brandGridTheme = themeQuartz
    .withPart(iconSetQuartzLight)
    .withParams({
        accentColor: "#285c4d",
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

const RateGridElement = ({data}) => {
    const [rowData, setRowData] = useState(data.rows);
    const [colDefs, setColDefs] = useState(data.columns.map((col) => ({
        field: col,
        headerName: `Rate ${col}`
    })));

    const selection = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);

    return (
        <div className='h-full'>
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

export default RateGridElement