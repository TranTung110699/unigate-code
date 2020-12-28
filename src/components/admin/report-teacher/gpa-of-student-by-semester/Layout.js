import React from 'react';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from './schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';

const formId = 'gpa-of-student-by-semester';

class Layout extends React.PureComponent {
  renderResultComponent = (items, props, objects, page) => {
    return (
      <Results
        items={items}
        page={page}
        scoreScaleFilter={get(props, 'formValues.score_scale')}
      />
    );
  };

  render() {
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <SearchWrapper
          formid={formId}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          schema={schema}
          showResult
          alternativeApi={apiUrls.get_gpa_of_student_by_semester}
        />
      </div>
    );
  }
}

export default Layout;
