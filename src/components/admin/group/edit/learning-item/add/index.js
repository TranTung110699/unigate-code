import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FormNewInvite from 'components/admin/invite/new/FormNewInvite';
import apiUrls from 'api-endpoints';
import { filterObjectKeys } from 'common/utils/object';
import { inviteTargetTypes } from 'components/admin/invite/configs/constants';

class GroupLearningItemAdd extends React.Component {
  render() {
    const { group } = this.props;
    const title = t1('invite_this_group_to_take_new_learning_paths');
    const formid = 'new_invite';
    const alternativeApi = apiUrls.new_invite;

    const target = Object.assign(
      filterObjectKeys(group, ['id', 'iid', 'name']),
      {
        type: inviteTargetTypes.USER_GROUP,
      },
    );

    return (
      <FormNewInvite
        title={title}
        ntype={'invite'}
        closeModal
        formid={formid}
        hiddenFields={{
          learners: [target],
        }}
        alternativeApi={alternativeApi}
      />
    );
  }
}

GroupLearningItemAdd.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape(),
};

GroupLearningItemAdd.defaultProps = {
  className: '',
  group: null,
};

export default connect()(GroupLearningItemAdd);
