import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import DisplayHtml from 'components/common/html';
import { t1 } from 'translate';
import './stylesheet.scss';
import lodashGet from 'lodash.get';
import { set } from 'common/utils/object';

class DetailOnDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFull: false,
    };
  }

  cssClass = 'detail-on-dialog';

  handleCloseDialog = () => {
    const { dispatch, dialogKey } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }, dialogKey));
  };

  handleCloseDialogSuccessFull = () => {
    if (this.state.isShowFull) {
      this.setState({
        isShowFull: false,
      });
    }
  };

  componentDidMount() {
    const { defaultRenderFull } = this.props;
    if (defaultRenderFull) {
      this.handleShowFull();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.timeRender !== nextProps.timeRender &&
      this.state.isShowFull
    ) {
      this.renderContentDialog(nextProps);
    }
  }

  handleShowFull = () => {
    const { onShowFull } = this.props;
    this.renderContentDialog(this.props);

    if (typeof onShowFull === 'function') {
      onShowFull();
    }

    if (!this.state.isShowFull) {
      this.setState({
        isShowFull: true,
      });
    }
  };

  renderContentDialog = (props) => {
    const { renderFull, textFull, dialogOptionsProperties, dialogKey } = props;
    let contentDialog = null;
    if (renderFull) {
      contentDialog = renderFull(
        { closeDialog: this.handleCloseDialog },
        props,
      );
    } else if (textFull) {
      contentDialog = <DisplayHtml content={textFull} />;
    }

    let optionsProperties = dialogOptionsProperties || {
      handleClose: true,
    };

    const onCloseDialog = lodashGet(
      optionsProperties,
      'callbacks.onCloseDialog',
    );

    optionsProperties = set(
      optionsProperties,
      'callbacks.onCloseDialog',
      () => {
        this.handleCloseDialogSuccessFull();
        if (typeof onCloseDialog === 'function') {
          onCloseDialog();
        }
      },
    );

    this.props.dispatch(
      actions.handleOpenDialog(
        {
          contentDialog,
          optionsProperties,
        },
        dialogKey,
      ),
    );
  };

  render() {
    const {
      className,
      renderPreview,
      textPreview,
      textTooltip,
      textPreviewIsHtml,
      timeRender,
      disabled = false,
    } = this.props;

    if (renderPreview) {
      return renderPreview({ showFull: this.handleShowFull });
    }

    if (textPreview) {
      let realTextPreview = textPreview;
      if (typeof textPreview === 'function') {
        realTextPreview = textPreview();
      } else if (textPreviewIsHtml) {
        realTextPreview = <DisplayHtml content={textPreview} />;
      }

      let title;
      if (textTooltip && typeof textTooltip === 'function') {
        title = textTooltip();
      } else if (textTooltip) title = textTooltip;
      else {
        title = t1('click_to_see_detail');
      }

      return (
        <a
          key={timeRender}
          className={`${className || ''} ${this.cssClass}`}
          onClick={!disabled ? this.handleShowFull : null}
          title={title}
        >
          {realTextPreview}
        </a>
      );
    }

    return null;
  }
}

DetailOnDialog.propTypes = {
  className: PropTypes.string,
  dialogKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dialogOptionsProperties: PropTypes.shape(),
  renderFull: PropTypes.func,
  renderPreview: PropTypes.func,
  textFull: PropTypes.string,
  textPreview: PropTypes.string || PropTypes.func,
  textTooltip: PropTypes.string || PropTypes.func,
  onShowFull: PropTypes.func,
};

DetailOnDialog.defaultProps = {
  className: '',
  dialogOptionsProperties: null,
  renderFull: null,
  renderPreview: null,
  textFull: '',
  textPreview: '',
  textTooltip: '',
  onShowFull: null,
};

export default connect()(DetailOnDialog);
