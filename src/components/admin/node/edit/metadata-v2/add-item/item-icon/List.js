import React, { Component } from 'react';
// import {genAddItemLabel} from 'components/admin/node/edit/metadata/add-item/labels';
// import { iconBySubtype } from 'components/admin/node/icon';
import { getLinkToAdd } from 'components/admin/node/edit/metadata/add-item/LinkItem';
import ItemIconAndLabel from './ItemIconAndLabel';
import { t1 } from 'translate';
import Widget from 'components/common/Widget';
import { withRouter } from 'react-router';
import { bankDialogTabDisplayTypes } from '../../../../bank/utils';

const groupStyles = {
  borderBottom: '1px solid white',
};

class ItemIconList extends Component {
  state = {
    active: null,
  };

  addItem = (ntype, subType) => {
    const { history, node, bankDialogTabMode } = this.props;
    const link = getLinkToAdd(node.iid, ntype, subType, bankDialogTabMode);
    history.push(link);
  };

  handleActiveItem = (subType) => {
    this.setState({
      active: subType,
    });
  };

  render() {
    const { node, childrenTypes, bankDialogTabMode } = this.props;

    // const questionIconKlass = "col-xs-2 col-xs-exercise";
    const questionIconKlass = 'col-xs-6';

    if (node.ntype == 'exercise')
      return (
        <div className="container-fluid">
          {childrenTypes.map(({ children, label }) => {
            if (Array.isArray(children) && children.length) {
              return (
                <div className="row">
                  {children.map((option) => {
                    const { ntype, subType } = option;
                    if (subType == 'import') return null;

                    return (
                      <div
                        onClick={() => {
                          this.handleActiveItem(subType);
                          this.props.onSelected(
                            ntype,
                            subType,
                            getLinkToAdd(
                              node.iid,
                              ntype,
                              subType,
                              bankDialogTabMode,
                            ),
                          );
                        }}
                        onDoubleClick={() => {
                          this.addItem(ntype, subType);
                        }}
                        className={`${questionIconKlass} ${
                          this.state.active === subType ? 'item-active' : ''
                        }`}
                      >
                        <ItemIconAndLabel
                          key={`${ntype}-${subType}`}
                          node={node}
                          ntype={ntype}
                          subType={subType}
                          onClick={() => this.handleActiveItem(subType)}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      );

    return (
      <div className="container-fluid">
        <div className="row">
          {childrenTypes.map(({ children, label }) => {
            if (Array.isArray(children) && children.length) {
              return (
                <div className="col-md-12">
                  <Widget title={label}>
                    <div className="container-fluid">
                      <div className="row">
                        {children.map((option) => {
                          const { ntype, subType } = option;
                          return (
                            <div
                              className={`col-xs-6 ${
                                this.state.active === subType
                                  ? 'item-active'
                                  : ''
                              }`}
                              onClick={() => {
                                this.handleActiveItem(subType);
                                this.props.onSelected(
                                  ntype,
                                  subType,
                                  getLinkToAdd(
                                    node.iid,
                                    ntype,
                                    subType,
                                    bankDialogTabMode,
                                  ),
                                );
                              }}
                              onDoubleClick={() => {
                                this.addItem(ntype, subType);
                              }}
                              key={subType}
                            >
                              <ItemIconAndLabel
                                key={`${ntype}-${subType}`}
                                node={node}
                                ntype={ntype}
                                subType={subType}
                                onClick={() => this.handleActiveItem(subType)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Widget>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(ItemIconList);
