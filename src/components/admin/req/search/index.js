import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import apiUrls from 'api-endpoints';
import { getThemeConfig } from 'utils/selectors';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import RaisedButton from 'components/common/mui/RaisedButton';
import getLodash from 'lodash.get';
import Results from './Results';
import schema from './search-form-schema';
import Perm from 'common/utils/Perm';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

class Search extends React.PureComponent {
  renderResultComponent = (items, props) => (
    <Results
      items={items}
      searchFormId={props.formid}
      hiddenFields={props.hiddenFields}
      renderActionCell={this.props.renderActionCell}
    />
  );

  render() {
    const userIid = getLodash(this.props, 'user.iid');
    const { hiddenFields, renderActionCell, node, ...props } = this.props;

    const hiddenFieldsToRender = Object.assign({}, node, hiddenFields);

    return (
      <React.Fragment>
        <SubTopMenuContext
          lastBreadcrumbName={t1('processing_requests')}
          description={t1('processing_requests_description')}
        />
        <SearchWrapper
          {...props}
          node={hiddenFieldsToRender}
          showResult
          ntype="req"
          method="post"
          schema={schema({
            hiddenFields: hiddenFieldsToRender,
            themeConfig: this.props.themeConfig,
            searchOrganization: Perm.hasPerm('root'),
          })}
          formid={this.props.formid || 'search-request'}
          hiddenFields={
            hiddenFields || (userIid ? { requester_iid: userIid } : {})
          }
          alternativeApi={apiUrls.processing_req_search}
          renderResultsComponent={this.renderResultComponent}
          submitButton={
            <RaisedButton
              primary
              type="submit"
              label={t1('search')}
              className="m-l-10 m-r-10"
            />
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (themeConfig) => ({
    themeConfig,
  }),
);

export default connect(mapStateToProps)(Search);
