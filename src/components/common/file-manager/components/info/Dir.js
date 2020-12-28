import React from 'react';
import PropTypes from 'prop-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import { t1 } from 'translate';
import Label from './Label';

class Dir extends React.Component {
  render() {
    const { className, dirs } = this.props;
    if (!Array.isArray(dirs)) {
      return null;
    }
    if (dirs.length > 1) {
      return (
        <div className={className}>
          {t1('%s_directories_selected', [dirs.length])}
        </div>
      );
    }
    const dir = dirs[0];
    return (
      <div className={className}>
        <div>
          <Label>{t1('name')}: </Label>
          <span>{dir.name}</span>
        </div>
        <div>
          <Label>{t1('type')}: </Label>
          <span>{t1('directory')}</span>
        </div>
        <div>
          <Label>{t1('created_at')}: </Label>
          <span>{timestampToDateTimeString(dir.ts)}</span>
        </div>
        {dir.updated_ts && (
          <div>
            <Label>{t1('modified_at')}: </Label>
            <span>{timestampToDateTimeString(dir.updated_ts)}</span>
          </div>
        )}
      </div>
    );
  }
}

Dir.propTypes = {
  className: PropTypes.string,
};

Dir.defaultProps = {
  className: '',
};

export default Dir;
