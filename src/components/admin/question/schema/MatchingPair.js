import React from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Addable from 'schema-form/elements/addable/Addable';
import { Element } from 'schema-form/elements';
import InputFile from 'schema-form/elements/input-file';

class MatchingPair extends React.Component {
  contentSchema = {
    name: 'content',
    multiLine: true,
    fullWidth: true,
    type: 'text',
    floatingLabelText: t1('text'),
    floatingLabelFixed: false,
    classWrapper: 'col-xs-7',
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
    classWrapper: 'col-xs-4',
  };

  findNewIdToAddToPair = (pair) => {
    let index = 1;
    const fromIndexToId = (idx) => `mp${idx}`;

    while (true) {
      if (
        pair &&
        pair.findIndex(
          (elem) => elem && String(elem.id) === String(fromIndexToId(index)),
        ) !== -1
      ) {
        index += 1;
      } else {
        break;
      }
    }
    return fromIndexToId(index);
  };

  defaultValueToAddToLeftPair = () => {
    const { lPair } = this.props;
    return {
      id: this.findNewIdToAddToPair(lPair),
    };
  };

  defaultValueToAddToRightPair = () => {
    const { rPair } = this.props;
    return {
      id: this.findNewIdToAddToPair(rPair),
    };
  };

  renderElementToAddToPair = ({ index, total, defaultValue }) => (
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
              <div>{t1('items_and_their_match')}</div>
              <div style={{ fontSize: 13 }}>
                (
                {t1(
                  '2_items_in_the_same_row_will_form_a_pair._If_the_number_of_rows_in_2_sides_are_different_the_extra_items_will_go_alone',
                )}
                )
              </div>
            </div>
            <div className="col-xs-6">
              <Addable
                name={'l_pair'}
                defaultValueToAdd={this.defaultValueToAddToLeftPair}
                renderElementToAdd={this.renderElementToAddToPair}
              />
            </div>
            <div className="col-xs-6">
              <Addable
                name={'r_pair'}
                defaultValueToAdd={this.defaultValueToAddToRightPair}
                renderElementToAdd={this.renderElementToAddToPair}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MatchingPair.propTypes = {
  className: PropTypes.string,
};

MatchingPair.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const lPair = formValueSelector(props.formid)(state, 'l_pair');
  const rPair = formValueSelector(props.formid)(state, 'r_pair');

  return {
    lPair,
    rPair,
  };
};

export default connect(mapStateToProps)(MatchingPair);
