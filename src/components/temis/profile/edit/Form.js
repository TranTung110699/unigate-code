import React from 'react';
import NodeNew from 'components/admin/node/new';
import getSchema from './schema';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import { createSelector } from 'reselect';
import { getOrgTypes } from 'configs/constants';
import { confSelector } from 'common/selectors';
import { getOrganizationSubTypesToDisplayInTemisProfileFormGivenConf } from 'common/conf';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';

const TemisProfileForm = ({
  user,
  orgTypes,
  markAsHaveEnterTemisProfileInfoWhenSubmit,
  onSuccess,
}) => {
  const schema = React.useMemo(
    () =>
      getSchema({
        title: 'THÔNG TIN HỒ SƠ CÁ NHÂN CỦA GIÁO VIÊN/CBQLCSGD',
      }),
    [],
  );

  const hiddenFields = React.useMemo(
    () => ({
      ...(markAsHaveEnterTemisProfileInfoWhenSubmit
        ? {
            have_enter_temis_profile_info: 1,
          }
        : {}),
    }),
    [markAsHaveEnterTemisProfileInfoWhenSubmit],
  );

  if (!user) return <Loading />;

  return (
    <NodeNew
      ntype={'temis'}
      node={user}
      requestSuccessful={onSuccess}
      mode="edit"
      step="temis"
      schema={schema}
      hiddenFields={hiddenFields}
      formId={'new_temis'}
      alternativeApi={'/temis/profile/update'}
      allOrgTypes={orgTypes}
      submitButton={
        <RaisedButton
          primary
          label={t1('save')}
          type="submit"
          className="save-submit-button"
          raisedButton
        />
      }
      closeModal={false}
    />
  );
};

const mapStateToProps = createSelector(
  (state) => getOrgTypes(state, '*'),
  confSelector,
  (allOrgTypes, conf) => {
    const organizationSubTypesToDisplayInTemisProfileForm = getOrganizationSubTypesToDisplayInTemisProfileFormGivenConf(
      conf,
    );

    const orgTypes = (allOrgTypes || []).filter((ot) => {
      return organizationSubTypesToDisplayInTemisProfileForm.find(
        (subType) => subType == lodashGet(ot, 'value'),
      );
    });

    return {
      orgTypes,
    };
  },
);

export default connect(mapStateToProps)(
  fetchData(({ userId }) => ({
    baseUrl: '/temis/profile/get',
    fetchCondition: userId,
    refetchCondition: (prevProps) => userId && userId !== prevProps.userId,
    params: {
      id: userId,
    },
    method: 'get',
    propKey: 'user',
  }))(TemisProfileForm),
);
