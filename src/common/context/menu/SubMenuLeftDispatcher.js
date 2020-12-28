import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { isEqualIgnoreFunction } from 'common/utils/object';

import { leftMenuStates } from 'configs/constants';
import layoutContextAction from 'actions/layout-context';

class SubMenuLeftDispatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      dispatch,
      schema,
      messages,
      layoutContext,
      extraInfo,
      isHashbang,
      isSmallMenu,
    } = this.props;

    dispatch(
      layoutContextAction.setSubMenuLeft({
        schema,
        messages,
        extraInfo,
        isHashbang,
        isSmallMenu,
      }),
    );

    // by default, close the main left menu when subMenuLeft is opened
    // if (layoutContext.isOpenLeftMenu) {
    //   dispatch(layoutContextAction.setStateOfLeftMenu(leftMenuStates.CLOSED));
    // }
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      schema,
      messages,
      extraInfo,
      node,
      isHashbang,
      isSmallMenu,
    } = nextProps;

    if (
      !isEqual(this.props.node, node) ||
      !isEqualIgnoreFunction(this.props.schema, schema)
    ) {
      dispatch(
        layoutContextAction.setSubMenuLeft({
          schema,
          messages,
          extraInfo,
          isHashbang,
          isSmallMenu,
        }),
      );
    }
  }

  componentWillUnmount() {
    const { dispatch, isHashbang } = this.props;

    dispatch(
      layoutContextAction.setSubMenuLeft({
        schema: null,
        isHashbang,
      }),
    );
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  layoutContext: state.layoutContext,
});

SubMenuLeftDispatcher.propTypes = {
  dispatch: PropTypes.func,
  schema: PropTypes.arrayOf(PropTypes.any),
  buttons: PropTypes.arrayOf(PropTypes.any),
  messages: PropTypes.arrayOf(PropTypes.any),
  layoutContext: PropTypes.shape(),
  extraInfo: PropTypes.shape(),
};

SubMenuLeftDispatcher.defaultProps = {
  dispatch: (f) => f,
  schema: [],
  buttons: [],
  messages: [],
  layoutContext: {},
  extraInfo: null,
};

export default connect(mapStateToProps)(SubMenuLeftDispatcher);
