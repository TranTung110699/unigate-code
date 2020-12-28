import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import 'components/admin/invite/new/stylesheet.scss';
import './stylesheet.scss';

class AssetEditor extends React.Component {
  cssClass = 'admin-asset-input-auto-complete-result-editor';

  render() {
    const { value, index, onDelete } = this.props;
    const { code, detailed_asset_category } = value;

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <div className={`${this.cssClass}__name-group`}>
            <div className={`${this.cssClass}__name`}>
              {detailed_asset_category && detailed_asset_category.name}
            </div>
            <div className={`${this.cssClass}__iid text-muted`}>({code})</div>
          </div>
        </div>
        <div className={`${this.cssClass}__delete`}>
          <IconDelete
            onClick={() => {
              if (onDelete) {
                onDelete(value, index);
              }
            }}
          />
        </div>
      </Paper>
    );
  }
}

AssetEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

AssetEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default AssetEditor;
