import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import Loading from 'components/common/loading';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import NodeNew from 'components/admin/node/new';
import getSchema from './form-edit-score';

class EditScore extends React.Component {
  render() {
    const {
      subject,
      loadingStatus,
      updateSuccessFull,
      closeDialog,
      scoreScale,
      userIid,
      creditSyllabusIid,
      formOfTraining,
    } = this.props;

    if (!subject && loadingStatus !== 'finished') {
      return <Loading />;
    } else if (!subject) {
      return <h3>{t1('error')}</h3>;
    }

    const hiddenFields = {
      userIid,
      subject_iid: creditSyllabusIid,
      formOfTraining,
    };

    return (
      <NodeNew
        hiddenFields={hiddenFields}
        schema={getSchema(subject, scoreScale, updateSuccessFull)}
        node={{ ...subject.final_score, ntype: 'progress', id: 1, iid: 1 }}
        mode="update"
        formid={`edit-score-of-subject-${subject.iid}`}
        alternativeApi={apiUrls.tracker_progress_save(true)}
        requestSuccessful={() => {
          if (typeof closeDialog === 'function') {
            closeDialog();
          }
          if (typeof updateSuccessFull === 'function') {
            updateSuccessFull();
          }
        }}
      />
    );
  }
}

EditScore.propTypes = {
  formOfTraining: PropTypes.instanceOf(Object),
};

EditScore.defaultProps = {
  formOfTraining: null,
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_subject_score_of_user,
  params: {
    user_iid: getLodash(props, 'userIid'),
    major: getLodash(props, 'formOfTraining.major'),
    training_mode: getLodash(props, 'formOfTraining.training_mode'),
    training_level: getLodash(props, 'formOfTraining.training_level'),
    ico: getLodash(props, 'formOfTraining.ico'),
    credit_syllabus_iid: getLodash(props, 'creditSyllabusIid'),
    group_by: 'subject',
  },
  propKey: 'subject',
  fetchCondition:
    getLodash(props, 'formOfTraining.major') &&
    getLodash(props, 'formOfTraining.training_mode') &&
    getLodash(props, 'formOfTraining.training_level') &&
    getLodash(props, 'formOfTraining.ico') &&
    getLodash(props, 'creditSyllabusIid') &&
    getLodash(props, 'userIid'),
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(EditScore);
