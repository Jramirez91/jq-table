import React from 'react'
import PropTypes from 'prop-types'
const Item = (props) => {
    let anchor = props.href ? true : false
    return (
        <li>
            {
                anchor ?
                    <a href={props.href} onClick={props.onHandleClick} title={props.title}>{props.title}</a> :
                    <button onClick={props.onHandleClick} title={props.title}>{props.title}</button>}
        </li>
    )
}
Item.propTypes = {
    onHandleClick: PropTypes.func,
    href: PropTypes.string,
    title: PropTypes.string,

}
export default Item