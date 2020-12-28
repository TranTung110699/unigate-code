import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import File from './File';
import Dir from './Dir';

class Info extends React.Component {
  render() {
    const { className, items } = this.props;
    if (!Array.isArray(items) || items.length === 0) {
      return <div className={className}>{t1('no_item_selected')}</div>;
    }
    if (items.every((item) => item && item.type === 'directory')) {
      return <Dir className={className} dirs={items} />;
    }
    if (items.every((item) => item && item.type === 'file')) {
      return <File className={className} files={items} />;
    }
    return (
      <div className={className}>{t1('%s_items_selected', [items.length])}</div>
    );
  }
}

Info.propTypes = {
  className: PropTypes.string,
};

Info.defaultProps = {
  className: '',
};

export default Info;
