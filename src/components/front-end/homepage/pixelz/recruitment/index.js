import React from 'react';
import LoginForm from 'components/user/auth/login/Login';
import './stylesheet.scss';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderIntroVideoDescription = () => (
    <React.Fragment>
      <h3 className="recruitment-video-fun">
        Pixelz Recruitment Video Fun Stuff
      </h3>
      <p className="recruitment-video-fun-desc">
        Foundry offers you the modularity and ease-of-use of a template with the
        style and aesthetic of contemporary, bespoke web design.
      </p>
    </React.Fragment>
  );

  render() {
    const { layout, introVideoId } = this.props;
    const videoId =
      introVideoId && layout && ['evn'].includes(layout)
        ? introVideoId
        : '120433187';

    return (
      <section className="bg-secondary recuitment-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-6 text-center mb-xs-24">
              <div className="embed-video-container embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={`https://player.vimeo.com/video/${videoId}?badge=0&amp;title=0&amp;byline=0&amp;title=0`}
                  allowFullScreen="allowfullscreen"
                />
              </div>
            </div>
            <div className="col-md-4 col-md-offset-1 col-sm-5 col-sm-offset-1">
              {layout && ['evn'].includes(layout) ? (
                <LoginForm />
              ) : (
                this.renderIntroVideoDescription()
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default index;
