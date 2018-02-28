import React from "react";
import * as Table from "reactabular-table";

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
      css: "",
      columns: [],
      rows: [],
      rowKey: "",
      cr: ""
    };
  }
  componentDidMount() {
    const { columns, rows, css, rowKey, cr } = this.props;
    this.setState({
      css,
      columns,
      rows,
      rowKey,
      cr
    });
  }
  componentWillReceiveProps(nextProps) {
    const { rows } = nextProps;
    this.setState({ rows });
  }

  render() {
    const { rows, columns } = this.state;
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
          <Table.Body rows={rows} rowKey={this.state.rowKey} />
        </Table.Provider>
      </div>
    );
  }
}

export default App;
