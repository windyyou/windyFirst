import React from 'react';
import Button from 'antd/lib/button';
import classNames from 'classnames';

export default class FormButtonArea extends React.Component {
  render() {
    const { current, total, handleSubmit, handlePreviousClick } = this.props;
    const nextLabel = current == total ? '创建' : '下一步';

    return (
      <div className="button-area">
        <Button
          onClick={handlePreviousClick}
          className={classNames({ hide: current == 1 })}
        >上一步</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="pull-right"
        >{nextLabel}</Button>
      </div>
    );
  }
}
