import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { t } from 'translate';
import EditMetadata from '../../metadata';
import Rubric from '../../rubric';
import './stylesheet.scss';

class SkillEditChildren extends React.Component {
  divStyle = { padding: '47px 12px' };
  cssClass = 'skill-edit-children-layout';

  constructor(props) {
    super(props);
    this.state = {
      view: 'metadata',
    };
  }

  handleChangeSkillViewToggle = (event, toggled) => {
    this.setState({
      view: toggled ? 'rubric' : 'metadata',
    });
  };

  render() {
    const { className, node } = this.props;
    const { view } = this.state;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className="whitebox m-b-10">
          <Toggle
            value={view === 'rubric'}
            label={t('rubric_view')}
            onToggle={this.handleChangeSkillViewToggle}
            labelPosition={'right'}
          />
        </div>
        {view === 'rubric' ? (
          <div style={this.divStyle}>
            <Rubric className={`${this.cssClass}__rubric`} node={node} />
          </div>
        ) : (
          <EditMetadata node={node} />
        )}
      </div>
    );
  }
}

SkillEditChildren.propTypes = {
  className: PropTypes.string,
};

SkillEditChildren.defaultProps = {
  className: '',
};

export default SkillEditChildren;
