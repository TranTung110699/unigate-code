import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import { userOrgIids } from 'common/selectors';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from './schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';

const formId = 'list-of-student-failed_subject';

class Layout extends Component {
  renderResultComponent = (items, props, objects, page) => (
    <Results
      items={items}
      page={page}
      allowRetaking={get(props, 'formValues.allow_retaking')}
    />
  );

  render() {
    const { orgIids } = this.props;
    if (!orgIids) {
      return <Loading />;
    }

    const hiddenFields = {
      orgIids,
    };

    const title = t2('list_of_student_failed_subject');
    const url = apiUrls.get_list_of_student_failed_subject;

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={title}>
          <SearchWrapper
            formid={formId}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            alternativeApi={url}
            hiddenFields={hiddenFields}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
  orgIids: userOrgIids(state),
});

export default connect(mapStateToProps)(Layout);
