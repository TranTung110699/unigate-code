import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import SyllabusSearchForm from 'components/admin/syllabus/search/credit-search/CreditSearchForm';
import RaisedButton from 'components/common/mui/RaisedButton';

class ResultActions extends React.Component {
  cssClass = 'admin-credit-syllabus-selection';

  render() {
    const { onAddChip } = this.props;
    return (
      <SyllabusSearchForm
        {...this.props}
        type="credit"
        hideActionToSupportSearchInputAutoComplete={true}
        renderResultActions={(item) =>
          item && (
            <div>
              <RaisedButton
                primary
                icon={<Icon icon="add" />}
                onClick={() => onAddChip({ key: item.name, data: item })}
              />
            </div>
          )
        }
      />
    );
  }
}

ResultActions.propTypes = {
  className: PropTypes.string,
};

ResultActions.defaultProps = {
  className: '',
};

export default ResultActions;
