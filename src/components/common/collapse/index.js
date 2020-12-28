import React from 'react';
import { List, ListItem } from 'material-ui/List';
import './stylesheet.scss';

class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOpen: [],
    };
  }

  handleOpenNestedItems = (item, index) => {
    const { multipleOpen } = this.props;

    let indexOpen = Array.isArray(this.state.indexOpen)
      ? this.state.indexOpen
      : [];
    if (!item.state.open) {
      indexOpen = indexOpen.filter((i) => i !== index);
    } else if (multipleOpen) {
      indexOpen.push(index);
    } else {
      indexOpen = [index];
    }

    this.setState({ indexOpen });
  };

  render() {
    const {
      className,
      items,
      multipleOpen,
      floatingLabelText,
      primaryTogglesNestedList,
    } = this.props;

    const { indexOpen } = this.state;

    return (
      <List className={`${className} collapse`}>
        {floatingLabelText && <h3>{floatingLabelText}</h3>}
        {Array.isArray(items) &&
          items.map(
            (
              {
                content,
                primaryText,
                secondaryText,
                open,
                handlePrimaryTogglesNestedList,
              },
              index,
            ) => {
              const contentEl = indexOpen.includes(index) && content && (
                <div key={`content-collapse-item-${index}`}>{content}</div>
              );

              return [
                <ListItem
                  className={`collapse-item ${
                    indexOpen.includes(index) && !multipleOpen ? 'active' : ''
                  }`}
                  key={`collapse-item-${index}`}
                  open={indexOpen.includes(index)}
                  primaryTogglesNestedList={
                    primaryTogglesNestedList ||
                    (typeof handlePrimaryTogglesNestedList === 'function' &&
                      handlePrimaryTogglesNestedList(indexOpen.includes(index)))
                  }
                  onNestedListToggle={(item) =>
                    this.handleOpenNestedItems(item, index)
                  }
                  nestedItems={[<ListItem className="collapse-item-default" />]}
                  primaryText={
                    typeof primaryText === 'function'
                      ? primaryText(indexOpen.includes(index))
                      : primaryText
                  }
                  secondaryText={
                    typeof secondaryText === 'function'
                      ? secondaryText(indexOpen.includes(index))
                      : secondaryText
                  }
                />,
                contentEl,
              ].filter(Boolean);
            },
          )}
      </List>
    );
  }
}

export default Collapse;
