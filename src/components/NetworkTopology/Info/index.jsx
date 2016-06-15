import React from 'react';

export default class Info extends React.Component {
  renderItems() {
    return null;
  }

  render() {
    const { node } = this.props;
    return (
      <div className="panel panel-default info">
        <div className="panel-heading">基本信息</div>
        <div className="panel-body">
          <table className="table table-hover">
            {this.renderItems(node)}
          </table>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  node: React.PropTypes.shape({
    name: React.PropTypes.string,
  }).isRequired,
};
