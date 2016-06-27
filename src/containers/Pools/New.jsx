import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Steps from 'antd/lib/steps';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Preview from '../../components/Pools/New/Preview';
import { fetchPoolConfig, createPool } from '../../actions/pool';

const Step = Steps.Step;
const steps = [
  { title: '资源', description: '设置资源配额' },
  { title: '服务', description: '选择启用服务' },
];

function loadData(props) {
  props.fetchPoolConfig();
}

class New extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    pool: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
    fetchPoolConfig: React.PropTypes.func.isRequired,
    createPool: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      spec: {
        name: 'pool1',
        cpus: 0,
        mems: 0,
        volumes: {
          performance: 0,
          capacity: 0,
        },
        fips: {
          CTCCIps: 0,
          CMCCIps: 0,
          CUCCIps: 0,
          BGPIps: 0,
        },
        dbaas: false,
        maas: false,
        vpnaas: false,
        lbaas: false,
        fwaas: false,
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

  handleSpecVolumesPerformanceChange = value => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        volumes: {
          ...this.state.spec.volumes,
          performance: value,
        },
      },
    });
  };

  handleSpecVolumesCapacityChange = value => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        volumes: {
          ...this.state.spec.volumes,
          capacity: value,
        },
      },
    });
  };

  handleSpecCTCCChange = value => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        fips: {
          ...this.state.spec.fips,
          CTCCIps: value,
        },
      },
    });
  };

  handleSpecCMCCChange = value => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        fips: {
          ...this.state.spec.fips,
          CMCCIps: value,
        },
      },
    });
  };

  handleSpecCUCCChange = value => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        fips: {
          ...this.state.spec.fips,
          CUCCIps: value,
        },
      },
    });
  };

  handleSpecBGPChange = value => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        fips: {
          ...this.state.spec.fips,
          BGPIps: value,
        },
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

    this.context.router.push(`/app/pools/new/step-${step}`);
  };

  handlePreviousClick = e => {
    e.preventDefault();

    let step = this.state.current - 1;
    if (step < 1) step = 1;

    this.setState({
      current: step,
    });

    this.context.router.push(`/app/pools/new/step-${step}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    const newSpec = { ...this.state.spec, mems: this.state.spec.mems * 1024 };

    this.props.createPool(newSpec);
    this.context.router.push('/app/pools');
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
                handleSpecVolumesCapacityChange: this.handleSpecVolumesCapacityChange,
                handleSpecVolumesPerformanceChange: this.handleSpecVolumesPerformanceChange,
                handleSpecCTCCChange: this.handleSpecCTCCChange,
                handleSpecCMCCChange: this.handleSpecCMCCChange,
                handleSpecCUCCChange: this.handleSpecCUCCChange,
                handleSpecBGPChange: this.handleSpecBGPChange,
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
    pool: state => state.pool,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPoolConfig: () => dispatch(fetchPoolConfig()),
    createPool: params => dispatch(createPool(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
