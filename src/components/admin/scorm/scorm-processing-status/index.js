import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import {
  isScormProcessing,
  isScormProcessingSuccess,
  getTimeScormProcessingStart,
  getScormProcessingMessage,
} from 'components/admin/scorm/scorm';
import Warning from 'components/common/Warning';
import ButtonAction from 'components/common/action-button/UpdateBtnWithConfirmDialog';
import lodashGet from 'lodash.get';
import apiUrls from 'api-endpoints';
import { createSelector } from 'reselect';
import { getNodeSelector } from 'components/admin/node/utils';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';

const PROCESS_SCORM_RETRY_TIME = 5; // minutes

const tooltip = (title) => (
  <Tooltip
    title={
      title ||
      t1(
        'sometimes_the_scorm_file_is_too_big_it_fails_when_extracting,_you_can_try_again_by_clicking_this_button',
      )
    }
    overlayStyle={{ maxWidth: 'unset' }}
    placement="right"
    arrowPointAtCenter={true}
  >
    <Icon type="question-circle" />
  </Tooltip>
);

class MetaDataScormProcessingStatus extends React.Component {
  cssClass = 'meta-data-time-range';

  render() {
    const { className, item, readOnly, isCompact } = this.props;

    const relaunchButton = (title) => (
      <span>
        <ButtonAction
          buttonStyle={{
            top: -1,
            border: '1px solid green',
          }}
          icon="retry"
          label={title}
          iid={lodashGet(item, 'iid')}
          ntype={lodashGet(item, 'ntype')}
          alternativeApi={apiUrls.process_scorm}
          textConfirm={t1('do_you_want_to_retry_extracting_scorm_file?')}
          data={item}
        />{' '}
        {tooltip()}
      </span>
    );

    return isScormProcessing(item) ? (
      <React.Fragment>
        {!isCompact && (
          <Warning style={{ display: 'inline-block' }}>
            {t1('scorm_file_is_being_extracted...')}
          </Warning>
        )}
        {(new Date().getTime() / 1000 - getTimeScormProcessingStart(item)) /
          60 >
        PROCESS_SCORM_RETRY_TIME ? (
          relaunchButton(t1('retry_processing_scorm_file'))
        ) : (
          <span>
            {t1('retry_in_5_mins')}{' '}
            {tooltip(
              t1(
                'after_five_minutes_you_can_reload_this_page_to_see_if_the_scorm_file_has_been_extracted_successfully_or_not',
              ),
            )}{' '}
          </span>
        )}
      </React.Fragment>
    ) : !isScormProcessingSuccess(item) ? (
      <React.Fragment>
        {!isCompact && (
          <Warning>
            {t1('failed_to_extract_scorm_file')}:{' '}
            {getScormProcessingMessage(item)}
          </Warning>
        )}
        {relaunchButton(t1('retry_processing_scorm_file'))}
      </React.Fragment>
    ) : null;
  }
}

MetaDataScormProcessingStatus.propTypes = {
  className: PropTypes.string,
};

MetaDataScormProcessingStatus.defaultProps = {
  className: '',
};

export default connect(
  createSelector(
    getNodeSelector,
    (state, props) => lodashGet(props, 'item.iid'),
    (getNode, itemIid) => ({
      item: getNode(itemIid),
    }),
  ),
)(MetaDataScormProcessingStatus);
