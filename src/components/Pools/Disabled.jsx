import React from 'react';
import Button from 'antd/lib/button';

export default class disabled extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  handleCreateClick = event => {
    event.preventDefault();
    this.context.router.push('/app/pools/new/step-1');
  };

  render() {
    return (
      <div className="disabled-detail">
        <b className="text">资源池允许您独占一定数量的资源和服务，</b>
        <br />
        <b className="text">并进行任意分配，您尚未开启此功能......</b>
        <br />
        <div>
          <Button
            className="center"
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >立即开启</Button>
        </div>
      </div>
    );
  }
}
