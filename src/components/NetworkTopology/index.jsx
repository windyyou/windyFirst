import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import d3 from 'd3';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

import {
  SERVER,
  ROUTER,
  NETWORK,
  EXTERNAL_NETWORK,
} from '../../constants/networkTopology';

import NetworkNode from './Node/Network';
import ExternalNetworkNode from './Node/ExternalNetwork';
import ServerNode from './Node/Server';
import RouterNode from './Node/Router';
import NetworkInfo from './Info/Network';
import ExternalNetworkInfo from './Info/ExternalNetwork';
import ServerInfo from './Info/Server';
import RouterInfo from './Info/Router';
import Link from './Link';
import Hull from './Hull';

const NODE_CLASSES = {
  NETWORK: NetworkNode,
  EXTERNAL_NETWORK: ExternalNetworkNode,
  SERVER: ServerNode,
  ROUTER: RouterNode,
};

const INFO_CLASSES = {
  NETWORK: NetworkInfo,
  EXTERNAL_NETWORK: ExternalNetworkInfo,
  SERVER: ServerInfo,
  ROUTER: RouterInfo,
};

function prepareNodesAndLinks(data, collapsedNets = []) {
  let nodes = [...data.networks, ...data.routers, ...data.servers];
  const links = [];

  // remove collapsed server
  nodes = nodes.filter(node => {
    if (node.nodeType === SERVER) {
      return !node.networks.length
        || !node.networks.every(n => collapsedNets.includes(n));
    }

    return true;
  });

  for (const node of nodes) {
    // server <--> network link
    if (node.nodeType === SERVER) {
      for (const netId of node.networks) {
        if (!collapsedNets.includes(netId)) {
          const source = nodes.findIndex(n => n.id === node.id);
          const target = nodes.findIndex(n => n.id === netId);
          links.push({
            source,
            target,
          });
        }
      }
    }

    // router <--> network link
    if (node.nodeType === ROUTER) {
      for (const netId of node.networks) {
        const source = nodes.findIndex(n => n.id === node.id);
        const target = nodes.findIndex(n => n.id === netId);
        links.push({
          source,
          target,
        });
      }
    }
  }

  return [nodes, links];
}

