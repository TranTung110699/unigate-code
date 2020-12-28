import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from 'material-ui/Tabs';
import Tabs, { tabButtonStyle } from 'components/common/tabs/LightTabs';

import { ntype as ntypes } from 'configs/constants';
import NodeNew from 'components/admin/node/new';
import { tabTitle } from 'components/admin/node/utils';
import { schoolTypes, UsedFor } from 'configs/constants';
import { createSelector } from 'reselect';
import get from 'lodash.get';
import Search from './search/Layout';
import getBankNtypeSchema from './schema-configs';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import isNumeric from 'antd/es/_util/isNumeric';
import ImportQuestionToBank from 'components/admin/question/import/Layout';
import actions from 'actions/node/creators';
import examTemplateSchema from '../edit/metadata/add-item/exam-template-schema';
import endpoints from '../../../../api-endpoints';
import { bankDialogTabDisplayTypes } from './utils';

class NodeBankDialog extends Component {
  constructor(props) {
    super(props);
    const { ntype, isSIS, searchWhenActivated } = props;
    this.state = {
      autoSearchWhenStart: false,
      selectedTab: 'new',
    };

    if (isSIS) {
      if (
        ntype === 'syllabus' &&
        this.getSubType(props) === 'credit' &&
        this.shouldShowBankTab(props)
      ) {
        this.state = {
          ...this.state,
          selectedTab: 'bank',
        };
      }
    }

    if (this.state.selectedTab === 'bank' && searchWhenActivated) {
      this.state = {
        ...this.state,
        autoSearchWhenStart: true,
      };
    }
  }

  shouldShowBankTab = (props = {}) => {
    const { dev, displayType } = props;
    return !dev && displayType !== bankDialogTabDisplayTypes.NEW_ONLY;
  };

  getSubType = (props = {}) => {
    const { ntype } = props;
    let subType = props.subType;
    if (ntype === ntypes.QUESTION && isNumeric(subType)) {
      subType = parseInt(subType, 10);
    }
    return subType;
  };

  handleChange = (value) => {
    this.setState({
      selectedTab: value,
    });
  };

  getValueOptionCreateNewNode = (ntype, subType, pNtype) => {
    const { editingItemAncestors, editingItemIid } = this.props;

    const params = {};
    const hiddenFields = {};
    switch (ntype) {
      case 'sco':
        params.tpl_type = subType;
        break;
      case 'exercise':
        if (
          subType === 'exam' ||
          subType === 'applied' ||
          subType === 'roleplay'
        ) {
          params.type = subType;
        } else {
          params.speaking_type = subType;
        }
        break;
      case 'path':
        params.type = subType;

        break;
      case 'survey-question':
        params.type = Number.parseInt(subType, 10);
        if (isNaN(params.type)) delete params.type;
        params.used_for = [UsedFor.SURVEY];
        break;
      case 'question':
        params.type = Number.parseInt(subType, 10);
        if (isNaN(params.type)) delete params.type;
        params.used_for = this.props.pSubtype
          ? [this.props.pSubtype]
          : [UsedFor.LEARN];

        if (['exam-template', 'question-bank'].includes(pNtype)) {
          const key = pNtype.replace('-', '_');
          hiddenFields[key] = editingItemIid;
        }
        break;
      default:
        params.type = subType;
        break;
    }

    const syllabus =
      Array.isArray(editingItemAncestors) &&
      editingItemAncestors.find((item) => item && item.ntype === 'syllabus'); // && item.type === 'credit'));

    if (
      syllabus &&
      syllabus.code &&
      syllabus.type === 'credit' &&
      ntype === 'skill' &&
      subType === 'rubric'
    ) {
      params.code_prefix = `${syllabus.code}-`;
    }

    // always pass syllabus iid along so we can check if user is allowed to add content in this syllabus
    if (syllabus) {
      params.syllabus = syllabus.iid;
    }

    return { params, hiddenFields };
  };

  elementNewBank = ({ ntype, subType, step, mode, node, pNtype }) => {
    let { params, hiddenFields } = this.getValueOptionCreateNewNode(
      ntype,
      subType,
      pNtype,
    );

    let ntypeForSchema = ntype;
    switch (ntype) {
      case 'survey-question': {
        ntypeForSchema = 'question';
        break;
      }
      case 'syllabus-online-only': {
        ntypeForSchema = 'syllabus';
        break;
      }
    }

    const { handleCloseDialog, ...props } = this.props;

    return (
      <NodeNew
        {...props}
        ntype={ntypeForSchema}
        schema={getBankNtypeSchema(ntypeForSchema)}
        formid={`bank_${mode || 'new'}_${ntype}_${subType}`}
        mode={mode || 'new'}
        step={step}
        hiddenFields={hiddenFields}
        params={params}
        node={node}
        surveyQuestion={ntype === 'survey-question'}
        requestSuccessful={handleCloseDialog}
      />
    );
  };

  refetchExamRoud = () => {
    const { examRoundInfo, dispatch } = this.props;
    dispatch(
      actions.fetchNode({
        iid: examRoundInfo.iid,
        ntype: examRoundInfo.ntype,
        depth: 2,
        is_preview: 1,
        editing_syllabus: 2,
      }),
    );
  };

  refetchNodeToEdit = () => {
    const { dispatch, pNtype, editingItemIid } = this.props;
    dispatch(
      actions.fetchNode({
        iid: editingItemIid,
        ntype: pNtype,
        depth: 1,
        is_preview: 1,
        editing_syllabus: 2,
      }),
    );
  };

