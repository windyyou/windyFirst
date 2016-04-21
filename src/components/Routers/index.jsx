import React from 'react';

export default function Routers(props) {
  return (
    <div>{props.children}</div>
  );
}

Routers.propTypes = {
  children: React.PropTypes.element.isRequired,
};
