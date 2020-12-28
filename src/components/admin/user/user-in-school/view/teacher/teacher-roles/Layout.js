import React from 'react';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from 'components/admin/abstract-role/search/schema';
import Results from './Results';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';

class TeacherRolesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...this.props} {...props} />;
  }

  render() {
    const { node } = this.props;

    let hiddenFields = {
      user_iid: node.iid,
    };

    const formId = `teacher-roles-${node.iid}`;

    return (
      <div>
        {/*<h1>{t1('teacher_roles')}</h1>*/}
        <SearchWrapper
          formid={formId}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton
          schema={schema}
          hiddenFields={hiddenFields}
          alternativeApi={aApiUrls.manage_teacher_roles}
        />
      </div>
    );
  }
}

export default TeacherRolesSearch;
