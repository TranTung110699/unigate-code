import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import SurveySearchForm from 'components/admin/survey/search';
import RaisedButton from 'components/common/mui/RaisedButton';

class ResultActions extends React.Component {
  render() {
    const { onAddChip } = this.props;
    return (
      <SurveySearchForm
        {...this.props}
        resultReadOnly
        renderActionCell={(item) =>
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
