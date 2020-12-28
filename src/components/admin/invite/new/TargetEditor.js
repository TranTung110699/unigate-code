/**
 * Created by vohung on 21/08/2017.
 */

import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import { targetType } from 'configs/constants';
import './stylesheet.scss';

const style = {
  height: 'auto',
  width: '100%',
  margin: 5,
  padding: 10,
  display: 'inline-block',
};

class TargetEditor extends React.Component {
  render() {
    const { value, index, onDelete } = this.props;
    // console.log(value);
    const name =
      value && value.type === targetType.USER
        ? t1('user:_%s', [value.name])
        : t1('group:_%s', [value.name]);
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
        {value && value.type === targetType.USER ? (
          <div>
            <div className="col-xs-6">
              <h3>
                {value.name} <span className="text-muted">({value.iid})</span>
              </h3>
              <ul>
                {value.code && (
                  <li>
                    {' '}
                    {t1('code')}: {value.code}
                  </li>
                )}
                {value.mail && (
                  <li>
                    {t1('mail')}: {value.mail}
                  </li>
                )}
              </ul>
            </div>
            {value.majors && value.majors.length > 0 && (
              <div className="col-xs-6">{/*TODO SHOW MAJORS*/}</div>
            )}
          </div>
        ) : (
          <div>
            <div className="col-xs-6 name">{name}</div>
          </div>
        )}
      </Paper>
    );
  }
}

TargetEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

TargetEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default TargetEditor;
