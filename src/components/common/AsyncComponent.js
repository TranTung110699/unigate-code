import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      if (this.refs.asycComponent) {
        this.setState({
          component,
        });
      }
    }

    render() {
      const C = this.state.component;

      return <div ref="asycComponent">{C ? <C {...this.props} /> : null}</div>;
    }
  }

  return AsyncComponent;
}
