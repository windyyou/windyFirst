import React from 'react';
import NetworkTopology from '../../components/NetworkTopology';

const netData = {
  networks: [
    { id: 'a', name: 'ext', type: 'EXTERNAL_NETWORK', servers: [] },
    { id: 'b', name: 'net1', type: 'NETWORK', servers: ['d', 'e', 'i'] },
    { id: 'c', name: 'net2', type: 'NETWORK', servers: ['d'] },
    { id: 'h', name: 'net3', type: 'NETWORK', servers: [] },
  ],
  servers: [
    { id: 'd', name: 'server1', type: 'SERVER', networks: ['b', 'c'] },
    { id: 'e', name: 'server2', type: 'SERVER', networks: ['b'] },
    { id: 'f', name: 'server3', type: 'SERVER', networks: [] },
    { id: 'i', name: 'server3', type: 'SERVER', networks: ['b'] },
  ],
  routers: [
    { id: 'g', name: 'router', type: 'ROUTER', networks: ['b', 'a'] },
  ],
};

export default function New() {
  return (
    <div className="new-template">
      <NetworkTopology
        width="1050"
        height="650"
        data={netData}
      />
    </div>
  );
}
