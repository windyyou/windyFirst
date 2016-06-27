import React from 'react';
import { REFRESH_INTERVAL } from '../constants/config';

export default class AbstractList extends React.Component {
  static propTypes = {
    refresh: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadData(this.props);

    // start auto refresh
    if (REFRESH_INTERVAL) {
      this.refresher = setInterval(this.props.refresh, REFRESH_INTERVAL);
    }
  }

  componentWillUnmount() {
    // stop auto refresh
    clearInterval(this.refresher);
  }

  loadData() {}
}
