import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import { generateBaseUrlFromItemAncestors } from '../utils';
import AddItemV2 from './AddItem';
import routes from 'routes';
import { constants } from 'configs/constants';
import ActionSelect from 'components/common/select/ActionSelect';
import nodeActions from 'actions/node/creators';
import RaisedButton from 'components/common/mui/RaisedButton';
import { getLinkToAdd } from 'components/admin/node/edit/metadata/add-item/LinkItem';
import { bankDialogTabDisplayTypes } from '../../bank/utils';
import { getAddItemButtonLabel } from './add-item/utils';
// disable syllabus weight scheme for now
const showWeightScheme = false;

class TableFooter extends Component {
  handleWeightSchemeChange = (syllabusIid, weightScheme) => {
    // dispatch to store to update node
    this.props.dispatch(
      nodeActions.treeUpsertNode({
        ntype: 'syllabus',
        iid: syllabusIid,
        weight_scheme: weightScheme,
      }),
    );
  };

  render() {
    const {
      node,
      syllabus,
      childrenTypes,
      readOnly,
      isCompact,
      itemAncestors,
    } = this.props;

    return (
      <div className="m-t-10 whitebox">
        <span className="pull-left">
          <AddItemV2
            node={node}
            childrenTypes={childrenTypes}
            outterMost
            path={
              isCompact
                ? `/admin/syllabus/${syllabus.iid}`
                : generateBaseUrlFromItemAncestors(itemAncestors)
            }
          />
        </span>

        {node.ntype === 'exercise' && (
          <React.Fragment>
            <span className="pull-left m-l-20">
              <Link
                to={getLinkToAdd(
                  node.iid,
                  'question',
                  '',
                  bankDialogTabDisplayTypes.SEARCH_ONLY,
                )}
              >
                <RaisedButton
                  label={getAddItemButtonLabel(
                    node,
                    bankDialogTabDisplayTypes.SEARCH_ONLY,
                  )}
                  primary
                />
              </Link>
            </span>
            <span className="pull-left m-l-20">
              <Link to={getLinkToAdd(node.iid, 'question', 'import')}>
                <RaisedButton primary label={t1('import_from_excel')} />
              </Link>
            </span>
          </React.Fragment>
        )}

        {showWeightScheme && !isCompact && node.ntype === 'syllabus' && (
          <span className="pull-left m-l-20">
            {t1('syllabus_weight_scheme')}
            <ActionSelect
              floatingLabelText={t1('syllabus_weight_scheme')}
              name="weight_scheme"
              value={syllabus && syllabus.weight_scheme}
              baseURL={routes.url('node_update', {
                ...syllabus,
                step: 'weight_scheme',
              })}
              dataSet={constants.syllabusWeightSchemes()}
              style={this.actionSelectStyle}
              type="radio"
              handleChange={(ret, weightScheme) => {
                this.handleWeightSchemeChange(syllabus.iid, weightScheme);
              }}
              readOnly={syllabus && syllabus.freeze}
            />
          </span>
        )}

        {node.ntype === 'syllabus' && isCompact ? (
          <span className="pull-right">
            <Link
              to={`/admin/${node.ntype}/${node.iid}/children`}
              title={t1('expand_syllabus')}
            >
              <Icon type={'fullscreen'} size="big" />
            </Link>
          </span>
        ) : null}

        <div className="clearfix" />
      </div>
    );
  }
}

export default connect()(TableFooter);
