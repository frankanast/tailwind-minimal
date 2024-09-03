import React, { useState, useEffect } from 'react';

function CustomerLogoImg({ name }) {
    const [SvgComponent, setSvgComponent] = useState(null);

    useEffect(() => {
        async function loadSvg() {
            const { ReactComponent } = await import('/src/assets/child.svg');
            setSvgComponent(() => ReactComponent);
        }

        loadSvg();
    }, [name]);

    return SvgComponent ? <SvgComponent /> : null;
}

export default CustomerLogoImg;