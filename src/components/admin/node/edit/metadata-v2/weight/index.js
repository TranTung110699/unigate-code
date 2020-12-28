import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import { hasWeight } from 'components/admin/node/configs';
import WeightToggle from 'components/admin/node/edit/controls/Weight';
import InlineEditable from 'components/common/forms/editable/inline';

class ItemWeight extends Component {
  render() {
    const {
      parentNode = {},
      numberOfChildren,
      // path,
      ...row
    } = this.props.rowItem;

    const { readOnly, updateMetadata } = this.props;
    const weightToggle =
      numberOfChildren > 0 ? (
        <div className="flex-item">
          {['sco', 'exercise'].includes(row.ntype) && (
            <span
              style={{
                maxWidth: 200,
                display: 'inline-block',
              }}
            >
              <WeightToggle node={row} brief readOnly={readOnly} noLabel />
            </span>
          )}
        </div>
      ) : (
        <span />
      );

    if (!hasWeight(row.ntype, parentNode)) {
      return weightToggle;
    }

    return (
      <div className="d-flex" style={{ justifyContent: 'space-around' }}>
        <div className="d-flex">
          {readOnly || !get(parentNode, 'weighed_score') ? (
            get(row, 'weighted', '---')
          ) : (
            <InlineEditable
              type="number"
              disabled={readOnly}
              value={get(row, 'weighted', '---')}
              propName="weighted"
              handleOnChange={({ weighted }) => {
                if (typeof updateMetadata !== 'function') {
                  return;
                }
                updateMetadata(parentNode, {
                  ...row,
                  weighted,
                });
              }}
              editProps={{ style: { maxWidth: 50 } }}
              validate={(newValue) => newValue >= 0}
            />
          )}
          {get(parentNode, 'weight_scheme') === 'percent' && (
            <span className="text-muted">%</span>
          )}
        </div>
        {weightToggle}
      </div>
    );
  }
}
export default ItemWeight;
