import React from 'react';
import { connect } from 'react-redux';
import getLodash from 'lodash.get';
import { timestampToDateString } from 'common/utils/Date';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import Loading from 'components/common/loading';
import NodeNew from 'components/admin/node/new';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import addNewSchema from 'components/admin/req/schema/form';
import { reqTypes } from 'configs/constants';

const postponeFees = ({ user, admin, closeDialog, searchFormId }) => {
  if (!user) {
    return <Loading />;
  }

  const hiddenFields = {
    request_type: reqTypes.POSTPONE_FEE_DEADLINE,
    requester_iid: user.iid,
    processor: {
      iid: admin.iid,
    },
  };

  return (
    <div>
      <Paper style={{ padding: 16 }}>
        <div>{`${t1('full_name')}: ${(user && user.name) || ''}`}</div>
        {user && user.code && <div>{`${t1('code')}: ${user.code}`}</div>}
        {user && user.mai && <div>{`${t1('code')}: ${user.mail}`}</div>}
        {user && user.phone && <div>{`${t1('email')}: ${user.phone}`}</div>}
        {user && user.birthday > 0 && (
          <div>{`${t1('birthday')}: ${timestampToDateString(user.birthday, {
            showTime: false,
            type: 'long_date',
            unixEpoch: true,
          })}`}</div>
        )}
      </Paper>
      <NodeNew
        ntype="req"
        formid="new_req"
        schema={addNewSchema({ hiddenFields })}
        node={hiddenFields}
        hiddenFields={hiddenFields}
        searchFormId={searchFormId}
        alternativeApi={apiUrls.post_new_node('req')}
        requestSuccessful={closeDialog}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: getLodash(state, 'user.info'),
});

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.fetch_node,
    params: {
      ntype: 'user',
      iid: props.userIid,
    },
    propKey: 'user',
    fetchCondition: props.userIid,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(postponeFees),
);
