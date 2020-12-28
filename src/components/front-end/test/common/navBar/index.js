import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { ntype } from 'configs/constants';
import { NavLink } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import DropDownButton from './DropDownButton';
import './stylesheet.scss';

class NavBar extends React.Component {
  cssClass = 'etec-nav-bar';

  render() {
    const { className, examPath, learnPath, type } = this.props;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        {/* <div className={`${this.cssClass}__group ${this.cssClass}__group--left`}> */}
        {examPath &&
          (type === 'exam_path' || type === 'exam_shift') &&
          Array.isArray(examPath.children) &&
          examPath.children.map((child, index) => {
            if (!child || !child.ntype || !child.name) {
              return null;
            }

            const itemClassName = `${this.cssClass}__item  ${
              this.cssClass
            }__item--left`;

            switch (child.ntype) {
              case ntype.PATH: {
                return (
                  <NavLink
                    to={getFrontendUrl('tests', {
                      type: 'exam_path',
                      iid: child.iid,
                    })}
                    className={itemClassName}
                    activeClassName={`${this.cssClass}__item--active`}
                  >
                    {child.name}
                  </NavLink>
                );
              }
              case ntype.COURSE: {
                if (child.exam_type === 'EXAM_SHIFT') {
                  return (
                    <NavLink
                      to={getFrontendUrl('tests', {
                        type: 'exam_shift',
                        iid: child.iid,
                      })}
                      className={itemClassName}
                      activeClassName={`${this.cssClass}__item--active`}
                    >
                      {child.name}
                      <span className={`${this.cssClass}__free-icon`}>
                        {t1('free')}
                      </span>
                    </NavLink>
                  );
                }
                return null;
              }
              default: {
                return null;
              }
            }
          })}
        {/* </div> */}
        {/* <div className={`${this.cssClass}__group ${this.cssClass}__group--right`}> */}
        {learnPath &&
          type === 'path' &&
          Array.isArray(learnPath.children) &&
          learnPath.children.map((path) => {
            if (!path || !path.name) {
              return null;
            }

            const itemClassName = `${this.cssClass}__item ${
              this.cssClass
            }__item--right`;

            if (
              Array.isArray(path.children) &&
              path.children.length > 0 &&
              path.children.every(
                (childPath) => childPath && childPath.ntype === ntype.PATH,
              )
            ) {
              return (
                <DropDownButton
                  component={NavLink}
                  componentProps={{
                    to: '#',
                    activeClassName: `${this.cssClass}__item--active`,
                    isActive: (match, location) =>
                      path.children
                        .map((childPath) =>
                          getFrontendUrl('tests', {
                            type: 'path',
                            iid: childPath.iid,
                          }),
                        )
                        .includes(location && location.pathname),
                  }}
                  key={path.iid}
                  className={itemClassName}
                  text={path.name}
                >
                  <ul className={`${this.cssClass}__item-child-list`}>
                    {path.children.map((childPath) => (
                      <li
                        key={childPath.iid}
                        className={`${this.cssClass}__item-child`}
                      >
                        <NavLink
                          to={getFrontendUrl('tests', {
                            type: 'path',
                            iid: childPath.iid,
                          })}
                          className={`${this.cssClass}__item`}
                          activeClassName={`${this.cssClass}__item--active`}
                        >
                          {childPath.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </DropDownButton>
              );
            }
            return (
              <NavLink
                to={getFrontendUrl('tests', { type: 'path', iid: path.iid })}
                key={path.iid}
                className={itemClassName}
                activeClassName={`${this.cssClass}__item--active`}
              >
                {path.name}
              </NavLink>
            );
          })}
        {/* </div> */}
      </div>
    );
  }
}

NavBar.propTypes = {
  className: PropTypes.string,
  examPath: PropTypes.shape(),
  learnPath: PropTypes.shape(),
};

NavBar.defaultProps = {
  className: '',
  examPath: null,
  learnPath: null,
};

export default NavBar;
