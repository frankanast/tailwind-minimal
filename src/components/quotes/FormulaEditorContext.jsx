import { createContext, useContext, useState } from "react";
import { evaluate } from 'mathjs';
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import {nanoid} from "nanoid";

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
        {id: nanoid(), name: "10% Discount", description: "Preferential rate: 10% reduction on nightly rate.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "No Breakfast", description: "Rates net breakfast quota.", expression: "rateAmount - (38 * adults)"},
        {id: nanoid(), name: "Net VAT", description: "Rate Amount, net 10% VAT.", expression: "rateAmount / 1.1"},
    ]

    function safelyEvaluate(expression, scope, fallbackValue) {
        if (!expression || expression.trim() === '') {
            return evaluate(`rateAmount * 1`, scope || { rateAmount: fallbackValue });
        }

        try {
            return evaluate(expression, scope || { rateAmount: fallbackValue });
        } catch (error) {
            console.error("Error evaluating expression:", error);
            return fallbackValue;
        }
    }

    // This context is responsible for editing and validating a formula only.
    // To apply the formula on the selected rates, you should consume the RatePresenterContext for consistency.
    const {applyRateVariation} = useRatePresenterContext()

    const [formulaDialogIsOpen, setFormulaDialogIsOpen] = useState(false);
    const [formulaInput, setFormulaInput] = useState('');


    return (
        <FormulaEditorContext.Provider value={{
            formulaDialogIsOpen,
            setFormulaDialogIsOpen,
            formulaInput,
            setFormulaInput,
            safelyEvaluate,
            formulaPresets,
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
