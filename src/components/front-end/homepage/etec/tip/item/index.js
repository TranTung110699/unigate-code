/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import DefaultImage from './images/student.png';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  render() {
    const { type, dailyTip } = this.props;
    const style =
      type !== 1
        ? {
            container: {
              clear: 'bold',
              width: '100%',
              margin: '20px 0',
              textTransform: 'uppercase',
            },
            image: {
              objectFit: 'fill',
              width: '100%',
            },
            content: {
              borderLeft: 'solid 1px #acacac',
              borderRight: 'solid 1px #acacac',
              borderBottom: 'solid 1px #acacac',
              width: '100%',
              padding: '35px 25px',
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            },
          }
        : {
            container: {
              clear: 'bold',
              margin: '20px 0',
              width: '100%',
              textTransform: 'uppercase',
              position: 'relative',
            },
            image: {
              objectFit: 'cover',
              height: '100%',
              width: '100%',
            },
            content: {
              width: '100%',
              padding: '24px',
              margin: '0px',
              position: 'absolute',
              color: 'white',
              bottom: 0,
              background: 'linear-gradient(transparent, black)',
              fontWeight: 400,
              fontSize: '24px',
            },
          };

    const avatar =
      dailyTip && dailyTip.avatar && dailyTip.avatar.length > 0
        ? dailyTip.avatar[0].link
        : null;
    return (
      <Link
        id={dailyTip.id}
        style={style.container}
        to={getFrontendUrl('blog', { categorySlug: dailyTip.slug })}
      >
        {
          <img
            src={avatar || DefaultImage}
            alt={dailyTip.name}
            style={style.image}
          />
        }
        <p style={style.content}>{dailyTip.name}</p>
      </Link>
    );
  }
}

Item.propTypes = {
  dailyTips: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    slug: PropTypes.string,
  }),
};

Item.defaultProps = {
  dailyTips: {},
};
export default Item;
