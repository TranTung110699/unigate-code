/**
 * Created by hungvo on 04/11/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Icon from 'components/common/Icon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'components/common/mui/FlatButton';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import MultiCheckbox from 'schema-form/elements/multi-checkbox';

const optionsCloneCourse = [
  {
    value: 'clone_syllabus',
    label: t1('clone_syllabus'),
  },
  {
    value: 'price',
    label: t1('set_price_as_the_old_price'),
  },
];

class DeepClone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloning: false,
      titleDialog: '',
      contentDialog: '',
      open: false,
      cloneOptions: null,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleDeepCloneSuccessFul = this.handleDeepCloneSuccessFul.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      cloneOptions: null,
      open: false,
      cloning: false,
    });
  };

  settingOptionsClone = (node) => {
    const contentDialog = (
      <MultiCheckbox
        options={optionsCloneCourse}
        floatingLabelText={t1('clone_options')}
        onChange={(newValue) => {
          this.setState({ cloneOptions: newValue });
        }}
      />
    );
    this.setState({
      contentDialog,
      cloneOptions: [],
      titleDialog: t1('clone_options_for_"%s"_(%s)', [
        node && node.name,
        node.code || `#${node.iid}`,
      ]),
    });

    this.handleOpen();
  };

  handleOnClick = () => {
    const { node, dispatch } = this.props;
    const { cloneOptions } = this.state;
    if (node && node.ntype === 'course' && cloneOptions == null) {
      this.settingOptionsClone(node);
      return;
    }
    this.setState({ cloning: true });
    const payload = {
      data: node,
      iid: node.iid,
      ntype: node.ntype,
      requestSuccessful: this.handleDeepCloneSuccessFul,
    };
    if (cloneOptions && cloneOptions.length) {
      payload.options = cloneOptions;
    }

    dispatch(sagaActions.deepCloneNodeRequest(payload));
  };

  handleDeepCloneSuccessFul = (newNode) => {
    const { deepCloneSuccessFul } = this.props;
    if (deepCloneSuccessFul) {
      deepCloneSuccessFul(newNode);
    }
    this.handleClose();
  };

  render() {
    const { titleDialog, open, contentDialog, cloning } = this.state;
    if (cloning) {
      return <CircularProgress size={20} thickness={2} />;
    }
    const { node, label, title, className } = this.props;
    const actions = [
      <FlatButton label={t1('cancel')} primary onTouchTap={this.handleClose} />,
      <FlatButton
        label={t1('ok')}
        primary
        onClick={() => this.handleOnClick()}
      />,
    ];
    const propsButton = { label, title, className };
    if (label) {
      propsButton.labelPosition = 'after';
    }

    const style = { cursor: 'pointer' };
    const btn = this.props.iconButton ? (
      <span
        style={style}
        key={`button-deepclone-${node && node.iid}`}
        {...propsButton}
        onClick={this.handleOnClick}
      >
        <Icon icon={'clone'} />
      </span>
    ) : this.props.textButton ? (
      <span
        style={style}
        key={`button-deepclone-${node && node.iid}`}
        {...propsButton}
        onClick={this.handleOnClick}
      >
        {this.props.textButtonTitle || t1('deepclone')}
      </span>
    ) : (
      <FlatButton
        key={`button-deepclone-${node && node.iid}`}
        {...propsButton}
        icon={<Icon icon={'clone'} />}
        onClick={this.handleOnClick}
      />
    );

    return [
      btn,
      <Dialog
        key={`dialog-deepclone-${node && node.iid}`}
        actions={actions}
        title={titleDialog}
        open={open}
        onRequestClose={this.handleClose}
      >
        {contentDialog}
      </Dialog>,
    ];
  }
}

DeepClone.propTypes = {
  dispatch: PropTypes.func.isRequired,
  deepCloneSuccessFul: PropTypes.func,
  node: PropTypes.shape({
    id: PropTypes.string,
    iid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }),
  label: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

DeepClone.defaultProps = {
  node: {},
  label: '',
  title: '',
  className: '',
  deepCloneSuccessFul: null,
};

export default connect()(DeepClone);
