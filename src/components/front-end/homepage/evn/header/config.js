import get from 'lodash.get';

const config = (homepageSlider) => {
  const listBanners =
    homepageSlider &&
    homepageSlider.map((value, index) => ({
      id: `banner-${index}`,
      title: get(value, 'title', ''),
      subtitle: get(value, 'subtitle', ''),
      avatar: get(value, 'avatar', ''),
      mobile_avatar: get(value, 'mobile_avatar', ''),
    }));
  return listBanners;
};

export default config;
