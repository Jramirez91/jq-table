import React from "react";

class Control extends React.Component {
  render() {
    const { event, property, prop } = this.props;
    const { type, props } = prop;
    let component = null;
    switch (type) {
      case "dropdown":
        const { options } = prop;
        component = (
          <select
            onChange={(e, input) => event({ event: e, input: input })}
            onBlur={ev => {}}
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
            onChange={(e, input) => event({ event: e, input: input })}
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
            onChange={(e, input) => event({ event: e, input: input })}
            type="number"
            data-col={property}
            {...props}
          />
        );
        break;
      case "input:button-action":
        component = (
          <div className="input-group">
            <input
              ref={input => {
                this.textInputAction = input;
              }}
              id={property}
              type="text"
              data-col={property}
              {...props}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default btn-sm"
                type="button"
                onClick={e => event({ event: e, input: this.textInputAction })}
              >
                Go!
              </button>
            </span>
          </div>
        );
        break;
      default:
        component = (
          <input
            id={property}
            onChange={(e, input) => event({ event: e, input: input })}
            type="text"
            data-col={property}
            {...props}
          />
        );
        break;
    }
    return component;
  }
}
export default Control;
