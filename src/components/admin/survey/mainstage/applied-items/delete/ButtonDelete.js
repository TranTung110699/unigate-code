import React, { Component } from 'react';
import sApiUrls from 'components/admin/survey/endpoints';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';

class ButtonDelete extends Component {
  render() {
    const { searchFormId, item } = this.props;
    return (
      <DeleteBtn
        alternativeApi={sApiUrls.remove_survey_applied_item}
        formid={searchFormId}
        ntype="survey_applied_item"
        itemId={item.id}
        al
      />
    );
  }
}

export default ButtonDelete;
