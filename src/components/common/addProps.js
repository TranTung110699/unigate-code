import React from 'react';
/**
 * add some props to component
 *
 * @param fromOldToNewProps
 * a function to get new props from current prop
 *
 */
const addProps = (fromOldToNewProps) => (Component) => {
  class Wrapped extends React.Component {
    render() {
      const newProps =
        typeof fromOldToNewProps === 'function'
          ? fromOldToNewProps(this.props)
          : undefined;

      return <Component {...this.props} {...(newProps ? newProps : {})} />;
    }
  }

  Wrapped.propTypes = {};

  Wrapped.defaultProps = {};

  return Wrapped;
};

export default addProps;
