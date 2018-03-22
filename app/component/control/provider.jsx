import React from "react";
import PropTypes from "prop-types";

const Provider = prop => {
  const { eventHandle } = prop;
  const { control } = prop.control.filter;
  const { header } = prop.control;
  let component = createControl(control, prop.control.property, eventHandle);
  return (
    <div className="col-xs-3">
      {createLabel(header, prop.control.property)}
      {component}
    </div>
  );
};

const createLabel = (prop, htmlFor) => (
  <label htmlFor={htmlFor}>{prop.label}</label>
);

const createControl = (prop, property, event) => {
  const { type, props } = prop;
  let component = null;
  switch (type) {
    case "dropdown":
      const { options } = prop;
      component = (
        <select
          onChange={event}
          onBlur={ev => console.log(ev)}
          id={property}
          data-col={property}
          {...props}
        >
          {options.map((itm, k) => {
            if (typeof itm === "object")
              return (
                <option key={k} value={itm.key}>
                  {itm.value}
                </option>
              );
            else
              return (
                <option key={k} value={itm}>
                  {itm}
                </option>
              );
          })}
        </select>
      );
      break;
    case "input:checkbox":
      component = (
        <input
          id={property}
          onChange={event}
          type="checkbox"
          data-col={property}
          {...props}
        />
      );
      break;
    case "input:number":
      component = (
        <input
          id={property}
          onChange={event}
          type="number"
          data-col={property}
          {...props}
        />
      );
      break;
    default:
      component = (
        <input
          id={property}
          onChange={event}
          type="text"
          data-col={property}
          {...props}
        />
      );
      break;
  }
  return component;
};
Provider.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
  id: PropTypes.string,
  eventHandle: PropTypes.func.isRequired
};

export default Provider;
