import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Addable from 'schema-form/elements/addable/Addable';
import { Element } from 'schema-form/elements';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import InputFile from 'schema-form/elements/input-file';

class Reorder extends React.Component {
  contentSchema = {
    name: 'content',
    multiLine: true,
    fullWidth: true,
    type: 'text',
    floatingLabelText: t1('text'),
    floatingLabelFixed: false,
    classWrapper: 'col-xs-9',
  };

  avatarSchema = {
    type: InputFile,
    preview: 1,
    fileType: 'image',
    defaultImageStyle: '20px',
    imageStyle: '100px',
    name: 'avatar',
    hintText: t1('avatar'),
    accept: 'image/*',
    classWrapper: 'col-xs-2',
  };

  defaultValueToAddToReorders = () => {
    const { reorders } = this.props;

    let index = 1;
    const fromIndexToId = (idx) => `ro${idx}`;

    while (true) {
      if (
        reorders &&
        reorders.findIndex(
          (elem) => elem && String(elem.id) === String(fromIndexToId(index)),
        ) !== -1
      ) {
        index += 1;
      } else {
        break;
      }
    }
    return { id: fromIndexToId(index) };
  };

  renderElementToAddToReorders = ({ index, total, defaultValue }) => (
    <div className="row">
      <Element schema={this.contentSchema} />
      <Element schema={this.avatarSchema} />
    </div>
  );

  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <div className="container-fluid">
          <div className="row">
            <div style={{ paddingBottom: 10 }}>
              {t1('items_in_their_correct_order')}
            </div>
            <Addable
              name={'reorders'}
              defaultValueToAdd={this.defaultValueToAddToReorders}
              renderElementToAdd={this.renderElementToAddToReorders}
            />
          </div>
        </div>
      </div>
    );
  }
}

Reorder.propTypes = {
  className: PropTypes.string,
};

Reorder.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const reorders = formValueSelector(props.formid)(state, 'reorders');

  return {
    reorders,
  };
};

export default connect(mapStateToProps)(Reorder);
