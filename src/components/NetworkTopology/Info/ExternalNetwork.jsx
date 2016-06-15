import React from 'react';
import Info from './index';

export default class ExternalNetwork extends Info {
  renderItems(node) {
    return (
      <tbody>
      <tr>
        <th>名称</th>
        <td>{node.name}</td>
      </tr>
      <tr>
        <th>状态</th>
        <td>{node.status}</td>
      </tr>
      </tbody>
    );
  }
}
