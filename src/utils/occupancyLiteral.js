export default function occupancyLiteral(adults, children) {
    const adultsLiteral = `${adults} adults`
    const childrenLiteral = (children >= 1) ? `${children} children` : (children === 1) ? `${children} child` : ''

    return (`${adultsLiteral}${childrenLiteral ? ', ' + childrenLiteral : ''}`)
}
