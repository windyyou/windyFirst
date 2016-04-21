import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Steps from 'antd/lib/steps';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import Preview from '../../components/Instances/New/Preview';
import { fetchConfig } from '../../actions/config';
import { fetchImages } from '../../actions/image';
import { fetchKeypairs } from '../../actions/keypair';
import { fetchNetworks } from '../../actions/network';
import { fetchSnapshots } from '../../actions/snapshot';

const Step = Steps.Step;
const steps = [
  { title: '镜像', description: '选择一个系统镜像或主机快照' },
  { title: '配置', description: '选择主机的CPU，内存，网络配置' },
  { title: '登录信息', description: '设置主机的系统登录信息' },
];

function loadData(props) {
  props.fetchConfig();
  props.fetchImages();
  props.fetchKeypairs();
  props.fetchNetworks();
  props.fetchSnapshots();
}

class New extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    children: React.PropTypes.object.isRequired,
    image: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
      })),
    }),
    snapshot: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
      })),
    }),
    config: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      instance: React.PropTypes.shape({
        cpu: React.PropTypes.array.isRequired,
        memory: React.PropTypes.array.isRequired,
      }).isRequired,
    }),
    network: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        subnets: React.PropTypes.array.isRequired,
      })),
    }),
    keypair: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
      })),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      spec: {
        name: 'instance',
        imageType: 'image',
        image: 'CentOS 6.4 64bit',
        cpu: 1,
        memory: 1,
        networkType: 'basic',
        subnet: 'sub1',
        username: 'root',
        credentialType: 'password',
        password: '',
        keypair: 'secret1',
        quantity: 1,
      },
    };
  }

  componentDidMount() {
    loadData(this.props);
  }

  handleSpecChange = (e) => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleNextClick = (e) => {
    e.preventDefault();
    let step = this.state.current + 1;
    if (step > steps.length) step = steps.length;

    this.setState({
      current: step,
    });

    this.context.router.push(`/instances/new/step-${step}`);
  };

  handlePreviousClick = (e) => {
    e.preventDefault();

    let step = this.state.current - 1;
    if (step < 1) step = 1;

    this.setState({
      current: step,
    });

    this.context.router.push(`/instances/new/step-${step}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.context.router.push('/instances');
  };

  render() {
    return (
      <div className="new-instance">
        <div className="steps">
          <Steps current={this.state.current - 1}>
            {steps.map((step, i) =>
              <Step title={step.title} description={step.description} key={i} />
            )}
          </Steps>
        </div>
        <Row>
          <Col span="14">
            {React.cloneElement(this.props.children,
              {
                current: this.state.current,
                total: steps.length,
                spec: this.state.spec,
                handleNextClick: this.handleNextClick,
                handlePreviousClick: this.handlePreviousClick,
                handleSubmit: this.handleSubmit,
                handleSpecChange: this.handleSpecChange,
                config: this.props.config,
                image: this.props.image,
                keypair: this.props.keypair,
                network: this.props.network,
                snapshot: this.props.snapshot,
              })}
          </Col>
          <Col span="8" offset="2">
            <Preview spec={this.state.spec} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    config: state => state.config,
    image: state => state.image,
    snapshot: state => state.snapshot,
    keypair: state => state.keypair,
    network: state => state.network,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchConfig: () => dispatch(fetchConfig()),
    fetchImages: () => dispatch(fetchImages()),
    fetchKeypairs: () => dispatch(fetchKeypairs()),
    fetchNetworks: () => dispatch(fetchNetworks()),
    fetchSnapshots: () => dispatch(fetchSnapshots()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
