import {createContext, useContext, useMemo} from "react";
import {iconSetQuartzLight, themeQuartz} from "@ag-grid-community/theming";

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const brandTheme = themeQuartz
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

    const selectionMode = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);

    return (
        <RatePresenterContext.Provider value={{
            brandTheme,
            selectionMode,
        }}>
            {children}
        </RatePresenterContext.Provider>
    );
}

export function useRatePresenterContext() {
    const context = useContext(RatePresenterContext);

    if (context === undefined) {
        throw new Error('useRatePresenterContext must be used within a RatePresenterProvider')
    }

    return context;
}