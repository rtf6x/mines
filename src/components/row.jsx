import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './cell.jsx';

class Row extends Component {
  render() {
    const { row, cols } = this.props;
    return (
      <div className="row">
        {cols.map((item, index) =><Cell rowKey={row} cellKey={index} key={row + '-' + index}/>)}
      </div>
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
