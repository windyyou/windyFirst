import React from 'react';
import Progress from 'antd/lib/progress';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default class QuotaPanel extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="panel panel-default quota-panel">
        <div className="panel-heading">
          <Icon type="book"/> 资源配额
          <Button type="ghost" className="pull-right action-button">申请配额</Button>
        </div>
        <div className="panel-body">
          <Row>
            {Object.keys(data).map((key, i) => <div key={i}>
              <label>{key}</label>
              <Row className="quota-group">
                {data[key].map((d, j) => <Col key={j} span="12">
                  <div className="quota-progress">
                    <div>
                      {`${d.type}(${d.unit})`}
                      <span className="pull-right">{`${d.used}/${d.total}`}</span>
                    </div>
                    <Progress.Line
                      percent={d.used / d.total * 100}
                      showInfo={false}
                      strokeWidth={12}
                    />
                  </div>
                </Col>)}
              </Row>
            </div>)}
          </Row>
        </div>
      </div>
    );
  }
}
