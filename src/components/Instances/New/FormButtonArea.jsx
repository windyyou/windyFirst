import React from 'react';
import Button from 'antd/lib/button';
import classNames from 'classnames';

export default function FormButtonArea(props) {
  const nextLabel = props.current === props.total ? '创建' : '下一步';
  return (
    <div className="button-area">
      <Button
        onClick={props.handlePreviousClick}
        className={classNames({ hide: props.current === 1 })}
      >上一步</Button>
      <Button
        type="primary"
        onClick={props.handleSubmit}
        className="pull-right"
      >{nextLabel}</Button>
    </div>
  );
}

FormButtonArea.propTypes = {
  current: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handlePreviousClick: React.PropTypes.func.isRequired,
};
