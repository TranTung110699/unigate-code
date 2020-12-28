import React from 'react';
import isEqual from 'lodash.isequal';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import layoutContextAction from 'actions/layout-context';
import get from 'lodash.get';

class SubMenuTopContext extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      schema,
      buttons,
      button,
      lastBreadcrumbName,
      node,
      description,
      isSmallSize,
      isHidden,
      className,
    } = this.props;

    dispatch(
      layoutContextAction.setSubMenuTop({
        schema,
        buttons,
        button,
        lastBreadcrumbName,
        node,
        description,
        isSmallSize,
        isHidden,
        className,
      }),
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      schema,
      buttons,
      button,
      lastBreadcrumbName,
      node,
      type,
      action,
      description,
      isSmallSize,
      isHidden,
      className,
    } = nextProps;

    if (
      !isEqual(this.props.node, node) ||
      this.props.type !== type ||
      this.props.action !== action ||
      this.props.lastBreadcrumbName !== lastBreadcrumbName ||
      get(this.props, 'schema.length') !== get(schema, 'length')
    ) {
      dispatch(
        layoutContextAction.setSubMenuTop({
          schema,
          buttons,
          button,
          lastBreadcrumbName,
          node,
          description,
          isSmallSize,
          isHidden,
          className,
        }),
      );
    }
  }

  componentWillUnmount() {
    this.props.dispatch(
      layoutContextAction.setSubMenuTop({
        schema: null,
        buttons: null,
        button: null,
        lastBreadcrumbName: null,
        node: null,
      }),
    );
  }

  render() {
    return null;
  }
}

SubMenuTopContext.propTypes = {
  dispatch: PropTypes.func,
  schema: PropTypes.arrayOf(PropTypes.any),
  lastBreadcrumbName: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.any),
  button: PropTypes.node,
  messages: PropTypes.arrayOf(PropTypes.any),
  action: PropTypes.string,
  type: PropTypes.string,
};

SubMenuTopContext.defaultProps = {
  dispatch: (f) => f,
  schema: [],
  lastBreadcrumbName: '',
  buttons: [],
  button: null,
  messages: [],
  action: '',
  type: '',
};

export default connect()(SubMenuTopContext);
