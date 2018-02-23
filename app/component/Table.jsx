import React from 'react'
import PropTypes from 'prop-types'
import TableRow from './TableRow.jsx'

class Table extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            data: [],
            columns: []
        }
    }
    componentWillMount() {
        this.setState({ data: this.props.data })
    }
    componentWillReceiveProps(nextProps) {
        // let curData = this.state.data
        const { data } = nextProps
        this.setState({ data })
    }
    render() {
        const {
            css,
            id
        } = this.props
        return (
            <table className={css} id={id} >
                <thead>
                    
                </thead>
                <tbody>
                    {this.state.data.map((item, key) => <TableRow key={key} data={item} />)}
                </tbody>
            </table>
        )
    }
}
Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    css: PropTypes.string,
    id: PropTypes.string
}

export default Table