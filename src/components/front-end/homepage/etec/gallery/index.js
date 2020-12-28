/**
 * Created by DVN on 9/19/2017.
 */
/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import './stylesheet.scss';

const data = [
  {
    picture:
      'https://www.askideas.com/media/17/Orange-Maine-Coon-Cat-Face-Picture.jpg',
    name: 'HomeGrown',
    id: 1,
  },
  {
    picture:
      'https://www.askideas.com/media/17/Orange-Maine-Coon-Cat-Face-Picture.jpg',
    name: 'HomeGrown',
    id: 2,
  },
  {
    picture:
      'https://www.askideas.com/media/17/Orange-Maine-Coon-Cat-Face-Picture.jpg',
    name: 'HomeGrown',
    id: 3,
    actived: 1,
  },
  {
    picture:
      'https://www.askideas.com/media/17/Orange-Maine-Coon-Cat-Face-Picture.jpg',
    name: 'HomeGrown',
    id: 4,
  },
  {
    picture:
      'https://www.askideas.com/media/17/Orange-Maine-Coon-Cat-Face-Picture.jpg',
    name: 'HomeGrown',
    id: 5,
  },
];

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 3 };
  }

  componentDidMount() {
    document.getElementById('gallery-id-3').checked = true;
  }

  render() {
    return (
      <div className="gallery-list">
        {data.map((item) => (
          <div key={item.id} className="gallery-item">
            <input type="radio" name="gallery" id={`gallery-id-${item.id}`} />
            <li className="gallery-child-item">
              <label htmlFor={`gallery-id-${item.id}`}>
                <img src={item.picture} alt={item.name} />
                <span className="name">{item.name}</span>
                <span className="description">Good morning</span>
              </label>
            </li>
          </div>
        ))}
      </div>
    );
  }
}

export default Gallery;
