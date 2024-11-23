import {createContext, useContext, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import validateFormula from "../utils/validateFormula.js";

export const FormulaDialogContext = createContext(undefined);

export function FormulaDialogProvider({ children }) {
    const formulaPresets = [
        // TODO: When Authentication will be implemented and metadata will be exposed by a context,
        // formulaPresets will be consumed from there (so it can be customized for each client according to corporate needs)
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

    const [selectedRateOptions, setSelectedRateOptions] = useState([])
    const [newName, setNewName] = useState(undefined);

    useEffect(() => {
        setFormulaIsValid(validateFormula(formulaInput, setFormulaError))

    }, [formulaInput]);

    return (
        <FormulaDialogContext.Provider value={{
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
            newName,
            setNewName,
        }}>
            {children}
        </FormulaDialogContext.Provider>
    );
}

export function useFormulaDialogContext() {
    const context = useContext(FormulaDialogContext);
    if (context === undefined) {
        throw new Error('useFormulaEditorContext must be used within a FormulaEditorProvider');
    }
    return context;
}
