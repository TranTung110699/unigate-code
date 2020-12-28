import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import { DefinedUrlParams } from 'routes/links/common';
import nodeSagaActions from 'actions/node/saga-creators';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import UpdateForm from './../new/Form';
import topMenuSchema from '../menu/MainstageTopMenu';

class EditPage extends Component {
  componentDidMount() {
    this.getPageDetail();
  }

  getPageDetail = () => {
    const { dispatch, pageIid } = this.props;

    const requestConfig = {
      url: apiUrls.get_detail(pageIid, 'page'),
      keyState: pageIid,
    };

    const requestParams = {
      iid: pageIid,
    };

    dispatch(nodeSagaActions.getDataRequest(requestConfig, requestParams));
  };

  render() {
    let { page, pageIid } = this.props;
    page = page || {};

    return (
      <div>
        <SubTopMenuContext
          lastBreadcrumbName={`${t1('edit')}: ${page.name}`}
          isSmallSize
        />
        <UpdateForm
          mode="edit"
          title={t1('edit_page')}
          node={page}
          step=""
          formid={`edit_page_${pageIid}`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const pageIid = match && match.params && match.params[DefinedUrlParams.IID];

  return {
    pageIid,
    page: state.dataApiResults[pageIid],
  };
};

export default connect(mapStateToProps)(EditPage);
