import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import QuoteStandardConfigurator from "./QuoteStandardConfigurator.jsx";
import QuoteTailoredConfigurator from "./QuoteTailoredConfigurator.jsx";

export default function Configurator() {
    const {isOnStandardMode} = useRatePresenterContext()

    return (
        isOnStandardMode ? <QuoteStandardConfigurator /> : <QuoteTailoredConfigurator />
    )
}