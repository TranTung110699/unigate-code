import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import FlatButton from 'components/common/mui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';

const getContentConfirm = (props) => {
  let textConfirm = props.textConfirm;
  const nodeToRemove = get(props, 'nodeToRemove');

  if (
    get(nodeToRemove, 'ntype') === 'skill' &&
    (get(nodeToRemove, 'type') === 'rubric' ||
      get(props, 'node.type') === 'rubric')
  ) {
    const markedForRubric = get(props, 'dataImportComplite.marked_for_rubric');
    const imports = get(props, 'dataImportComplite.imports');

    if (markedForRubric) {
      return t1(
        'the_score_has_been_updated_according_to_the_current_rubric.are_you_cannot_do_that',
      );
    } else if (Array.isArray(imports) && imports.length) {
      return [
        <div>
          <h3>
            {t1(
              'the_score_has_been_updated_according_to_the_current_rubric._if_delete,_the_system_will_' +
                'automatically_re-calculate_the_score_of_students_with_a_new_rubric.' +
                '_please_review_the_score_imported_on_the_previous:',
            )}
          </h3>
          <ul>
            {imports.map((row) => {
              return (
                <a href={row.import_file} target="_blank">
                  {row.import_file}
                </a>
              );
            })}
          </ul>
        </div>,
        <h3>{t1('are_you_sure_you_want_to_do_this?')}</h3>,
      ];
    } else if (typeof markedForRubric !== 'undefined' && !markedForRubric) {
      textConfirm = t1(
        'the_score_has_been_updated_according_to_the_current_rubric._if_delete,_the_system_will_' +
          'automatically_re-calculate_the_score_of_students_with_a_new_rubric._are_you_sure_you_want_to_do_this?',
      );
    }
  }

  return textConfirm || t1('are_you_sure_you_want_to_do_this');
};

const getActionsConfirm = (props) => {
  const { cancelAction, removeAction } = props;
  const markedForRubric = get(props, 'dataImportComplite.marked_for_rubric');

  if (markedForRubric) {
    return [<FlatButton label={t1('ok')} primary onClick={cancelAction} />];
  }

  return [
    <FlatButton label={t1('cancel')} primary onClick={cancelAction} />,
    <FlatButton label={t1('ok')} primary onClick={removeAction} />,
  ];
};

const confirmRemovingChildren = (props) => {
  const { cancelAction, loadingStatus } = props;

  if (loadingStatus === 'loading') {
    return <Loading />;
  }

  return (
    <Dialog
      autoScrollBodyContent
      actions={getActionsConfirm(props)}
      modal={false}
      open
      onRequestClose={cancelAction}
    >
      {getContentConfirm(props)}
    </Dialog>
  );
};

const mapStateToProps = (state, props) => {
  return {
    nodeToRemove: get(state, `tree.${props.childrenIidRemove}`),
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl:
      '/progress/api/get-data-to-confirm-score-update-when-rubric-deleted',
    params: {
      iid: get(props, 'nodeToRemove.iid'),
      syllabus_iid: get(props, 'syllabusIid'),
    },
    propKey: 'dataImportComplite',
    fetchCondition:
      get(props, 'nodeToRemove.ntype') === 'skill' &&
      (get(props, 'nodeToRemove.type') === 'rubric' ||
        get(props, 'node.type') === 'rubric'),
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(confirmRemovingChildren),
);
