import React from 'react';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default function RelatedResource(props) {
  return (
    <div className="related-resources">
      <div className="resource">
        <div className="resource-type">
          <Row>
            <Col span="3"><label>{props.type}</label></Col>
            <Col span="20"><div className="line" /></Col>
            <Col span="1"><a className="add" href="#"><Icon type="plus-circle-o" /></a></Col>
          </Row>
        </div>
        <div className="resource-content">
          <div className="resource-header">
            {props.header}
          </div>
          <div className="resource-body">
            {props.body}
          </div>
        </div>
      </div>
    </div>
  );
}

RelatedResource.propTypes = {
  type: React.PropTypes.string.isRequired,
  header: React.PropTypes.element.isRequired,
  body: React.PropTypes.any.isRequired,
};
