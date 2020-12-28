import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import Search from 'components/admin/invite/search/Layout';

class Button extends Component {
  renderFull = ({ closeDialog }) => {
    const { item } = this.props;
    return (
      <Search
        node={item}
        hiddenFields={{
          items: [item],
        }}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { item } = this.props;
    return (
      <a onClick={showFull}>
        {item.name}
        &nbsp;
        <span className="text-muted">{item.iid}</span>
      </a>
    );
  };

  dialogOptionsProperties = () => ({
    title: t1('students_in_%s', lodashGet(this.props.item, 'name')),
    width: '80%',
  });

  render() {
    return (
      <DetailOnDialog
        dialogOptionsProperties={this.dialogOptionsProperties()}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default Button;
