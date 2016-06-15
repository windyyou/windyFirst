import React from 'react';
import Node from './index';

export default class Network extends Node {
  // graph config
  icon = '\ue65a';
  radius = 30;
  scale = 1.5;

  renderVMCount() {
    if (this.props.collapsed && this.props.data.servers.length > 0) {
      return (
        <text
          className="vm-count"
          transform="translate(26,38)"
        >{this.props.data.servers.length}</text>
      );
    }

    return null;
  }
}
