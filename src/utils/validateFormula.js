import {parse, evaluate} from 'mathjs';

export default function validateFormula(formula, scope={}) {
    try {
        const node = parse(formula);
        node.evaluate(scope);

        return true;
    } catch (error) {
        console.log("Error evaluating formula:", error)
        return false;
    }
}