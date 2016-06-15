import React from 'react';
import { Link } from 'react-router';
import Info from './index';

export default class Server extends Info {
  renderItems(node) {
    return (
      <tbody>
        <tr>
          <th>名称</th>
          <td><Link to={`/app/instances/${node.id}`}>{node.name}</Link></td>
        </tr>
        <tr>
          <th>状态</th>
          <td>{node.status}</td>
        </tr>
        <tr>
          <th>内网IP</th>
          <td>{(Array.isArray(node.ips) ? node.ips : []).join(', ')}</td>
        </tr>
        <tr>
          <th>公网IP</th>
          <td>{(Array.isArray(node.floatingIps) ? node.floatingIps : []).join(', ')}</td>
        </tr>
        <tr>
          <th>镜像</th>
          <td>{node.image ? node.image.name : ''}</td>
        </tr>
        <tr>
          <th>类型</th>
          <td>{node.type}</td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>{node.createdAt ? new Date(node.createdAt).toLocaleString() : ''}</td>
        </tr>
      </tbody>
    );
  }
}
