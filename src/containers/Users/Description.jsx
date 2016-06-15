import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Users/BasicInfo';
import { fetchUser } from '../../actions/user';

const Panel = Collapse.Panel;
const propTypes = {
  user: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        account: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        phone: React.PropTypes.string.isRequired,
        company: React.PropTypes.string.isRequired,
        enabled: React.PropTypes.bool.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchUser: React.PropTypes.func.isRequired,
};

function loadData(props) {
  props.fetchUser(props.params.key);
}

class Description extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  renderBasicInfo() {
    return (
      <BasicInfo {...this.props} />
    );
  }

  render() {
    const basicInfo = this.renderBasicInfo();

    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header="基本属性" key="1">
          {basicInfo}
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    user: state => state.user,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (key) => dispatch(fetchUser(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
