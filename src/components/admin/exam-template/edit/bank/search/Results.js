/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import QuestionsPreview from 'components/common/question/QuestionsPreview';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new';
import RaisedButton from '../../../../../common/mui/RaisedButton';

const schema = {
  schema: () => ({
    delete_in_database: {
      type: 'checkbox',
      defaultValue: 0,
      label: t1('delete_questions_in_the_database'),
      fullWidth: true,
    },
  }),
  ui: () => [
    {
      id: 'id',
      title: t1('are_you_sure_you_want_to_remove'),
      fields: ['delete_in_database'],
    },
  ],
};

const elementDeleteQuestions = (
  ids,
  examTemplate = {},
  searchFormId = '',
  requestSuccessful = () => {},
) => (
  <DetailOnDialog
    renderPreview={({ showFull }) => {
      return ids && !Array.isArray(ids) ? (
        <Icon
          title={t1('remove_question_from_template_bank')}
          icon="delete"
          onClick={showFull}
          className="action"
          style={{ fontSize: 20 }}
        />
      ) : (
        <RaisedButton
          onClick={showFull}
          className="m-t-20 m-b-20"
          disabled={!Array.isArray(ids) || !ids.length}
          label={t1("delete_%s_question's", [
            (Array.isArray(ids) && ids.length) || 0,
          ])}
          primary
          buttonType="danger"
        />
      );
    }}
    renderFull={({ closeDialog }) => {
      return (
        <NodeNew
          schema={schema}
          hiddenFields={{
            ids: Array.isArray(ids) ? ids : [ids],
            exam_template_iid: examTemplate && examTemplate.iid,
          }}
          formid="remove-questions"
          searchFormId={searchFormId}
          requestSuccessful={() => {
            closeDialog();
            requestSuccessful();
          }}
          submitLabel={t1('to_delete')}
          alternativeApi="/exam-template/index/remove-question"
        />
      );
    }}
  />
);

const BankResults = ({
  items,
  node,
  categoryMappingWithTheSkills,
  searchFormId = 'template_bank_questions',
}) => {
  return (
    <QuestionsPreview
      items={items}
      categoryMappingWithTheSkills={categoryMappingWithTheSkills}
      elementDeleteQuestions={(ids, requestSuccessful = () => {}) =>
        elementDeleteQuestions(ids, node, searchFormId, requestSuccessful)
      }
      renderActions={(item) => (
        <React.Fragment>
          <Link to={`#/admin/question/${item.id}/edit`}>
            <IconButton
              title={t1('edit_question')}
              iconClassName="mi mi-edit"
            />
          </Link>
          {elementDeleteQuestions(item.id, node, searchFormId)}
        </React.Fragment>
      )}
    />
  );
};

export default connect()(BankResults);
