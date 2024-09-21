import { themeQuartz } from '@ag-grid-community/theming';

// This is a theme to be used on AG Grid components to make them coherent with brand and TailwindCSS
// to use gridStyle in an application, pass it to the theme grid option

const gridStyle = themeQuartz
    .withParams({
            accentColor: "#2E5749",
            backgroundColor: "#ffffff",
            browserColorScheme: "light",
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
            headerFontWeight: 600,
            headerTextColor: "#919191",
            oddRowBackgroundColor: "#F9FAFB",
            rowBorder: false,
            selectedRowBackgroundColor: "#E3A65629",
            sidePanelBorder: false,
            wrapperBorder: false,
            wrapperBorderRadius: 0,
    });

export default gridStyle;