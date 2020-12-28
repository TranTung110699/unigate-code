import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'antd/lib/checkbox';
import { t } from 'translate';
import { getConf } from 'utils/selectors/index';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import { aspects } from 'components/admin/skill/configs';
import { ntype as allNtypes } from 'configs/constants';
import {
  getActionFilters,
  getDefaultNtypeFiltersAndActionFilters,
  getMaximumAllowedDepth,
  getNtypeFiltersToRender,
} from './utils-configs';

import {
  addNtype,
  decreaseMaximumDepth,
  increaseMaximumDepth,
  removeNtype,
  setMetadataFilters,
} from './actions';
import Card from 'antd/lib/card';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

const addParentNtype = (ntype) => {
  const ntypes = [ntype];
  if (ntype === allNtypes.VOCAB) ntypes.push(allNtypes.VOCABSET);
  if (ntype === allNtypes.QUESTION) ntypes.push(allNtypes.EXERCISE);
  return ntypes;
};

const removeParentNtype = (ntype) => {
  const ntypes = [ntype];
  if (ntype === allNtypes.VOCABSET) ntypes.push(allNtypes.VOCAB);
  if (ntype === allNtypes.EXERCISE) ntypes.push(allNtypes.QUESTION);
  return ntypes;
};

class MetadataFilter extends Component {
  spanStyle = { float: 'left' };
  componentDidMount() {
    const available = getDefaultNtypeFiltersAndActionFilters(this.props);
    this.props.dispatch(setMetadataFilters(available));
  }

  increase() {
    // TODO: optimize this. only fetch if maximumDepth is still within limit,
    const { maximumDepth, rootItemFetchedDepth, dispatch } = this.props;
    const action = {
      ...this.props.node,
      depth: maximumDepth + 1,
      executeOnSuccess: () => {
        dispatch(increaseMaximumDepth());
      },
    };

    if (rootItemFetchedDepth !== -1) {
      if (
        ['syllabus', 'vocabset', 'exercise', 'sco', 'video'].includes(
          action.ntype,
        )
      ) {
        action.is_preview = true;
      }
      dispatch(actions.fetchNode(action));
    } else {
      dispatch(increaseMaximumDepth());
    }
  }

  decrease() {
    this.props.dispatch(decreaseMaximumDepth());
  }

  check(ntype, checked) {
    if (checked) {
      this.props.dispatch(addNtype(addParentNtype(ntype)));
    } else {
      this.props.dispatch(removeNtype(removeParentNtype(ntype)));
    }
  }

  render() {
    // calculate available types based on
    // const selectedNtypes = this.props.selectedNtypes;
    const available = getNtypeFiltersToRender(this.props);

    const selectedNtypes = this.props.metadataFilters;

    const maximumAllowedDepth = getMaximumAllowedDepth(this.props.node);
    let disableExpand = false;
    if (this.props.visualTreeDepth < this.props.maximumDepth - 1) {
      disableExpand = true;
    }
    if (
      maximumAllowedDepth !== -1 &&
      this.props.visualTreeDepth >= maximumAllowedDepth
    ) {
      disableExpand = true;
    }

    // disableExpand = false;
    const disableCollapse = this.props.visualTreeDepth === 1;
    const plusStyle = { minWidth: 0, width: '50px', cursor: 'pointer' };
    const disabledPlusStyle = { ...plusStyle, cursor: 'not-allowed' };
    const contentTypeStyle = { textAlign: 'center' };
    const actionStyle = {};
    // check if we should hide the contentFilterBox

    const { node, fieldEdit, action } = this.props;
    if (
      (node.ntype === 'skill' && !aspects.includes(fieldEdit)) ||
      node.ntype === 'exercise' ||
      node.ntype === 'path' ||
      fieldEdit === 'skills'
    ) {
      contentTypeStyle.display = 'none';
    }

    const expandWrapperStyle = {};
    if (node.ntype === 'skill' && aspects.includes(fieldEdit)) {
      actionStyle.display = 'none';
      expandWrapperStyle.display = 'none';
    }

    if (!node[fieldEdit] || node[fieldEdit].length === 0) {
      actionStyle.display = 'none';
      expandWrapperStyle.display = 'none';
    }

    // if (!Object.keys(available).length) return null;

    const metaDataHeader = {
      title: t('content_filters'),
      extra: (
        <div key="filter_level" className="m-l-15" style={expandWrapperStyle}>
          <span
            style={disableCollapse ? disabledPlusStyle : plusStyle}
            onClick={() => {
              this.decrease();
            }}
            title={t('view_content_with_less_levels_down')}
          >
            <Icon icon="minus" /> {t('view_less')}
          </span>
          <span
            style={disableExpand ? disabledPlusStyle : plusStyle}
            onClick={() => {
              this.increase();
            }}
            title={t('view_content_with_more_levels_down')}
            className="p-l-10"
          >
            <Icon icon="plus" /> {t('view_more')}
          </span>
        </div>
      ),
    };

    return (
      <div
        className={
          !this.props.isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? 'm-l-10'
            : ''
        }
      >
        <Card size="small" {...metaDataHeader}>
          <div className="clearfix display-flex text-muted filter">
            <div className="flex-grow-1">
              <div style={contentTypeStyle}>
                {Object.keys(available).map((ntype) => (
                  <span style={this.spanStyle} key={ntype}>
                    <Checkbox
                      value={ntype}
                      checked={selectedNtypes[ntype]}
                      onChange={(ev) => {
                        this.check(ntype, ev.target.checked);
                      }}
                    >
                      {t(ntype)}
                    </Checkbox>
                  </span>
                ))}
              </div>
            </div>
            {action !== 'sequential' && [
              <div key="filter_content" style={actionStyle}>
                {getActionFilters(node, action).map((content) => {
                  return (
                    <span style={this.spanStyle} key={content}>
                      <Checkbox
                        value={content}
                        checked={selectedNtypes[content]}
                        onChange={(ev) => {
                          this.check(content, ev.target.checked);
                        }}
                      >
                        {t(content)}
                      </Checkbox>
                    </span>
                  );
                })}
              </div>,
            ]}
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const viewSettingConfig =
    getConf(state).syllabus_curriculum_edit_view_filters || [];

  return {
    viewSettingConfig,
  };
};

export default connect(mapStateToProps)(withFeatureFlags()(MetadataFilter));
