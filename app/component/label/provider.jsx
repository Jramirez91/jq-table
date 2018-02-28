import React from "react";
import PropTypes from "prop-types";

const Provider = prop => {
  const { id, title, mode } = prop;
  let bnColor = "label label-default";
  switch (mode) {
    case "primary":
      bnColor = "label label-primary";
      break;
    case "success":
      bnColor = "label label-success";
      break;
    case "info":
      bnColor = "label label-info";
      break;
    case "warning":
      bnColor = "label label-warning";
      break;
    case "danger":
      bnColor = "label label-danger";
      break;
    default:
      break;
  }
  return (
    <div>
      <span id={id} className={bnColor}>
        {title}
      </span>
    </div>
  );
};
Provider.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
  id: PropTypes.string
};

export default Provider;
