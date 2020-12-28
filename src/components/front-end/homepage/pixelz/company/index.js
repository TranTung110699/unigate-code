import React from 'react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import AppImage from './images/app.jpg';
import Thomas from './images/thomas.jpg';
import Janus from './images/janus.jpg';
import Tejs from './images/tejs.jpg';

import './stylesheet.scss';
// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    configureAnchors({ scrollDuration: 1000 });
  }

  render() {
    return (
      <ScrollableAnchor id={'section1'}>
        <section className="bg-secondary pt60 pb0 app" id="goodCompany">
          <div className="container">
            <div className="row mb-xs-24 hidden-md-down mb32">
              <div className="col-sm-12 text-center spread-children-large">
                <img
                  data-sizes="auto"
                  className="mb-xs-24 avatar100 lazyautosizes lazyloaded"
                  alt="Thomas"
                  title="Thomas"
                  src={Thomas}
                />
                <img
                  data-sizes="auto"
                  className="mb-xs-24 avatar100 lazyautosizes lazyloaded"
                  alt="Janus"
                  title="Janus"
                  src={Janus}
                />
                <img
                  data-sizes="auto"
                  className="mb-xs-24 avatar100 lazyautosizes lazyloaded"
                  alt="Tejs"
                  title="Tejs"
                  src={Tejs}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center">
                <h2>World Class Introduction to SAW™</h2>
                <p className="mb24 mb-xs-24">
                  You get edited images back in 24 hours or less while reducing
                  cost, increasing transparency, and gaining more control than
                  ever before.
                </p>
              </div>
            </div>
            <div className="row pt32">
              <img
                data-sizes="auto"
                className="app-image lazyautosizes lazyloaded"
                alt="Screenshot of product image order management in a pixelz account"
                title="Pixelz Work in Photoshop"
                src={AppImage}
              />
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    );
  }
}

export default index;
