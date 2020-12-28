import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FlatButton from 'components/common/mui/FlatButton';
import nodeSagaActions from 'actions/node/saga-creators';
// import apiUrls from 'api-endpoints';
import fileApiUrls from 'components/common/file-manager/endpoints';
import { t1, t3 } from 'translate';
import { getFileFullName } from 'common/utils/File';
import styled from 'styled-components';

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class Delete extends React.Component {
  modalKey = 'file_manager_delete_items';

  renderPreview = ({ showFull }) => {
    const { className } = this.props;
    return (
      <IconButton title={t1('delete')} className={className} onClick={showFull}>
        <DeleteIcon />
      </IconButton>
    );
  };

  handleYesButtonClick = () => {
    const { dispatch, items, searchFormId, executeOnSuccess } = this.props;
    if (!Array.isArray(items) || items.length === 0) {
      return;
    }
    dispatch(
      nodeSagaActions.submitFormRequest('', {
        extraParams: { item_ids: items.filter(Boolean).map((item) => item.id) },
        url: fileApiUrls.delete_files,
        closeModal: true,
        modalKey: this.modalKey,
        formidToSubmitOnSuccess: searchFormId,
        executeOnSuccess,
      }),
    );
  };

  renderFull = ({ closeDialog }) => {
    const { items } = this.props;
    if (!Array.isArray(items) || items.length === 0) {
      return (
        <div>
          {t1('you_cannot_delete_nothing')}
          <ActionsWrapper>
            <FlatButton
              label={t3('ok')}
              primary
              onClick={closeDialog}
              flatButton
            />
          </ActionsWrapper>
        </div>
      );
    }
    const actions = (
      <ActionsWrapper>
        <FlatButton
          key={'yes'}
          label={t1('yes')}
          onClick={this.handleYesButtonClick}
          flatButton
        />
        <FlatButton
          key={'no'}
          label={t1('no')}
          primary
          onClick={closeDialog}
          flatButton
        />
      </ActionsWrapper>
    );
    if (items.length > 1) {
      return (
        <div>
          {t1('do_you_want_to_delete_%s_items', [items.length])}
          {actions}
        </div>
      );
    }
    return (
      <div>
        {t1('do_you_want_to_delete_%s', [getFileFullName(items[0])])}
        {actions}
      </div>
    );
  };

  render() {
    const { items } = this.props;
    return (
      <DetailOnDialog
        items={items}
        dialogKey={this.modalKey}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

Delete.propTypes = {
  className: PropTypes.string,
};

Delete.defaultProps = {
  className: '',
};

export default connect()(Delete);
