import React from 'react';
import { Link } from 'react-router';
import Info from './index';

export default class Router extends Info {
  renderItems(node) {
    return (
      <tbody>
      <tr>
        <th>名称</th>
        <td><Link to={`/app/routers/${node.id}`}>{node.name}</Link></td>
      </tr>
      <tr>
        <th>状态</th>
        <td>{node.status}</td>
      </tr>
      <tr>
        <th>网关</th>
        <td>{node.gateway}</td>
      </tr>
      <tr>
        <th>创建时间</th>
        <td>{node.createdAt ? new Date(node.createdAt).toLocaleString() : ''}</td>
      </tr>
      </tbody>
    );
  }
}
