import React from 'react';
import Button from 'antd/lib/button';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import lodashGet from 'lodash.get';
import { ListAttachmentsToDownloadAsTable } from 'components/common/attachment/DownloadAttachments';
import { checkLearnerCanDownloadAttachments } from 'common/conf';
import './style.scss';
import { isSmallScreen } from 'common';

class Index extends React.Component {
  handleClick = () => {
    const { dispatch, learnItem, syllabusIid } = this.props;

    let downloads = [];

    const attachments = lodashGet(learnItem, 'attachments');
    const downloadMaterials = lodashGet(learnItem, 'download_materials');

    if (Array.isArray(attachments) && attachments.length)
      downloads = downloads.concat(attachments);
    if (Array.isArray(downloadMaterials) && downloadMaterials.length)
      downloads = downloads.concat(downloadMaterials);

    const contentDialog =
      Array.isArray(downloads) && downloads.length ? (
        <ListAttachmentsToDownloadAsTable
          attachments={downloads}
          compact={isSmallScreen}
        />
      ) : null;
    const optionsProperties = {
      handleClose: true,
      width: '80%',
      modal: true,
      title: t1('download_materials'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { syllabus } = this.props;
    const attachments = lodashGet(syllabus, 'download_materials');

    if (
      this.props.canLearnerDownloadAttachments &&
      (Array.isArray(attachments) && attachments.length)
    )
      return (
        <Button
          onClick={this.handleClick}
          icon="download"
          type="primary"
          block
          style={{ borderRadius: 'unset', marginTop: 5 }}
          className="download-materials-button"
        >
          {t1('download_materials')}
        </Button>
      );

    return null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    canLearnerDownloadAttachments: checkLearnerCanDownloadAttachments(
      lodashGet(state, 'domainInfo.conf'),
    ),
    syllabus: lodashGet(state, `tree.${props.syllabusIid}`),
  };
};

export default connect(mapStateToProps)(Index);
