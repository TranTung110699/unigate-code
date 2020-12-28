import React, { Component } from 'react';
import Icon from 'components/common/Icon';
// import FlatButton from 'components/common/mui/FlatButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Link } from 'react-router-dom';
import routes from 'routes/';
import { t1 } from 'translate';
import { breadCrumb } from 'common/utils/string';

class Overview extends Component {
  divStyle = { padding: '10px' };
  divStyle1 = { marginTop: '15px' };
  iconStyle = { fontSize: '150%' };

  render() {
    const defaultSyllabus = {
      name: 'name',
      breadCrumb: '...',
      iid: '',
      original_language: '',
      content_language: '',
    };
    const syllabus = this.props.syllabus || defaultSyllabus;
    const {
      name,
      // breadCrumb,
      // id,
      iid,
      original_language,
      content_language,
    } = syllabus;

    const bread = breadCrumb(name, 20);

    const overviewStyles = {
      marginLeft: '-15px',
      marginTop: '0px',
      textAlign: 'center',
      padding: '40px',
      color: 'white',
    };

    return (
      <div>
        <div>
          <div style={this.divStyle}>
            <Link to="/admin" title="Home">
              <Icon icon="home" style={this.iconStyle} />
            </Link>
            <Link to={routes.url('syllabus')} title="syllabuses">
              <Icon icon="list" style={this.iconStyle} />
            </Link>
          </div>
          <hr />
        </div>
        <div style={overviewStyles}>
          <div>
            <p className="pull-left">
              <span
                className="label label-primary"
                title={t1('syllabus_language')}
              >
                {original_language}
              </span>
              {content_language && (
                <span
                  className="label label-primary"
                  title={t1('language_you_are_currently_editing')}
                >
                  {content_language}{' '}
                </span>
              )}
            </p>
          </div>

          <div>
            <h4 title={name}>
              {bread} (#
              {iid})
            </h4>

            {syllabus.id ? syllabus.id : ''}
          </div>

          <div style={this.divStyle1}>
            <RaisedButton
              primary
              label={t1('back')}
              icon={<Icon icon="arrow-back" />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
