import React, { Component } from 'react';
import { reset } from 'redux-form';
import moment from 'moment';

import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import Icon from 'components/common/Icon';
import PrimaryButton from 'components/common/primary-button';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import Report from 'components/admin/report/dashboard/search/tableReport';
import UsersInOfflineExam from 'components/admin/course/mainstage/users/Layout';
import InviteButton from 'components/admin/invite/new/ButtonNew';

import FormFilters from './FormFilters';
import searchSchema from './search-schema';
import Results from './Results';
import { schoolTypes } from '../../../../../configs/constants';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

const USER_TARGET = 'user';

class Layout extends Component {
  progressLastSyncedTimeKey = 'progressLastSyncedTime';
  divStyle = { paddingBottom: 10 };

  constructor(props) {
    super(props);

    this.state = {
      progressLastSyncedTime: null,
    };
  }

  componentWillMount() {
    const progressLastSyncedTime = localStorage.getItem(
      this.progressLastSyncedTimeKey,
    );

    this.setState({
      ...this.state,
      progressLastSyncedTime: progressLastSyncedTime
        ? parseInt(progressLastSyncedTime, 10)
        : null,
    });
  }

  renderResultComponent = (items, props) => {
    const { themeConfig } = this.props;

    if (props.target === USER_TARGET) {
      return <Report {...props} items={items} themeConfig={themeConfig} />;
    }

    return <Results items={items} {...props} />;
  };

  syncProgress = () => {
    const { dispatch, node, formid } = this.props;

    dispatch(
      sagaActions.getDataRequest(
        {
          url: '/progress/api/sync-progress-from-redis-to-db',
          keyState: 'progress_syncing_result',
          executeOnSuccess: () => {
            const currentTime = Date.now();

            this.setState({
              ...this.state,
              progressLastSyncedTime: currentTime,
            });
            localStorage.setItem(this.progressLastSyncedTimeKey, currentTime);

            dispatch(reset(formid));
          },
        },
        {
          course_iid: node.iid,
        },
      ),
    );
  };

  /**
   * Tao hidden fields cho searchwrapper
   * @returns {{item_iid: *, item_ntype: string|*, item_learning_type: learning_type|{type, floatingLabelText, errorText, floatingLabelFixed, options, defaultValue, fullWidth}|*, target}}
   */
  createHiddenFieldsForSearchWrapper = () => {
    const { node, target, isMarkingForAssignment, groups } = this.props;
    const hiddenFields = {
      item_iid: node.iid,
      item_ntype: node.ntype,
      item_learning_type: node.learning_type,
      target,
    };

    if (groups && groups.length) {
      hiddenFields.groups = groups;
    }

    if (isMarkingForAssignment) {
      hiddenFields.prepend_group_detail = 1;
    }
    return hiddenFields;
  };

  /**
   * Tao id cho search wrapper
   * @returns {string}
   */
  createIdForSearchWrapper = () => {
    const { target, groups } = this.props;
    let id = `user_group_report-${target}`;
    if (groups) {
      id += groups.join('-');
    }
    return id;
  };

  /**
   * Render cac action voi school type la enterprise
   * @returns {*}
   */
  renderActionEnterprise = () => {
    const { progressLastSyncedTime } = this.state;
    const { node, themeConfig } = this.props;
    const isEnterprise = themeConfig && themeConfig.type !== schoolTypes.SIS;
    if (!isEnterprise) {
      return null;
    }

    const lastSynced = progressLastSyncedTime
      ? `${t1('last_synced')}: ${moment(progressLastSyncedTime).format(
          'DD/MM/YYYY HH:mm:ss',
        )}`
      : '';

    return (
      <span>
        <InviteButton type="raised" primary node={node} />
        <PrimaryButton
          name="sync_progress"
          className="m-l-10 m-r-10"
          type="submit"
          icon={<Icon icon="sync" />}
          label={t1('sync_progress')}
          onClick={this.syncProgress}
        />
        <span> {lastSynced}</span>
      </span>
    );
  };

  render() {
    const { isEnterprise } = this.props;
    const {
      node,
      target,
      groups,
      notShowFormFilters,
      isMarkingForAssignment,
    } = this.props;

    if (node && node.exam_type && node.exam_type === 'OFFLINE_EXAM') {
      return <UsersInOfflineExam {...this.props} />;
    }

    const hiddenFields = this.createHiddenFieldsForSearchWrapper();
    const id = this.createIdForSearchWrapper(hiddenFields);

    if (isEnterprise) {
      return (
        <div>
          <SearchWrapperV2
            formid={id}
            showResult
            {...this.props}
            hiddenFields={{ ...hiddenFields }}
            renderResultsComponent={this.renderResultComponent}
            showQueryField={false}
            destroyOnUnmount
            alternativeApi="/report/search-report"
            schema={searchSchema}
          />
          <div style={this.divStyle}>{this.renderActionEnterprise()}</div>
        </div>
      );
    }

    // TODO: use new schema form
    // return (
    //   <div>
    //     <SearchWrapper
    //       formid={id}
    //       showResult
    //       {...this.props}
    //       hiddenFields={{ ...hiddenFields }}
    //       renderResultsComponent={this.renderResultComponent}
    //       showQueryField={false}
    //       destroyOnUnmount
    //       alternativeApi="/report/search-report"
    //     >
    //       {!notShowFormFilters && (
    //         <FormFilters target={target} groups={groups} node={node} id={id} />
    //       )}
    //     </SearchWrapper>
    //   </div>
    // );
  }
}

export default withSchoolConfigs(Layout);
