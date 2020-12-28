import React, { Component } from 'react';
import { t1 } from 'translate';
import depth1 from './img/depth1.png';
import depth2 from './img/depth2.png';
import { templateTypes } from '../../schema/template-types';
import './styles.scss';

class TemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: templateTypes.DEPTH1,
    };
  }
  render() {
    const list = [
      {
        type: templateTypes.DEPTH1,
        description: t1('mini_syllabus'),
        avatar: depth1,
      },
      {
        type: templateTypes.DEPTH2,
        description: t1('standard_syllabus'),
        avatar: depth2,
      },
    ];
    return (
      <div>
        {list.map((template, index) => (
          <div
            className={`text-center  m-b-10 ${
              template.type === this.state.active ? 'active-type' : ''
            } template-type-item`}
            key={index}
            onClick={() => {
              this.setState({ active: template.type });
              this.props.onClick(template.type);
            }}
          >
            <div>
              <img src={template.avatar} />
            </div>
            <div>{template.description}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default TemplateList;
