import {createContext, useContext, useEffect, useRef, useState} from "react";
import {nanoid} from "nanoid";
import validateFormula from "../../utils/validateFormula.js";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";

export const FormulaEditorContext = createContext(undefined);

export function FormulaEditorProvider({ children }) {
    const formulaPresets = [
        // TODO: When Authentication will be implemented and metadata will be exposed by a context,
        // formulaPresets will be consumed from there (so it can be customized for each client according to corporate needs)
        {id: nanoid(), name: "Repeating Guest", description: "Repeating Guest (min 4 stays): 5% discount.", expression: "rateAmount - 5%"},
        {id: nanoid(), name: "Loyalty Silver Guest", description: "Loyalty Silver Guest (min 10 stays): 10% discount.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "10% Discount", description: "Preferential rate: 10% reduction on nightly rate.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "No Breakfast", description: "Rates net breakfast quota.", expression: "rateAmount - (38 * adults)"},
        {id: nanoid(), name: "Net VAT", description: "Rate Amount, net 10% VAT.", expression: "rateAmount / 1.1"},

        {id: nanoid(), name: "Repeating Guest", description: "Repeating Guest (min 4 stays): 5% discount.", expression: "rateAmount - 5%"},
        {id: nanoid(), name: "Loyalty Silver Guest", description: "Loyalty Silver Guest (min 10 stays): 10% discount.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "10% Discount", description: "Preferential rate: 10% reduction on nightly rate.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "No Breakfast", description: "Rates net breakfast quota.", expression: "rateAmount - (38 * adults)"},
        {id: nanoid(), name: "Net VAT", description: "Rate Amount, net 10% VAT.", expression: "rateAmount / 1.1"},
    ]

    const [formulaDialogIsOpen, setFormulaDialogIsOpen] = useState(false);
    const [formulaInput, setFormulaInput] = useState('');

    const [formulaIsValid, setFormulaIsValid] = useState(true);
    const [formulaError, setFormulaError] = useState(undefined)

    const allRooms = useRef([]);
    const allRates = useRef([]);
    const [selectedRateOptions, setSelectedRateOptions] = useState([])

    let {parsedData} = useRatePresenterContext()

    useEffect(() => {
        setFormulaIsValid(validateFormula(formulaInput, setFormulaError))
    }, [formulaInput]);

    // Update allRates
    useEffect(() => {
        if (parsedData && parsedData.data) {
            allRates.current = []

            const rates = []
            parsedData.data.forEach(item => {
                item.rooms.forEach(room => {
                    room.rates.forEach(rate => {
                        rates.push({
                            id: rate.id,
                            name: rate.data.name,
                            is_package: rate.data.is_package
                        });
                    });
                });
            });

            allRates.current = rates.filter((rate, index, self) =>
                index === self.findIndex((r) => r.id === rate.id)
            );
        }
    }, [parsedData]);

    return (
        <FormulaEditorContext.Provider value={{
            formulaDialogIsOpen,
            setFormulaDialogIsOpen,
            formulaInput,
            setFormulaInput,
            formulaPresets,
            formulaIsValid,
            setFormulaIsValid,
            formulaError,
            setFormulaError,
            selectedRateOptions,
            setSelectedRateOptions,
            allRooms,
            allRates,
        }}>
            {children}
        </FormulaEditorContext.Provider>
    );
}

export function useFormulaEditorContext() {
    const context = useContext(FormulaEditorContext);
    if (context === undefined) {
        throw new Error('useFormulaEditorContext must be used within a FormulaEditorProvider');
    }
    return context;
}
