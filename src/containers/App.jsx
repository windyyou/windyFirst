import React from 'react';
import TopNav from '../containers/TopNav';
import SideNav from '../components/SideNav';

export default function App(props) {
  return (
    <div>
      <TopNav />
      <SideNav />
      <main className="main-content">{props.children}</main>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};
