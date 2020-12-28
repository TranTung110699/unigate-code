import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import Form from '../../new/Form';
import { t1 } from 'translate';
import { canEnrolmentPlanInfoBeExtended } from '../index';
import { timestampToDateTimeString } from '../../../../../common/utils/Date';
import Warning from 'components/common/Warning';

class EPExtendButton extends React.PureComponent {
  renderPreview = ({ showFull }) => {
    const { node } = this.props;
    return (
      <div>
        <div>
          {t1('start_date')} :{' '}
          {timestampToDateTimeString(node.start_date, { showTime: false })}
        </div>
        <div>
          {t1('end_date')} :{' '}
          {timestampToDateTimeString(node.end_date, { showTime: false })}
        </div>
        <RaisedButton
          icon={<Icon icon="reject" />}
          label={t1('change_enrolment_plan_deadline')}
          onClick={showFull}
          primary
        />
      </div>
    );
  };

  renderFull = () => {
    const { node } = this.props;
    return (
      <div>
        <h1>{t1('change_enrolment_plan_deadline')}</h1>({node.name})
        <Warning>
          {t1(
            'this_will_update_deadlines_for_all_courses_in_this_enrolment_plan_as_well',
          )}
        </Warning>
        <Form
          mode="edit"
          node={Object.assign({}, node, {
            // set default value to the update_course_deadline field
            // this is a hack,
            // TODO: find better mechanism
            update_course_deadline: 1,
          })}
          formid="extend_enrolment_plan"
          step={'deadline'}
          readOnly={canEnrolmentPlanInfoBeExtended(node)}
          submitLabel={t1('update_deadline')}
        />
      </div>
    );
  };

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

EPExtendButton.propTypes = {
  className: PropTypes.string,
};

EPExtendButton.defaultProps = {
  className: '',
};

export default EPExtendButton;
