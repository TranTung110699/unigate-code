import React from 'react';
import AntSubLeftMenu from 'components/common/views/ant-menu';
import './styles.scss';

class LeftAdminSubMenuPresenter extends React.Component {
  render() {
    const { schema, messages, isHashbang } = this.props;

    const mode = 'horizontal';

    // TODO: do we need to fix horizontal mode or should we improve sub menu and not have dividers at all?
    // if (mode === 'horizontal') {
    //   schema.forEach((item, i) => {
    //     if (item.divider)
    //       schema[i].dividerOrientation = 'horizontal';
    //   });
    // }

    if (!schema) return null;

    const theSchema =
      mode === 'horizontal' ? schema.filter((item) => !item.divider) : schema;

    return (
      <div
        className={`ui-admin-left-menu-panel 
          ${mode === 'horizontal' ? 'sticky-card z-index-1000' : ''}`}
      >
        <div>
          <AntSubLeftMenu
            mode={mode}
            schema={theSchema}
            messages={messages}
            isHashbang={isHashbang}
          />
        </div>
      </div>
    );
  }
}

export default LeftAdminSubMenuPresenter;