export default class NetworkTopology extends React.Component {
  static propTypes = {
    width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    scale: React.PropTypes.number,
    data: React.PropTypes.shape({
      networks: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        nodeType: React.PropTypes.string.isRequired,
        servers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      })).isRequired,
      servers: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        nodeType: React.PropTypes.string.isRequired,
        networks: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      })).isRequired,
      routers: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        nodeType: React.PropTypes.string.isRequired,
        networks: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      })).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      links: [],
      hulls: [],
      scale: this.props.scale || 1,
      translate: [0, 0],
      collapsedNets: [],
      mouseOverNodeId: '',
      selectedNode: null,
    };

    // setup force layout
    this.force = d3.layout.force()
      .charge(-700)
      .gravity(0.05)
      .linkDistance(d => {
        const dist = 70;
        const { source, target } = d;
        if (source.nodeType === SERVER || target.nodeType === SERVER) {
          const s = source.networks ? source : target;
          const t = source.networks ? target : source;
          return (dist * s.networks.length) + (5 * t.servers.length) + 20;
        } else if (source.nodeType === ROUTER || target.nodeType === ROUTER) {
          const s = source.networks ? source : target;
          const t = source.networks ? target : source;
          if (s.networks.length === 0) {
            return dist + 20;
          } else if (t.servers.length > 0) {
            return dist * s.networks.length + (10 * t.servers.length) + 20;
          }

          return dist * source.networks.length + 20;
        }

        return dist;
      });

    // setup zoom behavior
    this.zoom = d3.behavior.zoom()
      .scaleExtent([0.5, 1.5])
      .on('zoom', this.handleZoom);

    // setup curve
    this.curve = d3.svg.line()
      .interpolate('cardinal-closed')
      .tension(0.85);

    // setup color
    this.color = d3.scale.category10();
  }

  componentDidMount() {
    // apply zoom behavior
    d3.select('.outer').call(this.zoom)
      .on('dblclick.zoom', this.handleReset);

    this.updateForce(...prepareNodesAndLinks(this.props.data));
  }

  componentWillReceiveProps(nextProps) {
    this.updateForce(...prepareNodesAndLinks(nextProps.data));
  }

  componentWillUnmount() {
    this.force.stop();
  }

  handleMouseOver = node => e => {
    e.preventDefault();
    this.setState({
      mouseOverNodeId: node.id,
    });
  };

  handleMouseOut = () => e => {
    e.preventDefault();
    this.setState({
      mouseOverNodeId: '',
    });
  };

  handleCollapse = () => {
    let collapsedNets = [];

    if (!this.state.collapsedNets.length) {
      collapsedNets = this.state.nodes.filter(n =>
      n.nodeType === NETWORK || n.nodeType === EXTERNAL_NETWORK).map(n => n.id);
    }

    this.setState({ collapsedNets });
    this.updateForce(...prepareNodesAndLinks(this.props.data, collapsedNets));
  };

  handleSelect = node => e => {
    if (e.defaultPrevented) return;

    this.setState({
      selectedNode: node,
    });
  };

  handleZoom = () => {
    // sync zoom status with react
    this.setState({
      scale: this.zoom.scale(),
      translate: d3.event.translate,
    });
  };

  handleReset = () => {
    // reset zoom by d3
    this.zoom.scale(1).translate([0, 0]);

    // sync zoom status with react
    this.setState({
      scale: 1,
      translate: [0, 0],
    });
  };

  updateHulls = nodes => {
    const hulls = {};
    const offset = 40;

    for (const node of nodes) {
      if (node.nodeType === SERVER) {
        for (const net of node.networks) {
          const hull = hulls[net] = hulls[net] || [];
          hull.push([node.x - offset, node.y - offset]);
          hull.push([node.x - offset, node.y + offset]);
          hull.push([node.x + offset, node.y - offset]);
          hull.push([node.x + offset, node.y + offset]);
        }
      }

      if (node.nodeType === NETWORK) {
        const hull = hulls[node.id] = hulls[node.id] || [];
        hull.push([node.x - offset, node.y - offset]);
        hull.push([node.x - offset, node.y + offset]);
        hull.push([node.x + offset, node.y - offset]);
        hull.push([node.x + offset, node.y + offset]);
      }
    }

    return Object.keys(hulls).map(id => ({
      network: id,
      path: d3.geom.hull(hulls[id]),
    }));
  };

  updateForce = (nodes, links) => {
    const { force } = this;

    // apply drag behavior
    force.drag();

    force
      .size([this.props.width * 0.75, this.props.height])
      .nodes(nodes)
      .links(links)
      .start()
      .on('tick', () => {
        const forceNodes = force.nodes();
        const forceLinks = force.links();
        const hulls = this.updateHulls(forceNodes);

        // apply drag behavior
        d3.selectAll('.node')
          .data(forceNodes)
          .call(force.drag);

        // sync force state with react
        this.setState({
          nodes: forceNodes,
          links: forceLinks,
          hulls,
        });
      });
  };

  renderInfo(node) {
    if (!node) return null;
    return React.createElement(INFO_CLASSES[node.nodeType], { node });
  }

  render() {
    const transform = `translate(${this.state.translate[0]},${this.state.translate[1]})`
      + `scale(${this.state.scale})`;

    return (
      <Row
        type="flex"
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      >
        <Col span="18">
          <div>
            <Button
              size="large"
              onClick={this.handleCollapse}
            >{`${this.state.collapsedNets.length > 0 ? '展开' : '折叠'}网络`}</Button>
          </div>
          <svg
            className="network-topology"
            width="100%"
            height={this.props.height}
          >
            <g className="outer">
              <rect
                width="100%"
                height="100%"
                fill="none"
              />
            </g>
            <ReactTransitionGroup
              component="g"
              transform={transform}
            >
              {this.state.hulls.map((hull, i) => (
                <Hull
                  key={i}
                  fill={this.color(hull.network)}
                  stroke={this.color(hull.network)}
                  path={this.curve(hull.path)}
                />
              ))}
              {this.state.links.map((link, i) => {
                const overNodeId = this.state.mouseOverNodeId;
                const selectedNode = this.state.selectedNode;
                const highlight = link.source.id === overNodeId || link.target.id === overNodeId;
                const selected = !!selectedNode &&
                  (link.source.id === selectedNode.id || link.target.id === selectedNode.id);

                return <Link key={i} data={link} highlight={highlight} selected={selected} />;
              })}
              {this.state.nodes.map((node, i) => (
                React.createElement(
                  NODE_CLASSES[node.nodeType],
                  {
                    key: i,
                    data: node,
                    handleMouseOver: this.handleMouseOver,
                    handleMouseOut: this.handleMouseOut,
                    handleNetClick: this.handleNetClick,
                    handleSelect: this.handleSelect,
                    selected: !!this.state.selectedNode && node.id === this.state.selectedNode.id,
                    collapsed: this.state.collapsedNets.length > 0,
                  }
                )
              ))}
            </ReactTransitionGroup>
          </svg>
        </Col>
        <Col span="6">
          {this.renderInfo(this.state.selectedNode)}
        </Col>
      </Row>
    );
  }
}
