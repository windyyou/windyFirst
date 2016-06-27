import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Steps from 'antd/lib/steps';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { createAlarm, fetchAlarmConfig, selectAlarmResourceType } from '../../actions/alarm';
import { fetchInstances } from '../../actions/instance';
import { fetchBareMetals } from '../../actions/bareMetal';
import { fetchServices } from '../../actions/service';
import { fetchNotificationLists } from '../../actions/notificationList';

const functionMap = {
  instance: fetchInstances(),
  bareMetal: fetchBareMetals(),
  service: fetchServices(),
};
const Step = Steps.Step;
const steps = [
  { title: '对象', description: '选择监控对象' },
  { title: '规则', description: '选择报警规则' },
  { title: '通知', description: '设置通知列表' },
];

function loadData(props) {
  props.fetchAlarmConfig();
  props.fetchNotificationLists();
}

class New extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    children: React.PropTypes.object.isRequired,
    alarm: React.PropTypes.object.isRequired,
    resources: React.PropTypes.object.isRequired,
    notificationList: React.PropTypes.object.isRequired,
    createAlarm: React.PropTypes.func.isRequired,
    selectAlarmResourceType: React.PropTypes.func.isRequired,
    fetchResources: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      spec: {
        name: '',
        description: '',
        type: '',
        resources: [],
        rules: [],
        isSend: 'N',
        notifications: [],
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

  handleObjectChange = targetKeys => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        resources: targetKeys,
      },
    });
  };

  handleObjectTypeChange = type => {
    this.props.selectAlarmResourceType(type);
    this.props.fetchResources(type);

    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        resources: [],
        rules: [],
        type,

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

    this.context.router.push(`/app/alarms/new/step-${step}`);
  };

  handlePreviousClick = e => {
    e.preventDefault();

    let step = this.state.current - 1;
    if (step < 1) step = 1;

    this.setState({
      current: step,
    });

    this.context.router.push(`/app/alarms/new/step-${step}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createAlarm(this.state.spec);
    this.context.router.push('/app/alarms');
  };

  render() {
    return (
      <div className="new-alarm">
        <div className="steps">
          <Steps current={this.state.current - 1}>
            {steps.map((step, i) =>
              <Step title={step.title} description={step.description} key={i} />
            )}
          </Steps>
        </div>
        <Row type="flex" justify="center">
          <Col span="20">
            {React.cloneElement(this.props.children,
              {
                current: this.state.current,
                total: steps.length,
                spec: this.state.spec,
                handleNextClick: this.handleNextClick,
                handlePreviousClick: this.handlePreviousClick,
                handleSubmit: this.handleSubmit,
                handleSpecChange: this.handleSpecChange,
                handleObjectTypeChange: this.handleObjectTypeChange,
                handleObjectChange: this.handleObjectChange,
                alarm: this.props.alarm,
                resources: this.props.resources,
                notificationList: this.props.notificationList,
              })}
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    alarm: state => state.alarm,
    notificationList: state => state.notificationList,
    resources: state => state[state.alarm.resourceType] || {},
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAlarmConfig: () => dispatch(fetchAlarmConfig()),
    fetchResources: type => dispatch(functionMap[type]),
    fetchNotificationLists: () => dispatch(fetchNotificationLists()),
    selectAlarmResourceType: type => dispatch(selectAlarmResourceType(type)),
    createAlarm: params => dispatch(createAlarm(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
