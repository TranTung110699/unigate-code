/**
 * Created by vohung on 28/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import { iconBySubtype } from 'components/admin/node/icon';
import { t, t1 } from 'translate';
import get from 'lodash.get';
import { checkIfEnableExamTemplate } from 'common/conf';
import isEqual from 'lodash.isequal';
// import { skillType } from 'configs/constants';
import LinkItem from './LinkItem';
import ButtonPopover from './ButtonPopover';
import getChildrenTypes, { groupSimilarChildren } from './utils';
import { genAddItemLabel } from './labels';
import AddButton from 'components/common/add-syllabus-item-button';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import './add-item-styles.scss';

const style = {
  flatButtonStyle: { textAlign: 'left' },
  menuStyle: { width: '200px' },
  linkStyle: { width: '100%' },
};

class AddItem extends Component {
  constructor(props) {
    super(props);

    const {
      node,
      fieldEdit,
      depth,
      rootItemNtype,
      itemAncestors,
      checkIfEnableExamTemplate,
    } = props;

    const childrenTypes = getChildrenTypes(
      props.domainInfo,
      node,
      fieldEdit,
      rootItemNtype,
      depth,
      itemAncestors,
      checkIfEnableExamTemplate,
    );
    this.state = {
      showList: this.shouldShowList(childrenTypes, depth),
      childrenTypes,
    };
  }

  componentDidMount() {
    const {
      node,
      fieldEdit,
      depth,
      rootItemNtype,
      domainInfo,
      itemAncestors,
      checkIfEnableExamTemplate,
    } = this.props;

    const childrenTypes = getChildrenTypes(
      domainInfo,
      node,
      fieldEdit,
      rootItemNtype,
      depth,
      itemAncestors,
      checkIfEnableExamTemplate,
    );

    this.setState({
      showList: this.shouldShowList(childrenTypes, depth),
      childrenTypes,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      node,
      fieldEdit,
      depth,
      rootItemNtype,
      domainInfo,
      itemAncestors,
      checkIfEnableExamTemplate,
    } = nextProps;

    if (
      !isEqual(node, this.props.node) ||
      !isEqual(fieldEdit, this.props.fieldEdit) ||
      !isEqual(depth, this.props.depth) ||
      !isEqual(rootItemNtype, this.props.rootItemNtype) ||
      !isEqual(domainInfo, this.props.domainInfo) ||
      !isEqual(itemAncestors, this.props.itemAncestors)
    ) {
      const childrenTypes = getChildrenTypes(
        domainInfo,
        node,
        fieldEdit,
        rootItemNtype,
        depth,
        itemAncestors,
        checkIfEnableExamTemplate,
      );

      this.setState({
        showList: this.shouldShowList(childrenTypes, depth),
        childrenTypes,
      });
    }
  }

  shouldShowList(childrenTypes, depth) {
    return depth === 1;
    // return (childrenTypes && childrenTypes.length === 1) || depth === 1;
  }

  renderListItem() {
    const { node } = this.props;
    const childrenTypes = get(this.state, 'childrenTypes', []);

    let filterChildrenTypes = groupSimilarChildren(childrenTypes, ['video']);

    return (
      <ul className={this.props.horizontal ? 'horizontal' : ''}>
        {filterChildrenTypes &&
          Array.isArray(filterChildrenTypes) &&
          filterChildrenTypes.map(
            ({ ntype, subType, avatar, options, label, component }, index) => {
              if (options) {
                return (
                  <ButtonPopover
                    key={`btn-popover-${index}`}
                    {...this.props}
                    options={options}
                    node={node}
                    avatar={avatar}
                    label={label}
                    flatButtonStyle={style.flatButtonStyle}
                    menuStyle={style.menuStyle}
                    linkStyle={style.linkStyle}
                    icon={iconBySubtype(ntype, subType)}
                  />
                );
              }

              const itemLabel = genAddItemLabel(ntype, subType) || label;

              return (
                <li key={subType ? `${ntype}-${subType}` : ntype}>
                  <LinkItem
                    ntype={ntype}
                    subType={subType}
                    node={node}
                    avatar={avatar}
                    label={itemLabel}
                    iconBySubtype={iconBySubtype(ntype, subType)}
                  />
                </li>
              );
            },
          )}
      </ul>
    );
  }

  toggleListItem() {
    this.setState({
      showList: !this.state.showList,
    });
  }

  render() {
    const { depth, isFeatureEnabled } = this.props;
    const isNewUIJulyEnabled = isFeatureEnabled(features.NEW_UI_JULY_2019);
    let wrapperStyle = { marginTop: '5px' };
    let buttonStyle;
    if (depth > 1) {
      buttonStyle = { minWidth: 0, width: '50px' };
    } else if (!isNewUIJulyEnabled) {
      wrapperStyle = { marginLeft: '5px', marginTop: '30px' };
    }
    if (this.state.childrenTypes && this.state.childrenTypes.length) {
      if (this.props.showList) {
        return this.renderListItem();
      }
      return (
        <div
          className={`add-item-wrapper ${
            isNewUIJulyEnabled && depth === 1 ? 'add-item-wrapper-notdepth' : ''
          }`}
        >
          <div className="add-item">
            <div style={wrapperStyle}>
              {isNewUIJulyEnabled ? (
                <RaisedButton
                  title={t1('click_to_add_items')}
                  label={depth === 1 ? t1('add_item') : t1('add_new')}
                  icon={<Icon icon="plus" />}
                  onClick={() => {
                    this.toggleListItem();
                  }}
                  isDepth={depth === 1}
                />
              ) : (
                <FlatButton
                  primary={this.state.showList}
                  title={t1('click_to_add_items')}
                  style={buttonStyle}
                  label={depth === 1 ? t1('add_item') : ''}
                  icon={<Icon icon="plus" />}
                  onClick={() => {
                    this.toggleListItem();
                  }}
                />
              )}
              {this.state.showList && this.renderListItem()}
            </div>
          </div>
        </div>
      );
    }

    // return <VarDump data={{state: this.state, props: this.props}}/>;
    return null;
  }
}

const mapStateToProps = (state, props) => {
  const location = window.location;
  const editBaseUrl = location.pathname || '/';

  const syllabusIid =
    props.syllabusIid ||
    get(
      (Array.isArray(props.itemAncestors) ? props.itemAncestors : []).find(
        (item) => get(item, 'ntype') === 'syllabus',
      ),
      'iid',
    );

  return {
    editBaseUrl,
    syllabusIid,
    domainInfo: state.domainInfo,
    checkIfEnableExamTemplate: checkIfEnableExamTemplate(
      get(state, 'domainInfo.conf.enable_exam_template'),
    ),
    editing: state.editing,
    maxNumberOfExamResits: get(
      state,
      'domainInfo.conf.max_number_of_exam_resits',
    ),
  };
};
export default connect(mapStateToProps)(withFeatureFlags()(AddItem));
