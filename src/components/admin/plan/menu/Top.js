import React, { Component } from 'react';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/FlatButton';
import { Link } from 'react-router-dom';
import { breadCrumb } from 'common/utils/string';
import { t } from 'translate';

// import './stylesheet.scss';

class MenuTop extends Component {
  spanStyle = { marginTop: '5px' };

  render() {
    const items = this.props.ancestors;
    const last = this.props.node;
    const length = items.length;
    return (
      <div className="ui-syllabus-menu">
        <ul className={`${this.props.className} top-menu`}>
          {length &&
            items.map((item, i) => {
              let label = item.name || `#${item.iid}`;
              if (
                item.ntype === 'syllabus' &&
                item.type === 'credit' &&
                item.credit
              ) {
                label = t('%s (%s credits)', [label, item.credit]);
              }
              const isLast = i === length - 1;
              return (
                item && (
                  <li className="item" key={item.iid}>
                    <Link
                      to={item.link}
                      key={item.iid || i}
                      title={item.name || item.iid}
                    >
                      <FlatButton
                        primary={isLast}
                        icon={<Icon icon={item.ntype} />}
                        label={isLast ? label : breadCrumb(label, 15)}
                      />
                      {!isLast && (
                        <span style={this.spanStyle}>
                          <Icon icon="angle-right" />
                        </span>
                      )}
                    </Link>
                  </li>
                )
              );
            })}
        </ul>
      </div>
    );
  }
}

export default MenuTop;
