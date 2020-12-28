import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import actions from 'actions/node/creators';

class Results extends Component {
  tableKeysSave = ['id', 'iid', 'name'];

  constructor(props) {
    super(props);
    this.addCreditToInputField = this.addCreditToInputField.bind();
    this.addCreditsToInputField = this.addCreditsToInputField.bind();
  }

  addCreditsToInputField = () => {
    const { credits, dispatch } = this.props;
    this.addCreditToInputField(credits);

    dispatch(
      actions.handleOpenDialog(
        { openDialog: false },
        'input-auto-complete-search',
      ),
    );
  };

  addCreditToInputField = (credits) => {
    const { onAddChip } = this.props;
    credits.forEach((credit) => {
      if (onAddChip) {
        onAddChip({
          key: credit.name,
          data: { ...credit },
        });
      }
    });
  };

  render() {
    const { items, formid } = this.props;
    const addCredits = t1('add_mutil_item');
    const addCredit = t1('add_item');
    const checkKey = 'id';

    return (
      <div className="table-result">
        <Table
          formid={formid}
          itemList={items}
          checkKey={checkKey}
          keysSave={this.tableKeysSave}
          multiSelectable
        >
          <TableHeader adjustForCheckbox enableSelectAll>
            <TableRow>
              <TableHeaderColumn title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('credit')}>
                {t1('credit')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {items &&
              items.map((item) => (
                <TableRow key={item.id} selected={item.selected}>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.credit}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={addCredit}
                      iconClassName="mi mi-add"
                      onClick={() => this.addCreditToInputField([item])}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="m-t-25">
          <RaisedButton
            name="add_user_to_group"
            id="add_user_to_group"
            label={addCredits}
            onClick={() => this.addCreditsToInputField()}
            primary
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

function mapStateToProps(state, props) {
  const { formid } = props;
  const result = state.searchResults[formid] || {};
  const credits = result.selectedItems || [];
  return {
    credits,
  };
}

export default connect(mapStateToProps)(Results);
