import React, { Component } from 'react';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { t, t1, t4 } from 'translate';
import Checkbox from 'material-ui/Checkbox';
import { isIntroSticky } from 'common/learn/Question';
import { isQuestionUsedForSurvey } from 'components/admin/node/utils';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const canBeIntroSticky = (item, itemIndex, items) => {
  return (
    item &&
    item.ntype === 'question' &&
    item.type === questionTypes.TYPE_INTRODUCTION &&
    (!items[itemIndex - 1] || items[itemIndex - 1].group !== item.group) &&
    (items[itemIndex + 1] && items[itemIndex + 1].group === item.group) &&
    !isQuestionUsedForSurvey(item)
  );
};

class Question extends Component {
  spanStyle = { display: 'inline-flex' };
  selectFieldStyle = { width: 150 };
  h3Style = { color: 'darkred' };

  getListGroup() {
    const { totalNrRows } = this.props;
    const items = [];
    for (let i = 1; i <= totalNrRows; i += 1) {
      items.push(
        <MenuItem value={i} key={i} primaryText={t1('group_%s', [i])} />,
      );
    }
    return items;
  }

  render() {
    const { item, itemIndex, items, readOnly } = this.props;
    const introStickyPosToText = {
      top: 'at_the_top',
      right: 'on_the_right_side',
      left: 'on_the_left_side',
    };

    return (
      <span>
        {item.type === questionTypes.TYPE_INTRODUCTION &&
          canBeIntroSticky(item, itemIndex, items) &&
          (!readOnly ? (
            [
              <span
                key="intro_sticky"
                className="m-r-10"
                style={this.spanStyle}
              >
                <Checkbox
                  label={t1('is_intro_sticky')}
                  onCheck={() => {
                    this.props.updateDataRow(
                      {
                        iid: item.iid,
                        intro_sticky: item.intro_sticky ? 0 : 1,
                        intro_sticky_position:
                          item.intro_sticky_position || 'top',
                      },
                      itemIndex,
                    );
                  }}
                  checked={Boolean(item.intro_sticky)}
                />
              </span>,
              !!item.intro_sticky && (
                <span
                  key="intro_sticky_postion"
                  className="m-r-10"
                  style={this.spanStyle}
                >
                  <SelectField
                    disabled={!isIntroSticky(item)}
                    value={item.intro_sticky_position}
                    onChange={(event, index, value) => {
                      this.props.updateDataRow(
                        {
                          iid: item.iid,
                          intro_sticky_position: value,
                        },
                        itemIndex,
                      );
                    }}
                    style={this.selectFieldStyle}
                  >
                    {['top', 'right', 'left'].map((pos) => (
                      <MenuItem
                        value={pos}
                        primaryText={t4(introStickyPosToText[pos])}
                      />
                    ))}
                  </SelectField>
                </span>
              ),
            ]
          ) : (
            <h3 style={this.h3Style}>
              {isIntroSticky(item) &&
                `${t1('is_intro_sticky')} ${t(
                  introStickyPosToText[item.intro_sticky_position],
                )}`}
            </h3>
          ))}
        {item.ntype === 'question' && !isQuestionUsedForSurvey(item) && (
          <span className="m-r-10" style={this.spanStyle}>
            {!readOnly ? (
              <SelectField
                value={item.group}
                onChange={(event, index, value) => {
                  this.props.updateDataRow(
                    {
                      iid: item.iid,
                      group: value,
                    },
                    itemIndex,
                  );
                }}
                style={this.selectFieldStyle}
              >
                {this.getListGroup()}
              </SelectField>
            ) : (
              t1('group_%s', [item.group])
            )}
          </span>
        )}
      </span>
    );
  }
}

export default Question;
