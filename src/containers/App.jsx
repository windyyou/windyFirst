import React from 'react';
import TopNav from '../containers/TopNav';
import SideNav from '../components/SideNav';

export default function App(props) {
  return (
    <div>
      <TopNav />
      <SideNav location={props.location} />
      <main className="main-content">{props.children}</main>
    </div>
  );
}

App.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }),
  children: React.PropTypes.element.isRequired,
};
