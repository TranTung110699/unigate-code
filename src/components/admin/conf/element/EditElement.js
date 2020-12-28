import React from 'react';
import { reduxForm, reset } from 'redux-form';
import Toggle from 'material-ui/Toggle';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import actions from 'actions/node/creators';
import {
  convertAllowedValuesToMultiOptions,
  convertPlainArrayToSelectOptions,
} from 'common/utils/form';
import { getMenuNavOptions } from 'utils/Util';
import { Element } from 'schema-form/elements';
import Editable from 'components/common/forms/editable';
import RaisedButton from 'components/common/mui/RaisedButton';

import { allMenuItems as syllabusMenus } from 'components/admin/syllabus/edit/sub-menu-left-configs';
import { allMenuItems as courseMenus } from 'components/admin/course/edit/sub-menu-left-configs';
import { allMenuItems as contestMenus } from 'components/admin/contest/edit/sub-left-menu-configs';
import { allMenuItems as jobPositionMenus } from 'components/admin/job-position/edit/sub-left-menu-configs';
import { allMenuItems as equivalentPositionMenus } from 'components/admin/top-equivalent-position/edit/sub-left-menu-configs';
import { menuItems as pathMenus } from 'components/admin/path/edit/sub-left-menu-configs';
import { allMenuItems as reportMenus } from 'components/admin/report-teacher/menu/sub-left-menu-configs';
import { allMenuItems as examRoundMenus } from 'components/admin/contest/exam-round/menu/sub-left-menu-configs';
import { allMenuItems as examTemplateMenus } from 'components/admin/exam-template/edit/sub-left-menu-configs';
import { reportJobs } from 'components/admin/report-teacher/jobs-to-report/configs';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { menuItems as enrolmentPlanMenus } from 'components/admin/enrolment-plan/edit/sub-left-menu-configs';

import UpdateForm from '../form/Update';
import DatePicker from 'schema-form/elements/date-picker';
import InputToken from 'schema-form/elements/input-token';

const menusHash = {
  credit_menus: syllabusMenus({ ntype: 'syllabus' }),
  course_menus: courseMenus(),
  contest_menus: contestMenus(),
  job_position_menus: jobPositionMenus(),
  equivalent_position_menus: equivalentPositionMenus(),
  path_menus: pathMenus({ type: 'path' }),
  report_menus: reportMenus,
  enrolment_plan_menus: enrolmentPlanMenus(),
  list_of_jobs_to_report: reportJobs(),
  exam_round_menus: examRoundMenus(),
  exam_template_menus: examTemplateMenus(),
};

class EditElement extends React.Component {
  iconStyle = { margin: 24, fontSize: 20 };

  schema = {
    type: 'youtubeUrl',
    name: 'content',
    defaultValue: '',
  };

  formatNodeToEdit = (node = {}) => {
    if (
      node.type === 'object' &&
      typeof node.content === 'string' &&
      node.renderElementToAdd
    ) {
      node.content = JSON.parse(node.content);
    }
    return node;
  };

  editConfigValueInAForm(item) {
    const { dispatch } = this.props;

    const dialogKey = `edit_config_${lodashGet(item, 'name')}`;

    dispatch(reset(item.name));

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={item.name}
        node={this.formatNodeToEdit(item)}
        formid={item.name}
        dialogKey={dialogKey}
      />
    );

    const optionsProperties = {
      style: {
        paddingTop: 0,
      },
      repositionOnUpdate: false,

      title: item.name,
    };
    dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }, dialogKey),
    );
  }

  getOptionsRender = (type, item) => {
    let options = [];
    if (!item.allowedValues || typeof item.allowedValues === 'string') {
      const menus = menusHash[item.allowedValues || item.name];
      options = getMenuNavOptions(
        typeof menus === 'function' ? menus(this.props) : menus,
      );
    } else if (type === 'strict_array') {
      options = convertAllowedValuesToMultiOptions(item.allowedValues);
    } else if (type === 'strict_int' || type === 'strict_string') {
      options = convertPlainArrayToSelectOptions(item.allowedValues);
    }
    return options;
  };

  getContentRender = (content) =>
    Object.prototype.toString.call(content) === '[object Object]'
      ? Object.keys(content)
      : content;

  render() {
    const { onSubmit, item } = this.props;
    const maxLabelLength = 32;
    const component = item.component || item.type;

    return (
      (['boolean'].includes(component) && (
        <Toggle
          defaultToggled={!!item.content}
          onToggle={(ev, checked) => onSubmit({ content: checked ? 1 : 0 })}
        />
      )) ||
      (['text', 'string', 'colorPicker'].includes(component) && (
        <Editable
          form={item.name}
          name="content"
          maxLabelLength={maxLabelLength}
          initialValue={item.content ? item.content : '..'}
          onSubmit={onSubmit}
        />
      )) ||
      (['textarea', 'rte', 'array_of_object'].includes(component) && (
        <RaisedButton
          primary
          title={item.name}
          label={t1('edit')}
          onClick={() => this.editConfigValueInAForm(item)}
        />
      )) ||
      (['int', 'float'].includes(component) && (
        <Editable
          form={item.name}
          name="content"
          initialValue={item.content || '..'}
          type="number"
          onSubmit={onSubmit}
        />
      )) ||
      (['array'].includes(component) && (
        <Element
          schema={{
            type: InputToken,
            name: 'content',
            defaultValue: item.content,
            onChange: (ev, val) => {
              onSubmit({ content: val });
            },
          }}
        />
      )) ||
      (['object'].includes(component) && (
        <RaisedButton
          primary
          title={item.name}
          label={t1('edit_object')}
          onClick={() => this.editConfigValueInAForm(item)}
        />
      )) ||
      (['date'].includes(component) && (
        <Element
          schema={{
            type: DatePicker,
            fullWidth: true,
            defaultValue: item.content,
            onChange: (ev, val) => {
              onSubmit({ content: val });
            },
            autoOk: true,
          }}
        />
      )) ||
      (['strict_array'].includes(component) && (
        <Element
          schema={{
            type: 'multiCheckbox',
            name: 'content',
            iconStyle:
              !item.allowedValues || typeof item.allowedValues === 'string'
                ? { marginTop: 6 }
                : {},
            initialValue: this.getContentRender(item.content),
            options: this.getOptionsRender(component, item),
            onChange: (ev, val) => onSubmit({ content: val }),
          }}
        />
      )) ||
      (['strict_int', 'strict_string'].includes(component) && (
        <Element
          schema={{
            type: 'radio',
            name: 'content',
            options: this.getOptionsRender(component, item),
            onChange: (ev, val) => onSubmit({ content: val }),
          }}
        />
      )) ||
      (['youtubeUrl'].includes(component) && <Element schema={this.schema} />)
    );
  }
}

export default reduxForm({})(withSchoolConfigs(EditElement));
