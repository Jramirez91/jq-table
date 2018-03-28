import React from "react";
import PropTypes from "prop-types";

const Provider = prop => {
  const { id, title, name, property, value, disabled } = prop;
  return (
    <div>
      <label htmlFor={id}>
        <input
          id={id}
          data-col={property}
          type="checkbox"
          name={name}
          defaultChecked={prop.initState ? true : false}
          value={value}
          disabled={disabled}
        />
        {title}
      </label>
    </div>
  );
};
Provider.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  mode: PropTypes.string,
  id: PropTypes.string,
  extra: PropTypes.object,
  property: PropTypes.string,
  value: PropTypes.string
};

export default Provider;
