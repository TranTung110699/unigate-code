import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new/';
import { t1 } from 'translate';
import schema from 'components/admin/skill/schema/form';
import { connect } from 'react-redux';
import { skillScaleOptionsSelector } from 'components/admin/skill/skill/utils';
import { Link } from 'react-router-dom';
import routes from 'routes';
import actions from 'actions/node/creators';
import Rubric from 'components/admin/skill/skill/rubric';
import questionSchema from 'components/admin/question/schema/form';
import { canHaveRubric } from 'components/admin/node/utils';
import './stylesheet.scss';

class ScoreAndPassing extends React.Component {
  aStyle = { cursor: 'pointer' };
  cssClass = 'admin-learning-item-score-and-passing';

  handleNewRubricClick = () => {
    const {
      dispatch,
      className,
      node,
      readOnly,
      skillScaleOptions,
    } = this.props;

    const contentDialog = (
      <NodeNew
        schema={schema}
        ntype={'skill'}
        mode={'new'}
        step={'new_learning_item_rubric'}
        params={{
          type: 'rubric',
          learning_item_to_attach_rubric: {
            iid: node.iid,
            ntype: node.ntype,
          },
          skillScaleOptions,
        }}
        formid={'new_learning_item_rubric'}
      />
    );

    const optionsProperties = {
      modal: true,
      title: t1('new_rubric'),
      handleClose: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, node, readOnly, skillScaleOptions } = this.props;
    if (!node) {
      return null;
    }

    return (
      <div className={`${className || ''} ${this.cssClass} row`}>
        <NodeNew
          schema={questionSchema}
          readOnly={readOnly}
          message={readOnly ? `(*${t1('this_form_is_read_only')})` : ''}
          ntype={node.ntype}
          node={node}
          mode="edit"
          step="score_passing"
        />
        {canHaveRubric(node) &&
          (node.rubric ? (
            <div className={`${this.cssClass}__section`}>
              <h2 className={`${this.cssClass}__section-title`}>
                {t1('rubric')}
              </h2>
              <Rubric
                className={`${this.cssClass}__rubric`}
                readOnly={readOnly}
                node={node.rubric}
              />
              {!readOnly && (
                <Link
                  className={`${this.cssClass}__advanced-edit`}
                  to={routes.url('edit_item', {
                    base: '',
                    item: { ...node.rubric, type: 'rubric' },
                    mode: 'children',
                  })}
                >
                  {t1('click_here_for_advanced_editing')}
                </Link>
              )}
            </div>
          ) : (
            !readOnly && (
              <a style={this.aStyle} onClick={this.handleNewRubricClick}>
                {`${t1('there_are_no_rubric_attached_to_this_question')}. ${t1(
                  'click_here_to_create_rubric',
                )}`}
              </a>
            )
          ))}
      </div>
    );
  }
}

ScoreAndPassing.propTypes = {
  className: PropTypes.string,
};

ScoreAndPassing.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  skillScaleOptions: skillScaleOptionsSelector(state),
});

export default connect(mapStateToProps)(ScoreAndPassing);
