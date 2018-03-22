import React from "react";
import PropTypes from "prop-types";

const Provider = prop => {
  const { id, title, name, property, value } = prop;

  return (
    <div>
      <label htmlFor={id}>
        <input
          id={id}
          data-col={property}
          type="radio"
          name={name}
          value={value}
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
