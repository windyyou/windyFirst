import React from 'react';
import NetworkTopology from '../../components/NetworkTopology';

const netData = {
  networks: [
    {
      id: 'a', name: 'ext', nodeType: 'EXTERNAL_NETWORK', servers: [],
      status: 'active',
      createdAt: '2016-04-21T15:14:07+08:00',
    },
    {
      id: 'b', name: 'net1', nodeType: 'NETWORK', servers: ['d', 'e', 'i'],
      status: 'active',
      subnets: [{ id: 'sub1', name: 'sub1' }, { id: 'sub2', name: 'sub2' }],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
    {
      id: 'c', name: 'net2', nodeType: 'NETWORK', servers: ['d'],
      status: 'active',
      subnets: [{ id: 'sub1', name: 'sub1' }, { id: 'sub2', name: 'sub2' }],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
    {
      id: 'h', name: 'net3', nodeType: 'NETWORK', servers: [],
      status: 'active',
      subnets: [{ id: 'sub1', name: 'sub1' }, { id: 'sub2', name: 'sub2' }],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
  ],
  servers: [
    {
      id: 'd', name: 'server1', nodeType: 'SERVER', networks: ['b', 'c'],
      type: 'performance',
      status: 'active',
      image: { id: 'xxx', name: 'cent os' },
      ips: ['192.168.1.2'],
      floatingIps: ['223.45.6.26'],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
    {
      id: 'e', name: 'server2', nodeType: 'SERVER', networks: ['b'],
      type: 'performance',
      status: 'active',
      image: { id: 'xxx', name: 'cent os' },
      ips: ['192.168.1.2'],
      floatingIps: ['223.45.6.26'],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
    {
      id: 'f', name: 'server3', nodeType: 'SERVER', networks: [],
      type: 'performance',
      status: 'active',
      image: { id: 'xxx', name: 'cent os' },
      ips: ['192.168.1.2'],
      floatingIps: ['223.45.6.26'],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
    {
      id: 'i', name: 'server3', nodeType: 'SERVER', networks: ['b'],
      type: 'performance',
      status: 'active',
      image: { id: 'xxx', name: 'cent os' },
      ips: ['192.168.1.2'],
      floatingIps: ['223.45.6.26'],
      createdAt: '2016-04-21T15:14:07+08:00',
    },
  ],
  routers: [
    {
      id: 'g', name: 'router', nodeType: 'ROUTER', networks: ['b', 'a'],
      status: 'active',
      gateway: '192.168.1.1',
      createdAt: '2016-04-21T15:14:07+08:00',
    },
  ],
};

export default class Topology extends React.Component {
  state = {
    width: document.body.clientWidth - 280,
    height: document.body.clientHeight - 150,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: document.body.clientWidth - 280,
      height: document.body.clientHeight - 150,
    });
  };

  render() {
    return (
      <div className="instance-topology">
        <NetworkTopology
          width={this.state.width}
          height={this.state.height}
          data={netData}
        />
      </div>
    );
  }
}
