import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Tabs from 'components/common/tabs';
import SearchUsers from 'components/admin/user/user-in-school/Layout';
import SearchGroups from 'components/admin/group/search';
import SearchResults from './LearnerResults';

class FindLearner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      type: 'user_group',
    };
  }

  onResultChange = ({ items, type }) =>
    this.setState({
      items: items && items.map((item) => ({ ...item, type })),
      type: type,
    });

  render() {
    const { items, type } = this.state;
    const { canUserInviteInAllOrganizations } = this.props;
    return (
      <div>
        <Tabs
          tabs={[
            {
              label: t1('groups'),
              content: (
                <SearchGroups
                  formid="category-user_group"
                  type="user_group"
                  hiddenFields={{
                    _sand_step: 'user_group',
                    type: ['user_group'],
                    requireOrganization: !canUserInviteInAllOrganizations,
                  }}
                  onResultChange={(newItems) =>
                    this.onResultChange({ items: newItems, type: 'user_group' })
                  }
                  renderResultsComponent={() => null}
                />
              ),
            },
            {
              label: t1('users'),
              content: (
                <SearchUsers
                  onResultChange={(newItems) =>
                    this.onResultChange({ items: newItems, type: 'user' })
                  }
                  hiddenFields={{
                    requireOrganization: !canUserInviteInAllOrganizations,
                  }}
                  renderResultsComponent={() => null}
                />
              ),
            },
          ]}
        />
        {Array.isArray(items) && items.length > 0 && (
          <SearchResults
            currentValues={this.props.currentValues || []}
            addToTheListOfTarget={this.props.addToTheListOfTarget}
            form={'enrolment-learner-result'}
            items={items}
            type={type}
          />
        )}
      </div>
    );
  }
}

FindLearner.propTypes = {
  className: PropTypes.string,
  course: PropTypes.shape(),
  group: PropTypes.shape(),
};

FindLearner.defaultProps = {
  className: '',
  course: null,
  group: null,
};

export default FindLearner;
