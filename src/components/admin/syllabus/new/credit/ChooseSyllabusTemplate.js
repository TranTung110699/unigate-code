import React, { Component } from 'react';
import TemplateList from './TemplateList';
import TemplateDetail from './TemplateDetail';
import routes from 'routes';
import NewForm from '../Form';
import { withRouter } from 'react-router';
import { templateTypes } from '../../schema/template-types';
import { t1 } from 'translate';
import Widget from 'components/common/Widget';
import './styles.scss';

const maxDepth = (templateType) => {
  if (templateType === templateTypes.DEPTH1) return 1;
  else if (templateType === templateTypes.DEPTH2) return 2;
  return 2;
};

class ChooseSyllabusTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: templateTypes.DEPTH1,
      templateType: false,
    };
  }

  render() {
    const { dialogKey } = this.props;
    const hiddenFields = {
      type: 'credit',
      max_depth: maxDepth(this.state.templateType),
    };

    return (
      <div>
        {!this.state.templateType && (
          <Widget title={t1('choose_a_template_type')}>
            <div className="row">
              <div className="col-md-4 p-r-0">
                <TemplateList
                  onClick={(type) => {
                    this.setState(() => ({
                      type,
                    }));
                  }}
                />
              </div>
              <div className="col-md-8 p-l-0 template-detail-border">
                <TemplateDetail
                  type={this.state.type}
                  onClick={(templateType) => {
                    this.setState(() => ({
                      templateType,
                    }));
                  }}
                />
              </div>
            </div>
          </Widget>
        )}
        {this.state.templateType && (
          <div>
            <NewForm
              dialogKey={dialogKey}
              mode="new"
              step="credit"
              hiddenFields={hiddenFields}
              requestSuccessful={(post) => {
                const url = routes.url('edit_item', {
                  base: '',
                  item: { ntype: 'credit', iid: post.result.iid },
                });
                this.props.history.push(url);
              }}
            />
            {/*
            <Widget
              title={
                this.state.templateType === templateTypes.DEPTH1
                  ? t1('create_mini_syllabus')
                  : t1('create_standard_syllabus')
              }
            >
            </Widget>

               */}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ChooseSyllabusTemplate);
