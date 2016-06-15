import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Routers/BasicInfo';
import { fetchRouter, updateRouter } from '../../actions/router';

const Panel = Collapse.Panel;

function loadData(props) {
  props.fetchRouter(props.params.key);
}

class Description extends React.Component {
  static propTypes = {
    router: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          publicGateway: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          floatingIp: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
    fetchRouter: React.PropTypes.func.isRequired,
    updateRouter: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header="基本属性" key="1">
          <BasicInfo {...this.props} />
        </Panel>
      </Collapse>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    router: state => state.router,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRouter: (key) => dispatch(fetchRouter(key)),
    updateRouter: params => dispatch(updateRouter(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
