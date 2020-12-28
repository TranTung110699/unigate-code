import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';
import Select from './select';

class SelectItemsToInviteElement extends React.Component {
  renderResultComponent = (items) => {
    const { fieldName, selectedItems, setValue } = this.props;
    return (
      <Select
        fieldName={fieldName}
        selectedItems={selectedItems}
        setValue={setValue}
        items={items}
      />
    );
  };

  render() {
    const { group } = this.props;
    return (
      <SearchWrapper
        formid="invited_items_of_group_search"
        renderNoResultComponent={() => (
          <h3>{t1('there_are_no_invited_items_for_this_group')}</h3>
        )}
        hiddenFields={{
          iid: group && group.iid,
        }}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

SelectItemsToInviteElement.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  group: PropTypes.shape(),
  selectedItems: PropTypes.arrayOf(PropTypes.shape()),
  setValue: PropTypes.func,
};

SelectItemsToInviteElement.defaultProps = {
  className: '',
  fieldName: '',
  group: null,
  selectedItems: [],
  setValue: () => {},
};

export default SelectItemsToInviteElement;
