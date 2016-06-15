import React from 'react';

export default function Bills(props) {
  return (
    <div>{props.children}</div>
  );
}

Bills.propTypes = {
  children: React.PropTypes.element.isRequired,
};
