import React from 'react';
import classnames from 'classnames';
import kebabCase from 'lodash/kebabCase';

export default class Node extends React.Component {
  static propTypes = {
    data: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      nodeType: React.PropTypes.string.isRequired,
      collapsed: React.PropTypes.bool,
      servers: React.PropTypes.arrayOf(React.PropTypes.string),
      networks: React.PropTypes.arrayOf(React.PropTypes.string),
    }).isRequired,
    selected: React.PropTypes.bool.isRequired,
    handleMouseOver: React.PropTypes.func.isRequired,
    handleMouseOut: React.PropTypes.func.isRequired,
    handleSelect: React.PropTypes.func.isRequired,
  };

  renderFrame() {
    return (
      <circle
        className="frame"
        r={this.radius}
      />
    );
  }

  renderContent() {
    return (
      <text
        is
        class="content"
        text-anchor="middle"
        dominant-baseline="central"
        transform={`scale(${this.scale})`}
      >{this.icon}</text>
    );
  }

  renderLabel(name) {
    return (
      <text
        className="node-label"
        transform={`translate(${this.radius + 5},3)`}
      >{name}</text>
    );
  }

  renderVMCount() {
    return null;
  }

  render() {
    const {
      data,
      handleMouseOver,
      handleMouseOut,
      handleSelect,
      selected,
    } = this.props;
    return (
      <g
        className={classnames({
          node: true,
          [kebabCase(data.type)]: true,
          selected,
        })}
        transform={`translate(${data.x}, ${data.y})`}
        onMouseOver={handleMouseOver(data)}
        onMouseOut={handleMouseOut(data)}
        onClick={handleSelect(data)}
      >
        {this.renderFrame()}
        {this.renderContent()}
        {this.renderLabel(data.name)}
        {this.renderVMCount()}
      </g>
    );
  }
}
