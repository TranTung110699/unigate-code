import React from 'react';
import ActionToggle from 'components/common/toggle/ActionToggle';
import TwoSideToggle from 'schema-form/elements/toggle/TwoSideToggle';

class SwitchControls extends React.Component {
  render() {
    const { items, node } = this.props;

    if (!items) {
      return null;
    }

    return (
      <div>
        {items.map((switchControl, i) => {
          if (switchControl.hidden) {
            return null;
          }

          let content = null;
          if (switchControl.component) {
            content = switchControl.component;
          } else if (switchControl.componentType === 'TwoSideToggle') {
            content = (
              <TwoSideToggle
                onLabel={switchControl.onLabel}
                offLabel={switchControl.offLabel}
                toggled={switchControl.toggled}
                onToggle={switchControl.onToggle}
              />
            );
          } else {
            content = (
              <ActionToggle
                node={node}
                key={`left-switch-menu_${i}`}
                baseURL={switchControl.baseURL}
                value={switchControl.value}
                dataSet={switchControl.dataSet}
                labelSet={switchControl.labelSet}
                name={switchControl.name}
                label={switchControl.label}
                handleChange={switchControl.handleChange}
                confirmToChange={switchControl.confirmToChange}
              />
            );
          }

          return <div className="m-r-20 m-b-10">{content}</div>;
        })}
      </div>
    );
  }
}

export default SwitchControls;
