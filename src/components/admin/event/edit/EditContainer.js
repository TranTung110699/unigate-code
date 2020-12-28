import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import { blogTypes } from 'configs/constants';

import Loading from 'components/common/loading';
import PageLayout from 'components/admin/cms/page/search/Layout';
import UpdateForm from 'components/admin/event/new/Form';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import pageTopMenuSchema from 'components/admin/cms/page/menu/MainstageTopMenu';

import { menuItems } from './sub-left-menu-configs';
import eventTopMenuSchema from '../menu/MainstageTopMenu';

import { getSearch } from 'common/selectors/router';

class EventEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    switch (action) {
      case 'information':
        return eventTopMenuSchema();
      case 'blogs':
        return pageTopMenuSchema();
      default:
        return null;
    }
  }

  getContentByAction(props) {
    const { action, node, ...options } = props;

    if (!node || !node.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'information': {
        contentDisplay = (
          <UpdateForm
            mode="edit"
            title={t1('edit_event')}
            node={node}
            searchFormId="event_search"
            formid="event_edit"
          />
        );
        break;
      }
      case 'blogs': {
        contentDisplay = (
          <PageLayout
            node={node}
            {...options}
            hiddenFields={{
              event_iid: node && node.iid,
              blog_type: blogTypes.EVENT,
            }}
          />
        );
        break;
      }
      default: {
        contentDisplay = (
          <UpdateForm
            mode="edit"
            title={t1('edit_event')}
            node={node}
            searchFormId="event_search"
            formid="event_edit"
          />
        );
      }
    }

    return contentDisplay;
  }

  render() {
    const { node, action } = this.props;

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      <SubTopMenuContext
        lastBreadcrumbName={node.name}
        action={action}
        schema={this.getTopMenuSchemaByAction(this.props)}
      />,
      this.getContentByAction(this.props),
    ];
  }
}

EventEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

EventEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

function mapStateToProps(state) {
  const queryString = require('query-string');
  const queryStringParrams = queryString.parse(getSearch(state));

  return {
    ...queryStringParrams,
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(withRouter(EventEditContainer)),
);
