import React, { Component } from 'react';
import { reset } from 'redux-form';
import { timestampToDateString } from 'common/utils/Date';

import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import Icon from 'components/common/Icon';
import PrimaryButton from 'components/common/primary-button';
import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import Report from './tableReport';
import InviteButton from 'components/admin/invite/new/ButtonNew';
import searchSchema from './search-schema';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import courseUrls from '../../../../endpoints';

class Layout extends Component {
  // progressLastSyncedTimeKey = 'progressLastSyncedTime';
  divStyle = { paddingBottom: 10 };

  // constructor(props) {
  //   super(props);
  //
  // this.state = {
  //   progressLastSyncedTime: null,
  // };
  // }

  // componentWillMount() {
  //   const progressLastSyncedTime = localStorage.getItem(
  //     this.progressLastSyncedTimeKey,
  //   );
  //
  //   this.setState({
  //     ...this.state,
  //     progressLastSyncedTime: progressLastSyncedTime
  //       ? parseInt(progressLastSyncedTime, 10)
  //       : null,
  //   });
  // }

  renderResultComponent = (items, props) => {
    return <Report {...props} items={items} />;
  };

  // syncProgress = () => {
  //   const { dispatch, node, formid } = this.props;
  //
  //   dispatch(
  //     sagaActions.getDataRequest(
  //       {
  //         url: '/progress/api/sync-progress-from-redis-to-db',
  //         keyState: 'progress_syncing_result',
  //         executeOnSuccess: () => {
  //           const currentTime = Date.now();
  //
  //           this.setState({
  //             ...this.state,
  //             progressLastSyncedTime: currentTime,
  //           });
  //           localStorage.setItem(this.progressLastSyncedTimeKey, currentTime);
  //
  //           dispatch(reset(formid));
  //         },
  //       },
  //       {
  //         course_iid: node.iid,
  //       },
  //     ),
  //   );
  // };

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
   * Render cac action voi school type la enterprise
   * @returns {*}
   */
  renderActionEnterprise = () => {
    // const { progressLastSyncedTime } = this.state;
    const { node } = this.props;

    // const lastSynced = progressLastSyncedTime
    //   ? `${t1('last_synced')}: ${timestampToDateString(progressLastSyncedTime, {
    //       showTime: true,
    //     })}`
    //   : '';

    return (
      <span>
        <InviteButton type="raised" primary node={node} />
        {/*
        <PrimaryButton
          name="sync_progress"
          className="m-l-10 m-r-10"
          type="submit"
          icon={<Icon icon="sync" />}
          label={t1('sync_progress')}
          onClick={this.syncProgress}
        />
        <span> {lastSynced}</span>

           */}
      </span>
    );
  };

  render() {
    const { isEnterprise, node } = this.props;

    const hiddenFields = this.createHiddenFieldsForSearchWrapper();
    const id = `online_score_table_${node.iid}`;

    if (isEnterprise) {
      return (
        <>
          <SearchWrapperV2
            formid={id}
            showResult
            {...this.props}
            hiddenFields={{ ...hiddenFields }}
            renderResultsComponent={this.renderResultComponent}
            showQueryField={false}
            destroyOnUnmount
            alternativeApi={courseUrls.search_online_score}
            schema={searchSchema}
          />
          <div style={this.divStyle}>{this.renderActionEnterprise()}</div>
        </>
      );
    }
  }
}

export default withSchoolConfigs(Layout);
