import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import ForwardContentIcon from 'material-ui/svg-icons/content/forward';
import { getFormValues } from 'redux-form';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import ChangeExamRoundForm from './ChangeExamRoundForm';

class ChangeExamRoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const contentDialog = <ChangeExamRoundForm {...this.props} />;

    const optionsProperties = {
      handleClose: true,
      modal: true,

      title: t1('change_exam_round'),
    };

    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  render() {
    const { userIdsToChangeExamRound } = this.props;
    return (
      <RaisedButton
        onClick={this.handleClick}
        name="change_exam_round"
        id="change_exam_round"
        className="m-b-10"
        disabled={
          !userIdsToChangeExamRound || userIdsToChangeExamRound.length === 0
        }
        icon={<ForwardContentIcon />}
        label={t1('change_exam_round')}
        primary
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { formid } = props;
  return {
    values: getFormValues(formid)(state),
  };
};

export default connect(mapStateToProps)(ChangeExamRoundButton);
