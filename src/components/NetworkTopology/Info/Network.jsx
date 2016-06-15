import React from 'react';
import { Link } from 'react-router';
import Info from './index';

export default class Network extends Info {
  renderSubnets(subnets) {
    if (!Array.isArray(subnets)) return [];

    const x = subnets.reduce((prev, curr, index) => {
      prev.push(<Link key={curr.id} to={`/app/subnets/${curr.id}`}>{curr.name}</Link>);

      if (index !== subnets.length - 1) {
        prev.push(', ');
      }

      return prev;
    }, []);
    return x;
  }

  renderItems(node) {
    return (
      <tbody>
      <tr>
        <th>名称</th>
        <td><Link to={`/app/networks/${node.id}`}>{node.name}</Link></td>
      </tr>
      <tr>
        <th>状态</th>
        <td>{node.status}</td>
      </tr>
      <tr>
        <th>子网</th>
        <td>
          {this.renderSubnets(node.subnets)}
        </td>
      </tr>
      <tr>
        <th>创建时间</th>
        <td>{node.createdAt ? new Date(node.createdAt).toLocaleString() : ''}</td>
      </tr>
      </tbody>
    );
  }
}
