import React from 'react';
import Form from 'antd/lib/form';
import FormButtonArea from '../../../common/FormButtonArea';
import NetworkTopology from '../../../../components/NetworkTopology';

class Step4 extends React.Component {
  static propTypes = {
    spec: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  state = {
    width: document.body.clientWidth - 300,
    height: document.body.clientHeight - 250,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: document.body.clientWidth - 300,
      height: document.body.clientHeight - 250,
    });
  };

  handleSubmit = e => {
    this.props.handleSubmit(e);
  };

  render() {
    const { spec } = this.props;

    const servers = [];
    const networks = [];
    const routers = [];

    for (const data of spec.netInstance) {
      const netServer = [];
      for (let i = 0; i < data.number; i++) {
        servers.push({ id: i + data.name,
          name: 'instance', nodeType: 'SERVER', networks: [data.name] });
        netServer.push(i + data.name);
      }

      networks.push({ id: data.name, name: data.name, nodeType: 'NETWORK', servers: netServer });
    }

    const server = 'server';
    if (servers.length < spec.quantity) {
      const num = spec.quantity - servers.length;
      for (let i = 0; i < num; i++) {
        servers.push({ id: i + server, name: 'instance', nodeType: 'SERVER', networks: [] });
      }
    }

    if (spec.netInstance.length < spec.network.length) {
      for (const network of spec.network) {
        let match = 0;
        for (const net of spec.netInstance) {
          if (net.name === network.name) {
            match++;
            break;
          }
        }

        if (match === 0) {
          networks.push({ id: network.name, name: network.name, nodeType: 'NETWORK', servers: [] });
        }
      }
    }

    const data = { networks, servers, routers };

    return (
      <div className="form-area">
        <NetworkTopology
          width={this.state.width}
          height={this.state.height}
          data={data}
        />
        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Form.create()(Step4);
