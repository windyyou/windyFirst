import React from 'react';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Alarms/BasicInfo';
import Notices from '../../components/Alarms/Notifications';
import Resource from '../../components/Alarms/Resources.jsx';
import Rule from '../../components/Alarms/Rules.jsx';
import { fetchAlarm, updateAlarm, deleteAlarm, fetchAlarmConfig,
  addAlarmResource, addAlarmRule, addAlarmNotification,
  deleteAlarmNotification, deleteAlarmResource, deleteAlarmRule }
  from '../../actions/alarm';
import { fetchNotificationLists } from '../../actions/notificationList';
import { fetchInstances } from '../../actions/instance';
import { fetchBareMetals } from '../../actions/bareMetal';
import { fetchServices } from '../../actions/service';

const Panel = Collapse.Panel;

function loadData(props) {
  props.fetchAlarm(props.params.key);
  props.fetchNotificationLists();
  props.fetchAlarmConfig();
  props.fetchInstances();
  props.fetchBareMetals();
  props.fetchServices();
}

class Description extends React.Component {
  static propTypes = {
    fetchAlarm: React.PropTypes.func.isRequired,
    alarm: React.PropTypes.object.isRequired,
    instance: React.PropTypes.object.isRequired,
    bareMetal: React.PropTypes.object.isRequired,
    service: React.PropTypes.object.isRequired,
    notificationList: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    loadData(this.props);
  }

  renderBasicInfo() {
    return (
      <BasicInfo {...this.props} />
    );
  }

  renderResource() {
    return (
      <Resource {...this.props} />
    );
  }

  renderRule() {
    return (
      <Rule {...this.props} />
    );
  }

  renderNotices() {
    return (
      <Notices {...this.props} />
    );
  }

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
    const basicInfo = this.renderBasicInfo();
    const resource = this.renderResource();
    const rule = this.renderRule();
    const notice = this.renderNotices();

    return (
      <Collapse defaultActiveKey={['1', '2', '3', '4']}>
        <Panel header="基本属性" key="1">
          {basicInfo}
        </Panel>
        <Panel header="监控对象" key="2">
          {resource}
        </Panel>
        <Panel header="报警规则" key="3">
          {rule}
        </Panel>
        <Panel header="通知列表" key="4">
          {notice}
        </Panel>
      </Collapse>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    alarm: state => state.alarm,
    notificationList: state => state.notificationList,
    instance: state => state.instance,
    bareMetal: state => state.bareMetal,
    service: state => state.service,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAlarm: (key) => dispatch(fetchAlarm(key)),
    updateAlarm: (params) => dispatch(updateAlarm(params)),
    deleteAlarm: (params) => dispatch(deleteAlarm(params)),
    fetchNotificationLists: () => dispatch(fetchNotificationLists()),
    fetchAlarmConfig: () => dispatch(fetchAlarmConfig()),
    addAlarmRule: (params) => dispatch(addAlarmRule(params)),
    addAlarmResource: (params) => dispatch(addAlarmResource(params)),
    addAlarmNotification: (params) => dispatch(addAlarmNotification(params)),
    fetchBareMetals: () => dispatch(fetchBareMetals()),
    fetchInstances: () => dispatch(fetchInstances()),
    fetchServices: () => dispatch(fetchServices()),
    deleteAlarmRule: (params) => dispatch(deleteAlarmRule(params)),
    deleteAlarmNotification: (params) => dispatch(deleteAlarmNotification(params)),
    deleteAlarmResource: (params) => dispatch(deleteAlarmResource(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
