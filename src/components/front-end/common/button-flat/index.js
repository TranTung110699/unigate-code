import React from 'react';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import './styles.scss';

const ButtonFlat = ({ to, label }) => (
  <div
    style={{
      display: 'block',
      float: 'left',
      width: '100%',
      textAlign: 'center',
      marginBottom: 15,
      marginTop: 20,
    }}
  >
    <Link to={to}>
      <button className="view-more-button">{label || t1('view_more')}</button>
    </Link>
  </div>
);

export default ButtonFlat;
