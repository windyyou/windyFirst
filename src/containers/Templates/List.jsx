import React from 'react';
import { Link } from 'react-router';

export default class List extends React.Component {
  render() {
    return (
      <div>
        <h2><Link to="/app/templates/new">new</Link></h2>
      </div>
    );
  }
}
