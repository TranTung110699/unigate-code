import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import { timestampToDateTimeString } from 'common/utils/Date';
import Form from './Form';
import './stylesheet.scss';

class MetaDataTimeRange extends React.Component {
  cssClass = 'meta-data-time-range';

  handleFormSubmit = (values) => {
    const { onChangeFinished } = this.props;
    if (typeof onChangeFinished === 'function') {
      onChangeFinished(values);
    }
  };

  handleEditButtonClick = () => {
    const { item, dispatch } = this.props;
    const formName = `time_range_${item && item.iid ? item.iid : ''}`;
    const contentDialog = (
      <Form
        item={item}
        form={formName}
        initialValues={{
          start_time: item.start_time,
          end_time: item.end_time,
        }}
        onSubmit={(values) => {
          dispatch(actions.handleOpenDialog({ openDialog: false }));
          this.handleFormSubmit(values);
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('edit'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, item, readOnly } = this.props;
    const Component = readOnly
      ? (props) => <span {...props} />
      : ({ children, ...props }) => (
          <a {...props} href="#" onClick={this.handleEditButtonClick}>
            {children}
          </a>
        );

    return (
      <Component className={`${className || ''} ${this.cssClass}`}>
        <span
          className={`${this.cssClass}__content ${
            readOnly ? '' : `${this.cssClass}__content--editable`
          }`}
        >
          {item.start_time
            ? [
                <span
                  key={`${item.iid}_start_time_label`}
                  className={`${this.cssClass}__title\
                  ${this.cssClass}__title--first`}
                >
                  {t1('start_time')}:
                </span>,
                <span
                  key={`${item.iid}_start_time_value`}
                  className={`${this.cssClass}__value`}
                >
                  {timestampToDateTimeString(item.start_time)}
                </span>,
              ]
            : null}
          {item.end_time
            ? [
                <span
                  key={`${item.iid}_end_time_label`}
                  className={`${this.cssClass}__title\
                  ${item.start_time ? '' : `${this.cssClass}__title--first`}`}
                >
                  {t1('end_time')}:
                </span>,
                <span
                  key={`${item.iid}_end_time_value`}
                  className={`${this.cssClass}__value`}
                >
                  {timestampToDateTimeString(item.end_time)}
                </span>,
              ]
            : null}
          {!item.start_time && !item.end_time && t1('no_time_restriction')}
        </span>
      </Component>
    );
  }
}

MetaDataTimeRange.propTypes = {
  className: PropTypes.string,
};

MetaDataTimeRange.defaultProps = {
  className: '',
};

export default connect()(MetaDataTimeRange);
