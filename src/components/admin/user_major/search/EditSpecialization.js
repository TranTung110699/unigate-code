import React from 'react';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import FlatButton from 'components/common/mui/FlatButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import NodeNew from 'components/admin/node/new';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Icon from 'components/common/Icon';
import DetailOnDialog from '../../../common/detail-on-dialog';
import { editSpecializationSchema } from '../schema/form';

class EditSpecialization extends React.PureComponent {
  formEditSpecialization = (closeDialog) => {
    const { searchFormid, node } = this.props;

    const submitButton =
      Array.isArray(lodashGet(node, 'specialization')) &&
      lodashGet(node, 'specialization').length ? (
        <div className="text-center">
          <DeleteItem
            raisedButton
            noConfirm
            className="m-l-10 m-r-10"
            label={t1('remove')}
            labelPosition="after"
            secondary
            alternativeApi={'/user-major/update'}
            step={'specialization'}
            ntype={'user_major'}
            itemId={node.id}
            formid={searchFormid}
            onRequestSuccessful={closeDialog}
          />
          <RaisedButton
            className="m-l-10 m-r-10"
            icon={<Icon icon="create" />}
            label={t1('update')}
            primary
            type="submit"
          />
        </div>
      ) : null;

    return (
      <NodeNew
        resetForm
        ntype="user_major"
        mode="edit"
        step="specialization"
        node={node}
        schema={editSpecializationSchema(node)}
        formid="register_specialization"
        submitButton={submitButton}
        searchFormId={searchFormid}
        requestSuccessful={closeDialog}
      />
    );
  };

  render() {
    const { specialization, specializations } = this.props.node;

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => {
          const tmp =
            (Array.isArray(specialization) &&
              Array.isArray(specializations) &&
              specializations.filter((row) =>
                specialization.includes(row.iid),
              )) ||
            [];

          return [
            tmp.length > 0 && tmp.map((row) => row.name).join(','),
            <FlatButton
              label={tmp.length ? null : t1('add_specializations')}
              labelPosition="after"
              primary
              onClick={showFull}
              icon={<Icon icon="edit" />}
            />,
          ];
        }}
        renderFull={({ closeDialog }) =>
          this.formEditSpecialization(closeDialog)
        }
      />
    );
  }
}

export default EditSpecialization;
