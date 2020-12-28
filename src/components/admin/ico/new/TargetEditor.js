/**
 * Created by vohung on 21/08/2017.
 */

import React from 'react';
import { t, t1 } from 'translate';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import { targetType } from 'configs/constants';
import 'components/admin/invite/new/stylesheet.scss';

const style = {
  height: 'auto',
  width: '100%',
  margin: 5,
  padding: 10,
  display: 'inline-block',
};

class TargerEditor extends React.Component {
  render() {
    const { value, index, onDelete } = this.props;
    const name = t('%s - %s (%s credits)', [
      value.code,
      value.name,
      value.credit,
    ]);
    return (
      <Paper style={style} zDepth={2}>
        <div className="action-wrapper">
          <IconDelete
            onClick={() => {
              if (onDelete) {
                onDelete(value, index);
              }
            }}
            style={{
              position: 'absolute',
              right: -5,
              top: -5,
              width: 25,
              height: 25,
            }}
          />
        </div>
        <div>
          <div className="col-xs-8 name">{name}</div>
          <div className="col-xs-4">
            {value && value.type === targetType.USER_GROUP && (
              <Checkbox
                name="future_add"
                label={t1('future_add')}
                title={`${t1('future_add')}: (${t(
                  'tick_if_the_invited_new_member_must_learn_the_courses',
                )})`}
              />
            )}
          </div>
        </div>
      </Paper>
    );
  }
}

TargerEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

TargerEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default TargerEditor;
