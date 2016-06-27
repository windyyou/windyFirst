import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Steps from 'antd/lib/steps';
import Row from 'antd/lib/row';

import { fetchPoolConfig } from '../../../actions/pool';
import { fetchImages } from '../../../actions/image';
import { fetchSnapshots } from '../../../actions/snapshot';
import { fetchKeypairs } from '../../../actions/keypair';
import { fetchStackConfig, createStack } from '../../../actions/stack';

const Step = Steps.Step;
const steps = [
  { title: '网络', description: '设置网络' },
  { title: '主机', description: '设置主机配置' },
  { title: '服务', description: '选择启用服务' },
  { title: '拓扑', description: '预览拓扑图' },
];

function loadData(props) {
  props.fetchPoolConfig();
  props.fetchStackConfig();
  props.fetchImages();
  props.fetchSnapshots();
  props.fetchKeypairs();
}

class New extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    children: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    pool: React.PropTypes.object.isRequired,
    stack: React.PropTypes.object.isRequired,
    image: React.PropTypes.object.isRequired,
    snapshot: React.PropTypes.object.isRequired,
    keypair: React.PropTypes.object.isRequired,
    createStack: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      spec: {
        network: [],
        sourceType: 'image',
        source: '',
        system: '',
        instanceType: '',
        core: 1,
        ram: 1,
        volumeType: '',
        volumeSize: 1,
        credentialType: 'password',
        userName: 'admin',
        password: '',
        keypair: '',
        quantity: 1,
        netInstance: [],
        databasesEnable: false,
        monitorEnable: false,
        VPNEnable: false,
        loadBalancerEnable: false,
        firewallEnable: false,
        sumNet: 0,
      },
    };
  }

  componentDidMount() {
    loadData(this.props);
  }

  handleSpecChange = e => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleNetInstance = (netInstance, sumNet) => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        netInstance,
        sumNet,
      },
    });
  };

  handleNextClick = e => {
    e.preventDefault();
    let step = this.state.current + 1;
    if (step > steps.length) step = steps.length;

    const poolId = this.props.params.poolId;

    this.setState({
      current: step,
    });

    this.context.router.push(`/app/pools/${poolId}/stacks/new/step-${step}`);
  };

  handlePreviousClick = e => {
    e.preventDefault();

    const poolId = this.props.params.poolId;
    let step = this.state.current - 1;
    if (step < 1) step = 1;

    this.setState({
      current: step,
    });

    this.context.router.push(`/app/pools/${poolId}/stacks/new/step-${step}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    const newSpec = { ...this.state.spec, ram: this.state.spec.ram * 1024 };

    this.props.createStack(newSpec);
    this.context.router.push('/app/pools');
  };

  render() {
    return (
      <div className="new-pool-template">
        <div className="steps">
          <Steps current={this.state.current - 1}>
            {steps.map((step, i) =>
              <Step title={step.title} description={step.description} key={i} />
            )}
          </Steps>
        </div>
        <Row type="flex" justify="center">
          {React.cloneElement(this.props.children,
            {
              current: this.state.current,
              total: steps.length,
              spec: this.state.spec,
              handleNextClick: this.handleNextClick,
              handlePreviousClick: this.handlePreviousClick,
              handleSubmit: this.handleSubmit,
              handleSpecChange: this.handleSpecChange,
              handleNetInstance: this.handleNetInstance,
              pool: this.props.pool,
              image: this.props.image,
              snapshot: this.props.snapshot,
              keypair: this.props.keypair,
              stack: this.props.stack,
            })}
        </Row>
      </div>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    pool: state => state.pool,
    stack: state => state.stack,
    image: state => state.image,
    snapshot: state => state.snapshot,
    keypair: state => state.keypair,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPoolConfig: () => dispatch(fetchPoolConfig()),
    fetchStackConfig: () => dispatch(fetchStackConfig()),
    fetchImages: () => dispatch(fetchImages()),
    fetchSnapshots: () => dispatch(fetchSnapshots()),
    fetchKeypairs: () => dispatch(fetchKeypairs()),
    createStack: params => dispatch(createStack(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
