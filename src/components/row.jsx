import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Cell from './cell.jsx';

class Row extends Component {
  render() {
    const { row, cols } = this.props;
    return (
      <tr>
        {cols.map((item, index) =><Cell cell={item} key={row + '-' + index}/>)}
      </tr>
    )
  }
}

Row.propTypes = {
  row: PropTypes.number.isRequired,
  cols: PropTypes.array.isRequired,
};

Row = connect(
  (state, props) => {
    return { cols: state.game.field[props.row] };
  }
)(Row);

export default Row;