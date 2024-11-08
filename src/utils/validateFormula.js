import {evaluate} from "mathjs";

export default function validateFormula(expression, scope) {
    const fakeScope = {
        rateAmount: 1,
        adults: 1,
        children: 1,
        totalGuests: 1,
        los: 1,
    };

    try {
        const finalScope = scope ? { ...fakeScope, ...scope } : fakeScope;
        evaluate(expression, finalScope);
        return true

    } catch (error) {
        console.log("User input invalid formula: ", error)
        return false
    }
}