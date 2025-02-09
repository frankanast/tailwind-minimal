import 'react'
import {FlagIcon} from "@heroicons/react/16/solid/index.js";
import {
    BrazilFlagIcon,
    ChinaFlagIcon, FranceFlagIcon,
    GermanyFlagIcon, ItalyFlagIcon, JapanFlagIcon, RussiaFlagIcon,
    SaudiArabiaFlagIcon, SpainFlagIcon,
    UkFlagIcon
} from "../assets/icons/countryFlags.jsx";

export default function getCountryFlag(byCode, className="") {
    const flags = {
        unnamed: <FlagIcon className={className}/>,
        ar: <SaudiArabiaFlagIcon className={className}/>,
        ua: <SaudiArabiaFlagIcon className={className}/>,
        ch: <ChinaFlagIcon className={className}/>,
        zh_cn: <ChinaFlagIcon className={className}/>,
        pt: <BrazilFlagIcon className={className}/>,
        pt_br: <BrazilFlagIcon className={className}/>,
        de: <GermanyFlagIcon className={className}/>,
        en: <UkFlagIcon className={className}/>,
        es: <SpainFlagIcon className={className}/>,
        fr: <FranceFlagIcon className={className}/>,
        it: <ItalyFlagIcon className={className}/>,
        jp: <JapanFlagIcon className={className}/>,
        ru: <RussiaFlagIcon className={className}/>,
    }

    try {
        return (
            flags[byCode]
        )
    } catch {
        return <FlagIcon className={className}/>
    }
}