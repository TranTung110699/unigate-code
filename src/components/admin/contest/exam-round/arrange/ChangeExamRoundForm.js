import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import contestApiUrls from 'components/admin/contest/endpoints';
import lodashGet from 'lodash.get';

import schema from './arrange-schema-form';
import NodeNew from 'components/admin/node/new';

class ChangeExamRoundForm extends React.Component {
  render() {
    const {
      contestIid,
      selectedUsers,
      forAllMatchingUsers,
      searchValues,
      searchFormId,
      requestSuccessful,
    } = this.props;

    const hiddenFields = {
      user_iids: (selectedUsers || []).map((user) => lodashGet(user, 'iid')),
      for_all_matching_users: forAllMatchingUsers ? 1 : 0,
      contest_iid: contestIid,
      search_values: searchValues,
    };

    return (
      <div className="col-md-12">
        <NodeNew
          hiddenFields={hiddenFields}
          schema={schema}
          ntype="user"
          alternativeApi={contestApiUrls.change_exam_round_for_users}
          mode={'new'}
          step=""
          formid={'arrange-exam-round'}
          searchFormId={searchFormId}
          requestSuccessful={requestSuccessful}
        />
      </div>
    );
  }
}

ChangeExamRoundForm.propTypes = {
  examRounds: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      primaryText: PropTypes.string,
    }),
  ),
};

ChangeExamRoundForm.defaultProps = {
  examRounds: [],
};

export default reduxForm({
  form: 'change_exam_round',
})(ChangeExamRoundForm);
