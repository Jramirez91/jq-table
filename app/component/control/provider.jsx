import React from "react";
import PropTypes from "prop-types";
import Label from "./Label.jsx";
import Control from "./control.jsx";

const Provider = prop => {
  const { eventHandle } = prop;
  const { control } = prop.control.filter;
  let component = (
    <Control
      prop={control}
      property={prop.control.property}
      event={eventHandle}
    />
  );
  return (
    <div className="col-xs-3">
      <Label
        htmlFor={prop.control.property}
        label={prop.control.header.label}
      />
      {component}
    </div>
  );
};

Provider.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
  id: PropTypes.string,
  eventHandle: PropTypes.func.isRequired
};

export default Provider;
