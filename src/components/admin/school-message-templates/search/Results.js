import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { v4 } from 'uuid';

import { t1 } from 'translate';
import { getTextFromValue } from 'utils/Util';
import { constants, languages as availableLanguages } from 'configs/constants';
import apiUrls from 'api-endpoints';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import ActionSelect from 'components/common/select/ActionSelect';
import ActionToggle from 'components/common/toggle/ActionToggle';
import NodeForm from 'components/admin/message-templates/new/Form';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';

class Results extends Component {
  openDialog = (contentDialog, optionsProperties) => {
    const { dispatch } = this.props;

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleOnClickPreview = (item) => {
    const { dispatch } = this.props;
    const { tpl_action: action, method, language, template } = item;

    // Load template
    dispatch(
      sagaActions.getDataRequest(
        {
          // config
          url: apiUrls.message_template_search,
          keyState: 'message-template-content',
          executeOnSuccess: (data) => {
            const contentDialog = (
              <NodeForm
                formid="preview_school_message_template"
                mode="preview"
                node={data[0]}
                readOnly
              />
            );
            const optionsProperties = {
              handleClose: true,

              modal: true,
              title: t1('preview_message_template'),
              width: '70%',
            };

            this.openDialog(contentDialog, optionsProperties);
          },
        },
        {
          // params
          iid: template.iid,
          tpl_action: action,
          method,
          language,
          _sand_step: 'iid',
        },
      ),
    );
  };

  render() {
    const actionToggleDataSet = {
      on: 'enabled',
      off: 'disabled',
    };
    const {
      items,
      searchValues: { methods, languages },
      formid,
    } = this.props;
    const actionRowSpan = methods.length * languages.length;
    const methodRowSpan = languages.length;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('method')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('language')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('template')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('enabled')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('preview')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows={false}
          >
            {items &&
              items.filter(Boolean).map((item, index) => {
                const {
                  tpl_action: action,
                  method,
                  language,
                  template,
                  options,
                } = item;

                return (
                  <TableRow key={v4()}>
                    {index % actionRowSpan === 0 && (
                      <TableRowColumn rowSpan={actionRowSpan}>
                        {t1(action)}
                      </TableRowColumn>
                    )}
                    {index % methodRowSpan === 0 && (
                      <TableRowColumn rowSpan={methodRowSpan}>
                        {getTextFromValue(
                          method,
                          constants.communicationMethodsOptions(),
                        )}
                      </TableRowColumn>
                    )}
                    <TableRowColumn>
                      {getTextFromValue(language, availableLanguages)}
                    </TableRowColumn>
                    <TableRowColumn>
                      <ActionSelect
                        name="iid"
                        dataSet={options}
                        value={template.iid}
                        baseURL={apiUrls.school_message_templates_update(
                          action,
                          method,
                          language,
                        )}
                        hiddenParams={{
                          _sand_step: 'iid',
                        }}
                        formidSubmitOnSuccess={formid}
                        fullWidth
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <ActionToggle
                        name="status"
                        value={template.status}
                        dataSet={actionToggleDataSet}
                        baseURL={apiUrls.school_message_templates_update(
                          action,
                          method,
                          language,
                        )}
                        params={{
                          _sand_step: 'status',
                        }}
                        hideLabel
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton
                        iconClassName="mi mi-remove-red-eye"
                        onClick={() => this.handleOnClickPreview(item)}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Results;
