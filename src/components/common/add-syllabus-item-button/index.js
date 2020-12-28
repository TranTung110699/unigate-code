import React from 'react';
import './stylesheet.scss';
import Icon from 'components/common/Icon';

class AddSyllabusItem extends React.Component {
  render() {
    const { className, isDepth, fullwidth, icon, label, onClick } = this.props;
    return (
      <button
        {...this.props}
        className={`NEW_UI_JULY_2019-add-syllabus-item-btn ${className} add-syllabus-item
          ${isDepth ? 'add-syllabus-item-depth' : 'add-syllabus-item-notdepth'}
          ${fullwidth ? 'w-100' : ''}
          `}
        onClick={onClick}
      >
        {icon || <Icon icon="plus" />}&nbsp;
        {label}
      </button>
    );
  }
}

export default AddSyllabusItem;
