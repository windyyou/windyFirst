import React from 'react';

// component in ReactTransitionGroup can not be stateless function
export default class Hull extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    fill: React.PropTypes.string.isRequired,
    stroke: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <path
        className="hull"
        fill={this.props.fill}
        stroke={this.props.stroke}
        d={this.props.path}
      />
    );
  }
}
