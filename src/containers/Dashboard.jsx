import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import AggregationInfoPanel from '../components/Dashboard/AggregationInfoPanel';
import OperationsPanel from '../components/Dashboard/OperationsPanel';
import BillingTrendsPanel from '../components/Dashboard/BillingTrendsPanel';
import QuotaPanel from '../components/Dashboard/QuotaPanel';

import { fetchOperations } from '../actions/operation';
import { fetchQuotas } from '../actions/quota';
import { fetchBillings } from '../actions/billing';

import aggregationData from '../api/mock/aggregation.json';

const propTypes = {
  operation: React.PropTypes.object.isRequired,
  fetchOperations: React.PropTypes.func.isRequired,
  quota: React.PropTypes.object.isRequired,
  fetchQuotas: React.PropTypes.func.isRequired,
  billing: React.PropTypes.object.isRequired,
  fetchBillings: React.PropTypes.func.isRequired,
};

function loadData(props) {
  props.fetchOperations();
  props.fetchQuotas();
  props.fetchBillings();
}

class Dashboard extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div>
        <Row type="flex">
          {aggregationData.map((data, i) =>
            <Col span="6" key={i}>
              <AggregationInfoPanel
                type={data.type}
                iconType={data.iconType}
                title={data.title}
                value={data.value}
              />
            </Col>
          )}
        </Row>
        <Row type="flex">
          <Col span="16">
            <BillingTrendsPanel data={this.props.billing} />
            <QuotaPanel data={this.props.quota} />
          </Col>
          <Col span="8">
            <OperationsPanel operation={this.props.operation} />
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

function mapStateToProps(state) {
  return createStructuredSelector({
    operation: state => state.operation,
    quota: state => state.quota,
    billing: state => state.billing,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOperations: () => dispatch(fetchOperations({ _limit: 5 })),
    fetchQuotas: () => dispatch(fetchQuotas()),
    fetchBillings: () => dispatch(fetchBillings()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
