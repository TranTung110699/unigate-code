/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import './stylesheet.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import SvgIcon, { additionalIcon, collectionIcon } from 'common/icons/svg';
import { Link } from 'react-router-dom';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class TopMenuApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: 'ui-collection-list-on-collapse' };
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnBlur() {
    this.setState({ className: 'ui-collection-list-on-collapse' });
  }

  render() {
    const { screenSize } = this.props;
    const className = `ui-collection-list-on-left clearfix ${
      this.state.className
    }`;

    const collection = [];
    for (let i = 20; i > 0; i--) {
      const coId = `0${i}`;
      collection.push(coId);
    }
    return (
      <div
        className={className}
        style={this.state.style}
        onBlur={this.handleOnBlur}
      >
        <div className="top-header">
          <SvgIcon
            path={collectionIcon}
            className="is-icon-picture-view-all-2"
          />
        </div>
        <div className="collection-list-panel">
          <Scrollbars autoHide autoHideTimeout={100} autoHideDuration={200}>
            <ul className="collection-list">
              {collection.map((id) => (
                <li key={id} className="center-block-panel clearfix">
                  <Link to="/collection-detail/123">
                    Collection Number {id}
                  </Link>
                  <span className="icon-thumbnail">{id}</span>
                </li>
              ))}
            </ul>
          </Scrollbars>
          <div className="btn-panel clearfix">
            <button className="btn-new-collection ">
              <span className="label-new-collection">Create New</span>
              <span className="pull-right">
                <SvgIcon path={additionalIcon} className="is-icon-add-1 " />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(TopMenuApp);
