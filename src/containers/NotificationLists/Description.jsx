import React from 'react';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/NotificationLists/BasicInfo';
import TerminalList from '../../components/NotificationLists/TerminalList';
import { fetchNotificationList, updateNotificationList, deleteNotificationListTerminal,
          createNotificationListTerminal } from '../../actions/notificationList';

const Panel = Collapse.Panel;

function loadData(props) {
  props.fetchNotificationList(props.params.key);
}

class Description extends React.Component {
  static propTypes = {
    notificationList: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
      }).isRequired,
    }),
    fetchNotificationList: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    loadData(this.props);
  }

  renderBasicInfo() {
    return (
      <BasicInfo {...this.props} />
    );
  }

  renderTerminalList() {
    return (
      <TerminalList {...this.props} />
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
    const current = this.props.notificationList.current;
    const basicInfo = current.error ?
      this.renderError(current.error) :
      this.renderBasicInfo();

    const terminalList = current.error ?
      this.renderError(current.error) :
      this.renderTerminalList();

    return (
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="基本属性" key="1">
          {current.isFetching ? this.renderFetching() : basicInfo}
        </Panel>
        <Panel header="终端列表" key="2">
          {current.isFetching ? this.renderFetching() : terminalList}
        </Panel>
      </Collapse>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    notificationList: state => state.notificationList,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotificationList: (key) => dispatch(fetchNotificationList(key)),
    updateNotificationList: (params) => dispatch(updateNotificationList(params)),
    deleteNotificationListTerminal: (params) => dispatch(deleteNotificationListTerminal(params)),
    createNotificationListTerminal: (params) => dispatch(createNotificationListTerminal(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
