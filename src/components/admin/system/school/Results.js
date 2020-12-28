import React, { Component } from 'react';
import { t1 } from 'translate';

import Paper from 'material-ui/Paper';
import ActionToggle from 'components/common/toggle/ActionToggle';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ApiRequestButton from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import routes from 'routes';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import AddAdmin from './add-admin';
import Motp from './motp';
import Block from './Block';
import './styles.scss';

import lodashGet from 'lodash.get';
import Warning from 'components/common/Warning';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  renderAddAdminDialog = ({ slug }) => <AddAdmin slug={slug} />;

  //
  // renderPreview = ({ showFull }) => {
  //   const { style } = this.props;
  //   return (
  //     <RaisedButton
  //       label={t1('update_survey_question_answers_in_this_row')}
  //       onClick={showFull}
  //     />
  //   );
  // };

  render() {
    const { items, formid, ntype } = this.props;
    const deleteLabel = t1('delete');
    const textDeleteConfirm = t1('are_you_sure_you_want_to_do_this');

    const blockMenus = [
      'type',
      'theme_layout',
      'allowed_languages',
      'domains',
      'admin_menu_nav',
      'config_menu_nav',
      'admission_documents',
      'modules',
      'scos_enable',
      'videos_enable',
      'asset_type_enable',
      'exercises_enable',
      'exercise_questions_enable',
      'exam_questions_enable',
      'survey_questions_enable',
      'layouts',
      'supported_learning_methods',
      'supported_request_types',
      'supported_learning_items_in_skill',
      'org_types',
      'approval_flow',
      'hrms',
    ];

    return (
      <div>
        {items &&
          items.map((item) => (
            <div key={item.id} className="schoolWrapper">
              <h1 className="heading">
                {item.name} ({item.slug})
              </h1>
              <Paper className="content">
                <b>{t1('headmaster')}</b>:
                {item &&
                  item.staff &&
                  item.staff.map((staff) => (
                    <span key={staff.id} className="p-l-15">
                      {staff.name} (iid#
                      {staff.iid})
                    </span>
                  ))}
                <div>
                  <DetailOnDialog
                    textPreview={'add_admin'}
                    renderFull={() => {
                      return this.renderAddAdminDialog({ slug: item.slug });
                    }}
                  />
                </div>
                {blockMenus.map((field) => (
                  <Block menu={field} item={item} />
                ))}
                <h2>{t1('actions')}</h2>
                <div className="action">
                  <div>
                    <ActionToggle
                      label
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'status',
                        ntype: 'school',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                    />
                  </div>
                  <div>
                    <ApiRequestButton
                      title={t1('initiate_roles')}
                      label={t1('initiate_roles')}
                      raisedButton
                      primary
                      closeModal
                      params={{
                        school_slug: item.slug,
                      }}
                      url={aApiUrls.initiate_roles}
                    />
                  </div>
                  <br />
                  <div>
                    <Motp schoolSlug={item.slug} />
                  </div>

                  <div className="m-t-50 text-right p-10">
                    <hr />
                    <Warning>
                      {t1('delete_school')}{' '}
                      <DeleteItem
                        title={deleteLabel}
                        textConfirm={textDeleteConfirm}
                        formid={formid}
                        ntype={ntype}
                        itemId={item.id}
                      />
                    </Warning>
                  </div>
                </div>
              </Paper>
            </div>
          ))}
      </div>
    );
  }
}

export default Results;
