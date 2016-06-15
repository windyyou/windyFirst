import React from 'react';
import classnames from 'classnames';

// component in ReactTransitionGroup can not be stateless function
export default class Link extends React.Component {
  static propTypes = {
    data: React.PropTypes.shape({
      source: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
      }).isRequired,
      target: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
      }).isRequired,
    }),
    highlight: React.PropTypes.bool.isRequired,
    selected: React.PropTypes.bool.isRequired,
  };

  render() {
    const { data, highlight, selected } = this.props;
    const { source, target } = data;

    return (
      <line
        className={classnames({ link: true, highlight, selected })}
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
      />
    );
  }
}
