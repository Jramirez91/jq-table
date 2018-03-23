import React from "react";

class Label extends React.Component {
  render() {
    const { htmlFor, label } = this.props;
    return <label htmlFor={htmlFor}>{label}</label>;
  }
}
export default Label;
