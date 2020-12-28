import React from 'react';
import PropTypes from 'prop-types';
import { extractObject } from 'common/utils/Array';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from 'components/admin/user/account/account-search/schema/schema-new';
import groupApiUrls from 'components/admin/group/endpoints';

import Results from './../search-results/Results';
import { expandFields } from '../configs';

const searchFormId = (action) => `group_member_search_${action}`;

/**
 * This form id that table will use to keep all the selected rows
 * in this redux form, in a key called 'targets'
 * so basically in store you'll see
 *
 * form.${targetsFormId()}.values.targets = list of users (which have been extracted by keysSave array)
 *
 * @param action
 * @returns {string}
 */
const targetsFormId = (action) => `targets_${action}`;

class GroupMemberSearchLayout extends React.Component {
  renderResultComponent = (items, props, objects, searchValues) => {
    const { group, action } = this.props;
    return (
      <Results
        group={group}
        items={items}
        formid={searchFormId(action)}
        searchFormId={searchFormId(action)}
        form={targetsFormId(action)}
        searchValues={searchValues}
        {...props}
      />
    );
  };

  render() {
    const { group, action } = this.props;
    const hiddenFields = extractObject(group, [
      'major',
      'ico',
      'training_mode',
      'training_level',
      'type',
      'semester',
    ]);

    const api = groupApiUrls.search_group_members;
    /* themeConfig.type === schoolTypes.SIS ? '/user/search' : */

    let rtMode;
    switch (action) {
      case 'members':
        rtMode = 'current';
        break;
      case 'pending_members':
        rtMode = 'pending';
        break;
      case 'redudant_members':
        rtMode = 'redundant';
        break;
      default:
        break;
    }

    return (
      <div>
        {group && group.iid ? (
          <div>
            {action === 'members' && (
              <SearchWrapper
                resetForm
                {...this.props}
                schema={schema}
                formid={searchFormId(action)}
                action={action}
                hiddenFields={{
                  ...hiddenFields,
                  category_iid: group.iid,
                  group_type: group.type,
                  rt_mode: rtMode,
                  _sand_step: 'list_members',
                  _sand_expand: expandFields,
                }}
                method="post"
                renderResultsComponent={this.renderResultComponent}
                alternativeApi={api}
                showSearchButton={false}
              />
            )}
            {action === 'pending_members' && (
              <SearchWrapper
                resetForm
                {...this.props}
                schema={schema}
                formid={searchFormId(action)}
                action={action}
                hiddenFields={{
                  ...hiddenFields,
                  category_iid: group.iid,
                  rt_mode: rtMode,
                  _sand_step: 'list_members',
                  _sand_expand: expandFields,
                }}
                method="post"
                renderResultsComponent={this.renderResultComponent}
                alternativeApi={api}
                showSearchButton={false}
              />
            )}
            {action === 'redundant_members' && (
              <SearchWrapper
                resetForm
                {...this.props}
                schema={schema}
                formid={searchFormId(action)}
                action={action}
                hiddenFields={{
                  ...hiddenFields,
                  category_iid: group.iid,
                  rt_mode: rtMode,
                  _sand_step: 'list_members',
                  _sand_expand: expandFields,
                }}
                renderResultsComponent={this.renderResultComponent}
                alternativeApi={api}
                showSearchButton={false}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

GroupMemberSearchLayout.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  group: PropTypes.shape(),
};

GroupMemberSearchLayout.defaultProps = {
  className: '',
  dispatch: () => {},
  group: null,
};

export default GroupMemberSearchLayout;
