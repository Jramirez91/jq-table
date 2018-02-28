import React from "react";
import PropTypes from "prop-types";
import Item from "./item.jsx";
const Provider = prop => {
  const { items, onHandleClick, href, id, title, icon, size, extra } = prop;
  let bnSize = "btn btn-default dropdown-toggle";
  switch (size) {
    case "xs":
      bnSize = "btn btn-default btn-xs dropdown-toggle";
      break;
    case "sm":
      bnSize = "btn btn-default btn-sm dropdown-toggle";
      break;
    case "lg":
      bnSize = "btn btn-default btn-lg dropdown-toggle";
      break;
    default:
      break;
  }
  return (
    <div className="dropdown">
      <button
        className={bnSize}
        type="button"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {icon ? <i className={icon} /> : title}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        {items.map((it, ky) => {
          let visible = true;
          if (it.visible != undefined) {
            visible = it.visible;
            if (typeof it.visible === "function") {
              visible = it.visible(extra);
            }
          }
          let title = "";
          if (it.title != undefined) {
            title = it.title;
            if (typeof it.title === "function") {
              title = it.title(extra);
            }
          }
          let href = "";
          if (it.href != undefined) {
            href = it.href;
            if (typeof it.href === "function") {
              href = it.href(extra);
            }
          }
          return visible ? (
            <Item
              key={ky}
              title={title}
              href={href}
              onHandleClick={inp =>
                onHandleClick
                  ? onHandleClick(inp, extra)
                  : it.onHandleClick(inp, extra)
              }
              {...prop}
            />
          ) : (
            ""
          );
        })}
      </ul>
    </div>
  );
};

Provider.propTypes = {
  items: PropTypes.array,
  onHandleClick: PropTypes.func,
  href: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string
};

export default Provider;
