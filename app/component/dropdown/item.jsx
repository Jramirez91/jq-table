import React from "react";
import PropTypes from "prop-types";
const Item = props => {
  let anchor = props.href ? true : false;
  const { onHandleClick, target, href, title } = props;

  return (
    <li>
      {anchor ? (
        <a href={href} onClick={onHandleClick} target={target} title={title}>
          {title}
        </a>
      ) : (
        <button onClick={onHandleClick} title={title}>
          {title}
        </button>
      )}
    </li>
  );
};
Item.propTypes = {
  onHandleClick: PropTypes.func,
  href: PropTypes.string,
  title: PropTypes.string
};
export default Item;
