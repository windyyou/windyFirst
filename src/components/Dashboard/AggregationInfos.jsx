import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import AggregationInfoPanel from './AggregationInfoPanel.jsx';

import aggregationConfig from '../../api/mock/aggregation.json';

export default class AggregationInfos extends React.Component {
  renderShow(entities) {
    const aggregations = entities.map((entry, i) => ({
      ...aggregationConfig[i],
      ...entry,
    }));
    return (
      <Row type="flex">
        {aggregations.map((data, i) =>
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
    );
  }

  renderFetching() {
    return (
      <Row type="flex">
        {aggregationConfig.map((data, i) =>
          <Col span="6" key={i}>
            <AggregationInfoPanel
              type={data.type}
              iconType={data.iconType}
              title={data.title}
              value="..."
            />
          </Col>
        )}
      </Row>
    );
  }

  renderError(error) {
    return (
      <Row type="flex">
        <span>{error.message}</span>
      </Row>
    );
  }

  render() {
    const aggregation = this.props.aggregation;
    const show = aggregation.error ?
      this.renderError(aggregation.error) : this.renderShow(aggregation.entities);
    return (
      <div>
        {aggregation.isFetching ? this.renderFetching() : show}
      </div>
    );
  }
}

AggregationInfos.propTypes = {
  aggregation: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.number.isRequired,
    })),
  }).isRequired,
};
