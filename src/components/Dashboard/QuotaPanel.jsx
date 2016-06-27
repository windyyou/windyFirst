import React from 'react';
import Progress from 'antd/lib/progress';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';
import AbstractList from '../../containers/AbstractList';

export default class QuotaPanel extends AbstractList {
  renderQuota(entities) {
    if (entities.length) {
      return (
        <Row>
          {entities.map(({ quotaType, data }, i) => <div key={i}>
            <label>{quotaType}</label>
            <Row className="quota-group">
              {data.map((d, j) => <Col key={j} span="12">
                <div className="quota-progress">
                  <div>
                    {`${d.type}(${d.unit})`}
                    <span className="pull-right">{`${d.used}/${d.total}`}</span>
                  </div>
                  <Progress
                    percent={d.used / d.total * 100}
                    showInfo={false}
                    strokeWidth={12}
                  />
                </div>
              </Col>)}
            </Row>
          </div>)}
        </Row>
      );
    }

    return <span>没有配额</span>;
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
    const quota = this.props.data;
    const quotas = quota.error ? this.renderError(quota.error) : this.renderQuota(quota.entities);

    return (
      <div className="panel panel-default quota-panel">
        <div className="panel-heading">
          <Icon type="book" /> 资源配额
          <Button type="ghost" className="pull-right action-button">申请配额</Button>
        </div>
        <div className="panel-body">
          {quota.isFetching ? this.renderFetching() : quotas}
        </div>
      </div>
    );
  }
}

QuotaPanel.propTypes = {
  data: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
      quotaType: React.PropTypes.string.isRequired,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        type: React.PropTypes.string.isRequired,
        unit: React.PropTypes.string.isRequired,
        used: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
      })
    ),
    })),
  }).isRequired,
  refresh: React.PropTypes.func.isRequired,
};
