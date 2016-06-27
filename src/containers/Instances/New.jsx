import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Steps from 'antd/lib/steps';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import Preview from '../../components/Instances/New/Preview';
import { fetchImages } from '../../actions/image';
import { fetchKeypairs } from '../../actions/keypair';
import { fetchNetworks } from '../../actions/network';
import { fetchSubnets } from '../../actions/subnet';
import { fetchSnapshots } from '../../actions/snapshot';
import { createInstance, fetchInstanceConfig } from '../../actions/instance';
import { dict } from '../../utils/data';

const Step = Steps.Step;
const steps = [
  { title: '镜像', description: '选择一个系统镜像或主机快照' },
  { title: '配置', description: '选择主机的CPU，内存，网络配置' },
  { title: '登录信息', description: '设置主机的系统登录信息' },
];

function loadData(props) {
  props.fetchInstanceConfig();
  props.fetchImages();
  props.fetchKeypairs();
  props.fetchNetworks();
  props.fetchSnapshots();
  props.fetchSubnets();
}

class New extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    children: React.PropTypes.object.isRequired,
    image: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    snapshot: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    network: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          subnets: React.PropTypes.array.isRequired,
        })),
      }),
    }),
    subnet: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          id: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    keypair: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    instance: React.PropTypes.object.isRequired,
    createInstance: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      spec: {
        name: '',
        sourceType: 'image',
        source: '',
        core: 1,
        ram: 1,
        volumeType: '',
        volumeSize: 0,
        networkType: 'basic',
        subnet: '',
        username: 'root',
        credentialType: 'password',
        password: '',
        keypair: '',
        quantity: 1,
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

  handleNextClick = e => {
    e.preventDefault();
    let step = this.state.current + 1;
    if (step > steps.length) step = steps.length;

    this.setState({
      current: step,
    });

    this.context.router.push(`/app/instances/new/step-${step}`);
  };

  handlePreviousClick = e => {
    e.preventDefault();

    let step = this.state.current - 1;
    if (step < 1) step = 1;

    this.setState({
      current: step,
    });

    this.context.router.push(`/app/instances/new/step-${step}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    const source = this.state.spec.sourceType === 'image' ? this.props.image : this.props.snapshot;
    const sourceName = dict(this.state.spec.source, source.list.data, 'id', 'name');
    const sourceId = this.state.spec.source;
    const keypairId = this.state.spec.keypair;
    const keypairName = dict(this.state.spec.keypair, this.props.keypair.list.data, 'id', 'name');

    const newSpec = { ...this.state.spec, sourceName, sourceId, keypairId, keypairName };
    delete newSpec.source;
    delete newSpec.keypair;
    this.props.createInstance(newSpec);
    this.context.router.push('/app/instances');
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
                instance: this.props.instance,
                image: this.props.image,
                keypair: this.props.keypair,
                network: this.props.network,
                snapshot: this.props.snapshot,
              })}
          </Col>
          <Col span="8" offset="2">
            <Preview {...this.props} spec={this.state.spec} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    instance: state => state.instance,
    image: state => state.image,
    snapshot: state => state.snapshot,
    keypair: state => state.keypair,
    network: state => state.network,
    subnet: state => state.subnet,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInstanceConfig: () => dispatch(fetchInstanceConfig()),
    fetchImages: () => dispatch(fetchImages()),
    fetchKeypairs: () => dispatch(fetchKeypairs()),
    fetchNetworks: () => dispatch(fetchNetworks()),
    fetchSnapshots: () => dispatch(fetchSnapshots()),
    fetchSubnets: () => dispatch(fetchSubnets()),
    createInstance: params => dispatch(createInstance(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