  elementImportQuestions = () => {
    const { editingItemIid, handleCloseDialog } = this.props;
    const importParams = {
      exercise_iid: editingItemIid,
    };

    return (
      <div>
        <div>
          {t1(
            'you_can_import_questions_from_an_excel_file_with_the_following_steps',
          )}
          <ul>
            <li>{t1('download_the_sample_question_bank_excel_file')}</li>
            <li>{t1('edit_questions_in_the_excel_file')}</li>
            <li>
              {t1(
                'upload_the_excel_file_by_clicking_the_upload_icon_or_simply_paste_the_url_of_the_excel_file',
              )}
            </li>
            <li>{t1('click_preview')}</li>
            <li>{t1('review_the_questions_and_then_import')}</li>
          </ul>
        </div>

        <ImportQuestionToBank
          formid={'import_questions'}
          requestSuccessful={() => {
            if (typeof handleCloseDialog === 'function') {
              handleCloseDialog();
            }
            this.refetchNodeToEdit();
          }}
          importParams={importParams}
        />
      </div>
    );
  };

  elementAddExamFromTemplate = () => {
    const { examRoundInfo, editingItemIid, handleCloseDialog } = this.props;

    return (
      <NodeNew
        hiddenFields={{
          roundIid: examRoundInfo.iid,
          syllabusIid: editingItemIid,
        }}
        ntype={'syllabus'}
        schema={examTemplateSchema}
        alternativeApi={endpoints.generate_exam_scos_from_template}
        closeModal
        labels={{
          submitting: t1('add_more'),
        }}
        examTemplateExists={!!examRoundInfo.template_iid}
        requestSuccessful={() => {
          if (typeof handleCloseDialog === 'function') {
            handleCloseDialog();
          }
          if (examRoundInfo.iid && !examRoundInfo.template_iid) {
            this.refetchExamRoud();
          }
          this.refetchNodeToEdit();
        }}
        formid="add_exam_form_template"
      />
    );
  };

  render() {
    const {
      ntype,
      displayType,
      searchWhenActivated,
      options,
      pNtype,
    } = this.props;

    const { autoSearchWhenStart } = this.state;
    const subType = this.getSubType(this.props);

    if (subType === 'import' && ntype === ntypes.QUESTION) {
      return this.elementImportQuestions();
    } else if (subType === 'exam-by-template') {
      return this.elementAddExamFromTemplate();
    }

    let step = '';
    if (['path', 'syllabus'].includes(ntype) && subType) step = subType;

    if (displayType === 'view_bank' || displayType === 'search_only') {
      return <Search {...this.props} autoSearchWhenStart />;
    }

    if (get(options, 'mode') === 'edit') {
      if (['rubric', 'pmd_rubric'].includes(get(options, 'node.type')))
        step = 'edit_rubric';
      return this.elementNewBank({ ntype, subType, step, ...options });
    }

    if (!this.shouldShowBankTab(this.props)) {
      if (['rubric', 'pmd_rubric'].includes(subType)) {
        step = 'new_rubric';
      }
      return this.elementNewBank({ ntype, subType, step, pNtype });
    }

    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.selectedTab}>
          <Tab
            value="new"
            label={tabTitle(ntype, subType)}
            buttonStyle={tabButtonStyle}
          >
            {this.elementNewBank({ ntype, subType, step, pNtype })}
          </Tab>
          <Tab /* this Bank component appears in the /admin/dev as well */
            value="bank"
            label={t1('choose_from_bank')}
            onActive={() => {
              if (searchWhenActivated)
                this.setState({ autoSearchWhenStart: true });
            }}
            buttonStyle={tabButtonStyle}
          >
            {(autoSearchWhenStart || !searchWhenActivated) && (
              <Search
                {...this.props}
                autoSearchWhenStart={autoSearchWhenStart}
              />
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

NodeBankDialog.propTypes = {
  ntype: PropTypes.string,
  displayType: PropTypes.string,
  searchWhenActivated: PropTypes.bool,
};

NodeBankDialog.defaultProps = {
  ntype: 'syllabus',
  displayType: null,
  searchWhenActivated: true,
};

const mapStateToProps = createSelector(
  (state) => get(state, 'domainInfo.conf.rubric_type_enable'),
  (state) => get(state, 'domainInfo.conf.rubric_sub_types_enable'),
  (state) => state.tree,
  (state, props) => get(props, 'editingItemIid'),
  (state, props) => get(props, 'subType'),
  (rubricTypeEnables, rubricSubTypeEnables, nodes, syllabusIid, subType) => {
    // TODO: xem lai logic nay
    if (subType !== 'exam-by-template' || !syllabusIid) {
      return { rubricTypeEnables, rubricSubTypeEnables };
    }

    const iid = get(nodes, `${syllabusIid}.exam_round_iid`);
    const ntype = get(nodes, `${iid}.ntype`);
    const template_iid = get(nodes, `${iid}.exam_template.[0].iid`);

    const examRoundInfo = {
      iid,
      ntype,
      template_iid,
    };

    return {
      examRoundInfo,
      rubricTypeEnables,
      rubricSubTypeEnables,
    };
  },
);

export default connect(mapStateToProps)(withSchoolConfigs(NodeBankDialog));
