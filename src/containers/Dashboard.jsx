import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import AggregationInfos from '../components/Dashboard/AggregationInfos';
import OperationsPanel from '../components/Dashboard/OperationsPanel';
import BillingTrendsPanel from '../components/Dashboard/BillingTrendsPanel';
import QuotaPanel from '../components/Dashboard/QuotaPanel';

import { fetchOperations } from '../actions/operation';
import { fetchQuotas } from '../actions/quota';
import { fetchBillings } from '../actions/billing';
import { fetchAggregations } from '../actions/aggregation';

const propTypes = {
  operation: React.PropTypes.object.isRequired,
  fetchOperations: React.PropTypes.func.isRequired,
  quota: React.PropTypes.object.isRequired,
  fetchQuotas: React.PropTypes.func.isRequired,
  billing: React.PropTypes.object.isRequired,
  fetchBillings: React.PropTypes.func.isRequired,
  aggregation: React.PropTypes.object.isRequired,
  fetchAggregations: React.PropTypes.func.isRequired,
  refreshAggregations: React.PropTypes.func.isRequired,
  refreshQuotas: React.PropTypes.func.isRequired,
  refreshOperations: React.PropTypes.func.isRequired,
};

function loadData(props) {
  props.fetchOperations();
  props.fetchQuotas();
  props.fetchBillings();
  props.fetchAggregations();
}

class Dashboard extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div>
        <AggregationInfos
          aggregation={this.props.aggregation}
          refresh={this.props.refreshAggregations}
        />
        <Row type="flex">
          <Col span="16">
            <BillingTrendsPanel data={this.props.billing} />
            <QuotaPanel data={this.props.quota} refresh={this.props.refreshQuotas} />
          </Col>
          <Col span="8">
            <OperationsPanel
              operation={this.props.operation}
              refresh={this.props.refreshOperations}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    operation: state => state.operation,
    quota: state => state.quota,
    billing: state => state.billing,
    aggregation: state => state.aggregation,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOperations: () => dispatch(fetchOperations({ limit: 5 })),
    fetchQuotas: () => dispatch(fetchQuotas()),
    fetchBillings: () => dispatch(fetchBillings()),
    fetchAggregations: () => dispatch(fetchAggregations()),
    refreshOperations: () => dispatch(fetchOperations({ limit: 5 }, true)),
    refreshQuotas: () => dispatch(fetchQuotas(undefined, true)),
    refreshAggregations: () => dispatch(fetchAggregations(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
