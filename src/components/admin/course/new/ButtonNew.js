/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { t1 } from 'translate';
import actions from 'actions/node/creators';
import { schoolTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';

import Icon from 'components/common/Icon';
import NewButton from 'components/common/mui/NewButton';

import NewForm from '../new/Form';

const getLabel = (props) => {
  const { step } = props;
  let label = t1('new_course');
  switch (step) {
    case 'exam_shift': {
      label = t1('new_exam_shift');
      break;
    }
    case 'offline_exam': {
      label = t1('new_offline_exam');
      break;
    }
    default: {
      break;
    }
  }
  return label;
};

const dialogKey = 'new_course';

export const handleOpenNewCourse = ({
  dispatch,
  step,
  searchFormId,
  history,
  formid,
  contestIid,
  requestSuccessful,
}) => {
  const contentDialog = (
    <NewForm
      mode="new"
      searchFormId={searchFormId}
      formid={formid}
      step={step}
      contestIid={contestIid}
      requestSuccessful={requestSuccessful}
      dialogKey={dialogKey}
    />
  );

  // TODO: handle this dialog properly
  const title = getLabel({ step });
  const optionsProperties = {
    handleClose: true,

    title,
    modal: true,
    callbacks: {
      onCloseDialog: () => {
        if (!history) return;

        const { location } = history;
        if (!location) return;

        const url = location && location.pathname.replace('/new', '');
        history.push(url);
      },
    },
  };
  dispatch(
    actions.handleOpenDialog({ contentDialog, optionsProperties }, dialogKey),
  );
};

class ButtonNew extends Component {
  handleOnClick = () => {
    const {
      dispatch,
      step,
      searchFormId,
      formid,
      history,
      themeConfig,
      contestIid,
      requestSuccessful,
    } = this.props;

    handleOpenNewCourse({
      dispatch,
      step,
      searchFormId,
      formid,
      history,
      themeConfig,
      contestIid,
      requestSuccessful,
    });
  };

  render() {
    const { step, location, themeConfig } = this.props;

    const isSIS = themeConfig && themeConfig.type === schoolTypes.SIS;
    const url =
      isSIS && step !== 'offline_exam'
        ? '/admin/plan/create'
        : (location && location.pathname).includes('/new')
        ? location && location.pathname
        : `${location && location.pathname}/new`;

    const buttonProps = {
      name: 'submit',
      type: 'submit',
      primary: this.props.primary,
      icon: <Icon style={{ color: '#111111' }} icon="plus" />,
      label: getLabel(this.props),
    };

    if (!isSIS) buttonProps.onClick = this.handleOnClick;

    return (
      <Link to={url} className="button-link">
        <NewButton {...buttonProps} />
      </Link>
    );
  }
}

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default withRouter(connect(mapStateToProp)(ButtonNew));
