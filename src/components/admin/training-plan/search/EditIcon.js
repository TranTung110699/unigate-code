import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Detail from '../edit';
import { t1 } from 'translate';

class EditIcon extends React.PureComponent {
  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <a onClick={showFull}>
        <Icon icon={'edit'} title={label || t1('edit')} />
      </a>
    );
  };

  renderFull = () => {
    const { node } = this.props;
    return <Detail node={node} />;
  };

  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

EditIcon.propTypes = {
  className: PropTypes.string,
};

EditIcon.defaultProps = {
  className: '',
};

export default EditIcon;
