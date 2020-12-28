import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/avatar';

import { categoryRelationTypes } from 'configs/constants';
import { getUrl } from 'routes/links/common';
import DetailOnDialog from 'components/common/detail-on-dialog';
import GroupSeniorResults from './GroupSeniorResults';
import AdmissionsGroupResults from './AdmissionGroupResults';
import IconButton from 'material-ui/IconButton';
import categoryUserSchema from 'components/admin/group/schema/category-user-form';
import NodeNew from 'components/admin/node/new';

const urlUpdateInfo = '/category/api/update-other-info-for-user-in-category';

class ResultsSis extends Component {
  constructor(props) {
    super(props);
  }

  updateOtherInformation = (
    step = 'note',
    user = {},
    otherInformation = {},
    renderPreview = null,
  ) => {
    const { group } = this.props;
    const hiddenFields = {
      user_iid: user.iid,
      group_iid: group.iid,
      other_information: otherInformation,
    };
    return (
      <DetailOnDialog
        renderPreview={
          renderPreview ||
          (({ showFull }) => (
            <IconButton
              title={t1('edit_note')}
              iconClassName="mi mi-edit"
              onClick={showFull}
            />
          ))
        }
        renderFull={({ closeDialog }) => {
          return (
            <NodeNew
              schema={categoryUserSchema}
              hiddenFields={hiddenFields}
              mode={'edit'}
              step={step}
              alternativeApi={urlUpdateInfo}
              node={user}
              formid={`edit_${step}`}
              requestSuccessful={closeDialog}
              searchFormId={this.props.formid}
            />
          );
        }}
      />
    );
  };

  render() {
    const { items, itemList, checkKey, keysSave, group } = this.props;

    const isScholarshipGroup =
      group &&
      group.type &&
      group.type === categoryRelationTypes.SCHOLARSHIP_CATEGORY;

    if (
      [
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.FINISHING_SENIOR,
      ].includes(group && group.type)
    ) {
      return (
        <GroupSeniorResults
          {...this.props}
          updateOtherInformation={this.updateOtherInformation}
        />
      );
    } else if (
      [
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.EXPULSION_GROUP,
      ].includes(group && group.type)
    ) {
      return (
        <AdmissionsGroupResults
          {...this.props}
          updateOtherInformation={this.updateOtherInformation}
        />
      );
    }

    return (
      <Table
        name="targets"
        itemList={itemList}
        checkKey={checkKey}
        keysSave={keysSave}
        multiSelectable={!isScholarshipGroup}
      >
        <TableHeader
          enableSelectAll={!isScholarshipGroup}
          displaySelectAll={!isScholarshipGroup}
        >
          <TableRow>
            <TableHeaderColumn title={t1('code')}>
              {t1('code')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('name')}>
              {t1('name')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('email')}>
              {t1('email')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('phone_number')}>
              {t1('phone_number')}
            </TableHeaderColumn>
            {isScholarshipGroup && (
              <TableHeaderColumn title={t1('current_semesters')}>
                {t1('current_semesters')}
              </TableHeaderColumn>
            )}
            <TableHeaderColumn title={t1('action')}>
              {t1('action')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={!isScholarshipGroup}
          deselectOnClickaway={false}
          showRowHover
          stripedRows
        >
          {items &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableRowColumn>
                  <Link to={getUrl('admin_view_student', item)}>
                    {item.code}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <Avatar user={item} size={30} />
                  &nbsp; {item.name}{' '}
                  <span className="text-muted">{item.iid}</span>
                </TableRowColumn>
                <TableRowColumn>{item.mail}</TableRowColumn>,
                <TableRowColumn>{item.phone}</TableRowColumn>
                {isScholarshipGroup && (
                  <TableRowColumn>
                    {Array.isArray(item && item.other_information) &&
                      item.other_information.length > 0 && (
                        <div>
                          {item.other_information.map((otherInfo) => (
                            <div>
                              <div>
                                {otherInfo &&
                                  otherInfo.semesterObject &&
                                  t1('semester:_%s', [
                                    otherInfo.semesterObject.name,
                                  ])}
                              </div>
                              <div
                                className={`${
                                  isScholarshipGroup ? 'text-muted' : ''
                                }`}
                              >
                                <div>
                                  {otherInfo &&
                                    otherInfo.majorObject &&
                                    t1('major:_%s', [
                                      otherInfo.majorObject.name,
                                    ])}
                                </div>
                                <div>
                                  {otherInfo &&
                                    otherInfo.training_mode &&
                                    t1('training_mode:_%s', [
                                      t1(otherInfo.training_mode),
                                    ])}
                                </div>
                                <div>
                                  {otherInfo &&
                                    otherInfo.training_level &&
                                    t1('training_level:_%s', [
                                      t1(otherInfo.training_level),
                                    ])}
                                </div>
                                <div>
                                  {otherInfo &&
                                    otherInfo.icoObject &&
                                    t1('ico:_%s', [otherInfo.icoObject.name])}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </TableRowColumn>
                )}
                <TableRowColumn>
                  {this.props.renderActionCell
                    ? this.props.renderActionCell(item)
                    : null}
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

ResultsSis.propTypes = {
  form: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

ResultsSis.defaultProps = {
  form: '',
  items: [],
};

export default ResultsSis;
