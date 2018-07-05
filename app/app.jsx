import React from "react";
import { render } from "react-dom";
import * as Table from "reactabular-table";
import * as edit from "react-edit";
import { cloneDeep, findIndex } from "lodash";
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
      selector: "",
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
    this.getColumns = this.getColumns.bind(this);
  }

  eventHandle(par) {
    let { event, input } = par;
    let query = this.state.query;

    console.log(event.target.type);
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
      case "checkbox":
        if (!event.target.checked) {
          delete query[event.target.dataset.col];
        } else {
          query[event.target.dataset.col] = event.target.value;
        }
        break;
      case "button":
        if (input.value === "") {
          delete query[input.dataset.col];
        } else {
          query[input.dataset.col] = input.value;
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

  getColumns(columns) {
    const editable = edit.edit({
      activateEvent: "onDoubleClick",
      isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
      onActivate: ({ columnIndex, rowData }) => {
        const index = findIndex(this.state.rows, { id: rowData.id });
        const rows = cloneDeep(this.state.rows);

        rows[index].editing = columnIndex;

        this.setState({ rows });
      },
      onValue: ({ value, rowData, property }) => {
        const index = findIndex(this.state.rows, { id: rowData.id });
        const rows = cloneDeep(this.state.rows);

        rows[index][property] = value;
        rows[index].editing = false;

        this.setState({ rows });
      }
    });

    columns.forEach(it => {
      if (it.edit) {
        if (!it.cell) {
          it.cell = [];
        }
        if (!it.cell.transforms) {
          if (it.edit.type) {
            switch (it.edit.type) {
              case "input":
                it.cell.transforms = [
                  editable(edit.input({ props: it.edit.props }))
                ];
                break;
              case "dropdown":
                it.cell.transforms = [
                  editable(
                    edit.dropdown({
                      options: it.edit.options,
                      props: it.edit.props
                    })
                  )
                ];
                break;
              default:
                break;
            }
          }
        }
      }
    });
    return columns;
  }

  componentDidMount() {
    const { rows, css, rowKey, cr, elementFilter, selector } = this.props;
    let { emptyData, columns } = this.props;
    let controls = [];
    if (emptyData === undefined) {
      emptyData = "Información no disponible";
    }

    columns = this.getColumns(columns);

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
      if (nd) render(tmpControls, nd);
    }
    this.setState({
      selector,
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
    const { rows, columns, query } = this.state;

    this.props.action(rows, this.state.selector);
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
                <td colSpan={columns.length} className="col-sm-12" style={{ textAlign: "center" }}>
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
