import React from 'react';
import { Link } from 'react-router-dom';
import assignmentsImg from './assets/assignments.png';
import curriculumImg from './assets/curriculum.png';
import progressImg from './assets/progress.png';
import graduationImg from './assets/graduation.png';
import communicationImg from './assets/communication.png';
import enrolmentImg from './assets/enrolment.png';
import personImg from './assets/persons.png';
import homeImg from './assets/home.png';
import classImg from './assets/class.png';
import bankImg from './assets/bank.png';
import borderImg from './assets/border_color.png';
import faceImg from './assets/face.png';
import userImg from './assets/user.png';
import localLaundryServiceImg from './assets/local_laundry_service.png';

import './styles.scss';

const img = {
  assignments: assignmentsImg,
  curriculum: curriculumImg,
  progress: progressImg,
  communication: communicationImg,
  graduation: graduationImg,
  enrolment: enrolmentImg,
  persons: personImg,
  home: homeImg,
  class: classImg,
  bank: bankImg,
  face: faceImg,
  local_laundry_service: localLaundryServiceImg,
  border: borderImg,
  user: userImg,
};

const Block = (props) => {
  const { title, link, label, icon, onClick } = props;

  return (
    <div className="dashboard-block">
      {
        <Link title={title} to={link || '#'} onClick={onClick}>
          <img src={img[icon]} alt="icon" className="icon" />
          <h3>{label}</h3>
        </Link>
      }
    </div>
  );
};

export default Block;
