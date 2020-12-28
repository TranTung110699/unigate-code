import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import actions from 'actions/node/creators';
import { filterObjectKeys } from 'common/utils/object';

const addUsersToFieldInvite = t1('add_user');

const resultWrapper = (ResultsComponent) => {
  class WrappedResults extends React.Component {
    addUsersSelectedToField = () => {
      const { users, dispatch } = this.props;
      this.addUsersToField(users);

      dispatch(actions.handleOpenDialog({ openDialog: false }));
    };

    addUsersToField = (users) => {
      const { onAddChip, onAdd, tableKeysSave } = this.props;
      users = users && users.map((u) => filterObjectKeys(u, tableKeysSave));

      if (onAddChip) {
        users.forEach((user) => {
          onAddChip({
            key: user.name,
            data: {
              ...user,
              type: 'user',
            },
          });
        });
      } else if (onAdd) {
        onAdd(users);
      }
    };

    render() {
      const { items, formid, checkKey, tableKeysSave } = this.props;

      return (
        <div className="table-result">
          <ResultsComponent
            formid={formid}
            items={items}
            checkKey={checkKey}
            keysSave={tableKeysSave}
            multiSelectable
            addUsersToField={this.addUsersToField}
          />
          <div className="m-t-25">
            <RaisedButton
              name="add_user_to_group"
              id="add_user_to_group"
              label={addUsersToFieldInvite}
              onClick={() => this.addUsersSelectedToField()}
              primary
            />
          </div>
        </div>
      );
    }
  }

  WrappedResults.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
  };

  WrappedResults.defaultProps = {
    items: [],
  };

  function mapStateToProps(state, props) {
    const { formid } = props;
    const result = state.searchResults[formid] || {};
    const users = result.selectedItems || [];
    return {
      users,
    };
  }

  return connect(mapStateToProps)(WrappedResults);
};

export default resultWrapper;
