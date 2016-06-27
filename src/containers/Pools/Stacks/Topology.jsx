import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NetworkTopology from '../../../components/NetworkTopology';
import { fetchStack } from '../../../actions/stack';
import Spin from 'antd/lib/spin';

const propTypes = {
  stack: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        network: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          servers: React.PropTypes.array,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
        compute: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          networks: React.PropTypes.array,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          image: React.PropTypes.object,
          ips: React.PropTypes.array.isRequired,
          floatingIps: React.PropTypes.array.isRequired,
          type: React.PropTypes.string.isRequired,
        })).isRequired,
        router: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          servers: React.PropTypes.array,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          gateway: React.PropTypes.string.isRequired,
          networks: React.PropTypes.array,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

function loadData(props) {
  props.fetchStack(props.params.key);
}

class Topology extends React.Component {
  state = {
    width: document.body.clientWidth - 300,
    height: document.body.clientHeight - 250,
  };

  componentDidMount() {
    loadData(this.props);
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

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const stack = this.props.stack.current.data;

    const stackNetworks = stack.network.map(network => (
      {
        id: network.id,
        name: network.name,
        nodeType: 'NETWORK',
        servers: network.servers.map(server => server),
        status: network.status,
        createdAt: network.createdAt,
      })
    );

    const stackServers = stack.compute.map(server => (
      {
        id: server.id,
        name: server.name,
        nodeType: 'SERVER',
        networks: server.networks.map(network => network),
        type: server.type,
        status: server.status,
        image: server.image,
        ips: server.ips.map(ip => ip),
        floatingIps: server.floatingIps.map(fip => fip),
        createdAt: server.createdAt,
      })
    );

    const stackRouters = stack.router.map(router => (
      {
        id: router.id,
        name: router.name,
        nodeType: 'ROUTER',
        networks: router.networks.map(network => network),
        servers: router.servers.map(server => server),
        status: router.status,
        gateway: router.gateway,
        createdAt: router.createdAt,
      })
    );

    const netData = {
      networks: stackNetworks,
      servers: stackServers,
      routers: stackRouters,
    };

    return (
      <div className="stack-topology">
        <NetworkTopology
          width={this.state.width}
          height={this.state.height}
          data={netData}
        />
      </div>
    );
  }
}

Topology.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    stack: state => state.stack,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStack: key => dispatch(fetchStack(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topology);
