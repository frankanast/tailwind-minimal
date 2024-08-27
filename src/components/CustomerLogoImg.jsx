import 'react';

export default function CustomerLogoImg({prop}) {
    return (
        <img
            alt={prop.company_name ? `${prop.company_name} Logo` : "Hotel Logo"}
            src={prop.logo?.signifier?.url || ""}
            className="h-8 w-auto"
        />
    )
}