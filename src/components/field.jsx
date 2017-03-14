import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Row from './row.jsx';

class Field extends Component {
  render() {
    const { field } = this.props;
    return (
      <div className="field">
        <table>
          <tbody>
          {field.map((item, index) =><Row row={index} key={index}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

Field.propTypes = {
  field: PropTypes.array.isRequired,
};

Field = connect(
  (state, props) => {
    return { field: state.game.field };
  }
)(Field);

export default Field;