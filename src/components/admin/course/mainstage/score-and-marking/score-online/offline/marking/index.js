import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Full from './full';
import './stylesheet.scss';

class Marking extends React.Component {
  cssClass = 'admin-course-offline-exam-marking';

  renderFull = ({ closeDialog }) => {
    const { searchFormId } = this.props;
    return <Full searchFormId={searchFormId} {...this.props} />;
  };

  render() {
    const { label } = this.props;

    return (
      <DetailOnDialog
        textPreview={label}
        renderFull={this.renderFull}
        dialogOptionsProperties={{
          width: '1350px',
        }}
      />
    );
  }
}

Marking.propTypes = {
  className: PropTypes.string,
};

Marking.defaultProps = {
  className: '',
};

export default Marking;
