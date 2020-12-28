/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import FlatButton from 'components/common/mui/NewButton';
import IconNew from 'material-ui/svg-icons/av/library-add';
import NodeNew from 'components/admin/node/new';
import paperSchema from 'components/admin/contest/paper/schema/form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleCloseDialog = () => {
    const { dispatch } = this.props;
    const dialogKey = 'generate_paper';

    dispatch(actions.handleOpenDialog({ openDialog: false }, dialogKey));
  };

  handleOnClick = () => {
    const {
      dispatch,
      formid,
      hiddenFields,
      generatePaperSuccessful,
    } = this.props;

    // const node = { number_of_original_sco_exams: this.props.examScosCount };

    const contentDialog = (
      <NodeNew
        mode="new"
        ntype="paper"
        closeModal
        schema={paperSchema}
        searchFormId="paper_search"
        formid={formid}
        requestSuccessful={() => {
          this.handleCloseDialog();
          if (generatePaperSuccessful) {
            generatePaperSuccessful();
          }
        }}
        hiddenFields={hiddenFields}
      />
    );
    const title = t1('generate_paper');
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title,
    };

    const dialogKey = 'generate_paper';
    dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }, dialogKey),
    );
  };

  render() {
    return (
      <FlatButton
        icon={<IconNew />}
        label={t1('generate_paper')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
