import React from "react";
import { render } from "react-dom";
import * as Table from "reactabular-table";
import * as Tool from "./tool";
import * as Control from "./component/control";

const BodyWrapper = props => <tbody {...props} />;
BodyWrapper.shouldComponentUpdate = function(
  nextProps,
  nextState,
  nextContext
) {
  // Perform a custom check now
  // this.props is available here too
  return true;
};
// You can also use
// BodyWrapper.shouldComponentUpdate = true;
const RowWrapper = props => <tr {...props} />;
RowWrapper.shouldComponentUpdate = function(nextProps) {
  // Perform a custom check now
  // this.props is available here too
  return true;
};
// RowWrapper.shouldComponentUpdate = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crud: false,
      css: "",
      columns: [],
      rows: [],
      rowKey: "",
      cr: "",
      controls: [],
      query: {},
      emptyData: ""
    };
    this.eventHandle = this.eventHandle.bind(this);
  }
  eventHandle(event) {
    let query = this.state.query;

    switch (event.target.type) {
      case "select-one":
        if (event.target.value === "") {
          delete query[event.target.dataset.col];
        } else {
          query[event.target.dataset.col] = event.target.value;
        }
        break;
      case "text":
        if (event.target.value === "") {
          delete query[event.target.dataset.col];
        } else {
          query[event.target.dataset.col] = event.target.value;
        }
        break;
      default:
        query = {};

        break;
    }
    this.setState({
      query
    });
  }

  componentDidMount() {
    const { columns, rows, css, rowKey, cr, elementFilter } = this.props;
    let { emptyData } = this.props;
    let controls = [];
    if (emptyData === undefined) {
      emptyData = "Información no disponible";
    }
    let tmpControls = [];
    if (columns !== undefined) {
      controls = columns.filter(fil => fil.filter);
      controls.forEach((it, ky) => {
        tmpControls.push(
          <Control.Provider
            key={ky}
            control={it}
            eventHandle={this.eventHandle}
          />
        );
      });
      let nd = document.querySelector(elementFilter);
      render(tmpControls, nd);
    }
    this.setState({
      css,
      columns,
      rows,
      rowKey,
      cr,
      controls,
      emptyData
    });
  }
  componentWillReceiveProps(nextProps) {
    const { rows } = nextProps;
    this.setState({ rows });
  }

  render() {
    let rowsFilter = [];
    const { rows, columns, controls, query } = this.state;
    if (Object.getOwnPropertyNames(query).length > 0) {
      rowsFilter = Tool.multiFilter(rows, query);
    } else {
      rowsFilter = rows;
    }
    return (
      <div>
        <Table.Provider
          className={this.state.css}
          columns={columns}
          components={{
            body: {
              wrapper: BodyWrapper,
              row: RowWrapper
            }
          }}
        >
          <Table.Header />
          {rowsFilter.length > 0 ? (
            <Table.Body rows={rowsFilter} rowKey={this.state.rowKey} />
          ) : (
            <tbody>
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  {this.state.emptyData}
                </td>
              </tr>
            </tbody>
          )}
        </Table.Provider>
      </div>
    );
  }
}
export default App;
