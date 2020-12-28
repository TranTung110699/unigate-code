import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Tabs from 'components/common/tabs';
import SearchCourses from 'components/admin/course/search/SearchForm';
import SearchPaths from 'components/admin/path/search/Layout';
import SearchResults from './LearningItemResults';
import apiUrls from 'api-endpoints';

class FindTargetItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  onResultChange = (items) => this.setState({ items });

  render() {
    const { items } = this.state;
    const { canUserInviteInAllOrganizations } = this.props;
    let hiddenFields = this.props.hiddenFields || {};

    return (
      <div>
        <Tabs
          tabs={[
            {
              label: t1('courses'),
              content: (
                <SearchCourses
                  alternativeApi={apiUrls.course_search_for_invite}
                  formid="enrolment-search-course"
                  onResultChange={this.onResultChange}
                  renderResultsComponent={() => null}
                  hiddenFields={{
                    ...hiddenFields,
                    requireOrganization: !canUserInviteInAllOrganizations,
                  }}
                />
              ),
            },
            {
              label: t1('paths'),
              content: (
                <SearchPaths
                  alternativeApi="/path/search"
                  formid="enrolment-search-path"
                  onResultChange={this.onResultChange}
                  renderResultsComponent={() => null}
                  hiddenFields={{
                    ...hiddenFields,
                    requireOrganization: !canUserInviteInAllOrganizations,
                  }}
                />
              ),
            },
          ]}
        />
        {Array.isArray(items) && items.length > 0 && (
          <SearchResults
            currentValues={this.props.currentValues || []}
            addToTheListOfTarget={this.props.addToTheListOfTarget}
            form={'enrolment-learning-items-result'}
            items={items}
          />
        )}
      </div>
    );
  }
}

FindTargetItems.propTypes = {
  className: PropTypes.string,
  course: PropTypes.shape(),
  group: PropTypes.shape(),
};

FindTargetItems.defaultProps = {
  className: '',
  course: null,
  group: null,
};

export default FindTargetItems;
