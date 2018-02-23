import React from 'react'
import PropTypes from 'prop-types'
const TableRow = ({ props }) => {
    const { isHeader,
        data,
        css } = props

    return (
        <tr>
            
            <td>Hola mundo</td>
        </tr>
    )
}
TableRow.propTypes = {
    isHeader: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    css: PropTypes.string
}

export default TableRow