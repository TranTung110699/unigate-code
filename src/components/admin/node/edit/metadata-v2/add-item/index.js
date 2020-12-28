import React, { Component } from 'react';
import { groupSimilarChildren } from '../../metadata/add-item/utils';
import ItemDescription from './description/item-description';
import QuestionDescription from './description/question-description';
import { t1 } from 'translate';
import { groupSimilarChildrenV2 } from './utils';
import ItemIconList from './item-icon/List';
import './styles.scss';

class ChooseItemToAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ntype: null,
      subType: null,
      link: null, // ?/bank/sco/123/standard
    };
  }

  render() {
    // bankDialogTabMode is either new_only or 'search_bank' or ''
    const { childrenTypes, node, bankDialogTabMode } = this.props;

    if (!Array.isArray(childrenTypes) || !childrenTypes.length) {
      return null;
    }

    let filterChildrenTypesV2 = groupSimilarChildrenV2(childrenTypes, node);

    const leftCol = 'col-md-4';
    const rightCol = 'col-md-8';

    return (
      <div className="container-fluid whitebox">
        <div className="row">
          <div className={`${leftCol} leftCol`}>
            <ItemIconList
              node={node}
              bankDialogTabMode={bankDialogTabMode}
              childrenTypes={filterChildrenTypesV2}
              onSelected={(ntype, subType, link) => {
                this.setState(() => ({
                  ntype,
                  subType,
                  link,
                }));
              }}
            />
          </div>
          <div className={`${rightCol} p-t-30`} style={{ minHeight: '300px' }}>
            {this.state.ntype == 'question' ? (
              <QuestionDescription
                ntype={this.state.ntype}
                subType={this.state.subType}
                link={this.state.link}
                node={node}
              />
            ) : (
              <ItemDescription
                ntype={this.state.ntype}
                subType={this.state.subType}
                link={this.state.link}
                bankDialogTabMode={bankDialogTabMode}
                node={node}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ChooseItemToAdd;
