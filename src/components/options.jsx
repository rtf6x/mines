import React from 'react';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.settings;
  }

  changeRows(event) {
    this.setState({ rows: event.target.value });
    this.props.onChange(this.state);
  }

  changeCols(event) {
    this.setState({ cols: event.target.value });
    this.props.onChange(this.state);
  }

  changeMines(event) {
    this.setState({ mines: event.target.value });
    this.props.onChange(this.state);
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor="rows">Размер поля: <input className="rows" value={this.state.rows}
                                                    onChange={this.changeRows}/></label>
          <label htmlFor="cols">на <input className="cols" value={this.state.cols} onChange={this.changeCols}/></label>
        </div>
        <div>
          <label htmlFor="mines">Количество мин: <input className="mines" value={this.state.mines}
                                                        onChange={this.changeMines}/></label>
        </div>
      </form>
    )
  }
}

export default Options;