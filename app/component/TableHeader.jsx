import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ props }) => {
    const { columns, css } = props

    return (
        <tr>
            {columns.map((item,key) => {



                return(

                )
            })}
            
        </tr>
    )
}
TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    css: PropTypes.string
}

export default TableHeader