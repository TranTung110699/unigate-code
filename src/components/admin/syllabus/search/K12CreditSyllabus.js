import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { t, t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { Link } from 'react-router-dom';
import routes from 'routes';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import Html from 'components/common/html';
import { schoolTypes, syllabusSubTypes } from 'configs/constants';
import lGet from 'lodash.get';
import { getConf } from 'utils/selectors/index';
import {
  allCreditSyllabusesAreOnlineOnly,
  creditSyllabusHasTags,
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  enableScorm,
} from 'common/conf';
import ShowMore from 'components/common/html/ShowMoreCategories';
import UpdateForm from '../new/Form';
import Status from 'components/common/Status';

class Results extends Component {
  actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };
  actionToggleDataSet = { on: 'activated', off: 'closed' };

  deepCloneSuccessFul = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_credit')}
        node={item}
        step="credit"
        formid="edit_credit"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_syllabus'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  showCategoriesList = (list) => {
    if (Array.isArray(list))
      return list.map((category) => <Html content={category.name} />);
    return null;
  };
  showCategoriesListMore = (list) => {
    if (Array.isArray(list)) {
      if (list.length <= 2) {
        return this.showCategoriesList(list);
      }
      return <ShowMore items={list} />;
    }
    return null;
  };
  render() {
    const {
      items,
      formid,
      ntype,
      readOnly,
      schoolType,
      academicCategoriesEnabled,
      renderResultActions,
      isRoot,
      enableScormConfig,
      allCreditSyllabusesAreOnlineOnlyConfig,
      creditSyllabusHasTopEquivalentPositionCodeConfig,
      creditSyllabusLevelsConfig,
      creditSyllabusHasTagsConfig,
      ntypesDeepCloneEnable,
    } = this.props;

    const hideActionToSupportSearchInputAutoComplete =
      this.props.hideActionToSupportSearchInputAutoComplete || false;

    const isSIS = schoolType && schoolType === schoolTypes.SIS;

    const width = {
      code: '5%',
      staff: '5%',
      grade: '5%',
      online_only: '5%',
      job_position_codes: '5%',
      category: '10%',
      name: academicCategoriesEnabled ? '10%' : '20%',
      subType: '5%',
      organizations: '5%',
      prerequisites: isSIS ? '10%' : '5%',
      // equivalent_credits: '10%',
      credit: '5%',
      hours: '5%',
      status: '5%',
      action: '15%',
    };

    if (hideActionToSupportSearchInputAutoComplete) {
      width.action = '5%';
    }

    const label = {
      iid: t1('iid'),
      name: t1('name'),
      staff: t1('staff'),
      online_only: t1('learning_type'),
      subType: t1('sub_type'),
      code: t1('code'),
      category: t1('syllabus_category'),
      credit: t1('credits'),
      validFrom: t1('valid_from'),
      validTo: t1('valid_to'),
      organizations: t1('organizations'),
      prerequisites: t1('prerequisites'),
      status: t1('status'),
      action: t1('action'),
      editSyllabus: t1('edit_syllabus_label'),
      remove: t1('remove'),
      equivalent_credits: t1('equivalent_credits'),
      grade: t1('syllabus_grade'),
      job_position_codes: t1('job_position'),
    };

    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              {/*
              <TableHeaderColumn width={width.iid}>{label.iid}</TableHeaderColumn>
              */}
              <TableHeaderColumn width={width.code}>
                {label.code}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.name}>
                {label.name}
              </TableHeaderColumn>
              {enableScormConfig && (
                <TableHeaderColumn width={width.subType}>
                  {label.subType}
                </TableHeaderColumn>
              )}
              {creditSyllabusLevelsConfig && (
                <TableHeaderColumn width={width.grade}>
                  {label.grade}
                </TableHeaderColumn>
              )}
              {creditSyllabusHasTopEquivalentPositionCodeConfig && (
                <TableHeaderColumn width={width.job_position_codes}>
                  {label.job_position_codes}
                </TableHeaderColumn>
              )}
              {academicCategoriesEnabled && (
                <TableHeaderColumn width={width.category}>
                  {label.category}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn width={width.credit}>
                {t('subject_credits')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.credit}>
                {t1('rubrics')}
              </TableHeaderColumn>
              ,
              {/*
                <TableHeaderColumn >{label.equivalent_credits}</TableHeaderColumn>
              */}
              <TableHeaderColumn width={width.status}>
                {label.status}
              </TableHeaderColumn>
              ,
              {!readOnly && (
                <TableHeaderColumn width={width.action}>
                  {label.action}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  {/*
                    <TableRowColumn width={width.iid} >
                      {item.iid}
                    </TableRowColumn>
                  */}
                  <TableRowColumn width={width.code}>
                    <Link
                      to={routes.url('edit_item', {
                        base: '',
                        item: {
                          ntype: 'syllabus',
                          iid: item.iid,
                          type: 'credit',
                        },
                      })}
                    >
                      {item.code}
                    </Link>

                    {item.is_clone ? (
                      <div>
                        <span className="text-muted">
                          ({t('clone_of')} #{item.clone_from})
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </TableRowColumn>
                  <TableRowColumn width={width.name} title={item.name}>
                    <Link
                      to={routes.url('edit_item', {
                        base: '',
                        item: {
                          ntype: 'syllabus',
                          iid: item.iid,
                          type: 'credit',
                        },
                      })}
                    >
                      {item.name}
                    </Link>
                    {item.tags && item.tags.length && (
                      <div className="text-muted">{item.tags.join(', ')}</div>
                    )}
                  </TableRowColumn>
                  {enableScormConfig && (
                    <TableRowColumn width={width.subType}>
                      {item.sub_type === syllabusSubTypes.SYLLABUS_SCORM &&
                        'SCORM'}
                    </TableRowColumn>
                  )}
                  {creditSyllabusLevelsConfig && (
                    <TableRowColumn width={width.grade}>
                      {item.grade ? item.grade : '-'}
                    </TableRowColumn>
                  )}
                  {creditSyllabusHasTopEquivalentPositionCodeConfig && (
                    <TableRowColumn width={width.job_position_codes}>
                      {item.job_position_codes &&
                        item.job_position_codes.length &&
                        item.job_position_codes.join(',')}
                    </TableRowColumn>
                  )}
                  {academicCategoriesEnabled && (
                    <TableRowColumn width={width.category}>
                      {this.showCategoriesListMore(
                        item.detail_academic_categories,
                      )}
                    </TableRowColumn>
                  )}
                  <TableRowColumn width={width.credit}>
                    {item.credit}
                  </TableRowColumn>
                  <TableRowColumn width={width.hours}>
                    <Link to={`/admin/credit/${item.iid}/rubric`}>
                      {item.rubric ? (
                        <div>
                          <IconButton
                            title={t1('rubric')}
                            iconClassName="mi mi-star"
                          />
                          <br />
                          {t1('rubrics')}
                        </div>
                      ) : (
                        '-'
                      )}
                    </Link>
                  </TableRowColumn>
                  ,
                  <TableRowColumn width={width.status}>
                    <Status status={item.status} />
                  </TableRowColumn>
                  ,
                  {!readOnly && (
                    <TableRowColumn width={width.action}>
                      {renderResultActions
                        ? renderResultActions(item)
                        : [
                            <Link
                              to={routes.url('edit_item', {
                                base: '',
                                mode: 'edit',
                                item: {
                                  ntype: 'syllabus',
                                  iid: item.iid,
                                  type: 'credit',
                                },
                              })}
                            >
                              <IconButton
                                title={label.editSyllabus}
                                iconClassName="mi mi-edit"
                              />
                            </Link>,
                            <DeleteItem
                              title={label.remove}
                              textConfirm={textConfirm}
                              formid={formid}
                              ntype={ntype}
                              itemId={item.id}
                            />,
                          ]}
                    </TableRowColumn>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => ({
  schoolType: lGet(state, 'domainInfo.school.type'),
  ntypesDeepCloneEnable:
    lGet(state, 'domainInfo.conf.ntypes_deep_clone_enable') || [],
  enableScormConfig: enableScorm(state.domainInfo),
  allCreditSyllabusesAreOnlineOnlyConfig: allCreditSyllabusesAreOnlineOnly(
    state.domainInfo,
  ),
  creditSyllabusHasTopEquivalentPositionCodeConfig: creditSyllabusHasTopEquivalentPositionCode(
    state.domainInfo,
  ),
  creditSyllabusLevelsConfig: creditSyllabusLevels(state.domainInfo),
  creditSyllabusHasTagsConfig: creditSyllabusHasTags(state.domainInfo),
  isRoot: lGet(state, 'domainInfo.isRoot'),
  academicCategoriesEnabled: getConf(state).academic_categories_enabled,
});

export default connect(mapStateToProps)(Results);
