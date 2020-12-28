/**
 * Created by vohung on 03/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNode } from 'components/admin/node/utils';
import routes from 'routes';
import MenuTop from 'components/admin/syllabus/edit/menu/Top';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';
import NodeNew from 'components/admin/node/new/';
import Divider from 'material-ui/Divider';
import actions from 'actions/creators';
import EditControls from 'components/admin/node/edit/controls/Controls';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import { t1 } from 'translate';
import './stylesheet.scss';

class EditSyllabus extends Component {
  divStyle = {
    borderLeft: '1px solid #eee',
    height: '100%',
    backgroundColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      ancestors: [],
    };
  }

  componentDidMount() {
    this.setMenuTop(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setMenuTop(nextProps);
    }
  }

  setMenuTop = (props) => {
    const { itemEditing, dispatch } = props;
    if (!itemEditing) {
      return;
    }
    const siteTitle = this.getElementTitleMenuTop(props);
    dispatch(actions.setTopMenuElement({ siteTitle }));
  };

  getElementTitleMenuTop = (props) => {
    const itemEditing = props.props || {};
    const ancestors = this.getAncestorsEditor(props);
    const node = getNode(itemEditing.iid, itemEditing.pIid, props.nodes);
    return <MenuTop node={node} ancestors={ancestors} />;
  };

  getAncestorsEditor = (props) => {
    const { course, nodes, itemAncestors } = props;
    const ancestors = [];
    let itemEditing = {};
    let url = routes.url('node_edit', { ...course, step: null });
    if (itemAncestors.length > 1) {
      itemAncestors.forEach((item) => {
        if (
          item &&
          item.iid &&
          nodes[item.iid] &&
          item.iid.toString() !== course.iid.toString()
        ) {
          itemEditing = getNode(item.iid, item.pIid, nodes);
          if (itemEditing) {
            url = `${url}/${itemEditing.ntype}/${itemEditing.iid}`;
            itemEditing.link = url;
            ancestors.push(itemEditing);
          }
        }
      });
    }
    return ancestors;
  };

  render() {
    const itemEditing = this.props.itemEditing || {};
    const node = getNode(itemEditing.iid, itemEditing.pIid, this.props.nodes);
    const {
      course,
      contentReadOnly,
      ntypesAllowRemove,
      textConfirm,
    } = this.props;
    if (course && course.editable === false) {
      return (
        <div>
          {t1('please_change_exam_freeze_period_to_edit_this_syllabus')}
        </div>
      );
    }

    if (!node || !node.iid) {
      return <div>Loading...</div>;
    }

    return (
      <div className="exam-syllabus">
        <div className="col-md-10">
          <Divider />
          {this.props.action === 'edit' ? (
            <div className="whitebox">
              <NodeNew
                ntype={node.ntype}
                node={node}
                mode="edit"
                schema={getLearningItemFormSchema(node.ntype)}
              />
            </div>
          ) : (
            <Metadata
              contentReadOnly={contentReadOnly}
              textConfirm={textConfirm}
              ntypesAllowRemove={ntypesAllowRemove}
              node={{ ...node, isExam: 1 }}
            />
          )}
        </div>
        {node && node.ntype && (
          <div className="col-md-2" style={this.divStyle}>
            <EditControls {...this.props} node={node} editCourseExamMode />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const nodes = state.tree || {};
  const itemAncestors = state.editing.itemAncestors || [];
  const itemEditing = state.editing.item;
  let action = state.editing.action;

  if (itemEditing && itemEditing.ntype === 'question' && !action) {
    action = 'edit';
  }

  return {
    action,
    nodes,
    itemEditing,
    itemAncestors,
    location: window.location,
  };
}

export default connect(mapStateToProps)(EditSyllabus);
