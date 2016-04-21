import React from 'react';

export default function BareMetals(props) {
  return (
    <div>{props.children}</div>
  );
}

BareMetals.propTypes = {
  children: React.PropTypes.element.isRequired,
};
