import { t1 } from 'translate';
import IconFB from './images/facebook-f.png';
import IconYoutube from './images/youtube.png';
import IconOval from './images/oval-copy.png';
import IconTwitter from './images/if_twitter.png';
import IconPinterest from './images/if_pinterest.png';
import IconLinkedin from './images/if_linkedin.png';

const styles = {
  oval: { position: 'relative' },
};

export default (socialLinks) => {
  const socialLinksArr = [];
  Object.getOwnPropertyNames(socialLinks).forEach((key) => {
    switch (key) {
      case 'facebook':
        socialLinksArr.push({
          id: 'facebook',
          link: socialLinks[key],
          label: t1('facebook'),
          alt: 'facebook',
          icon: IconFB,
          iconStyle: styles.oval,
          background: IconOval,
        });
        break;
      case 'linkedin':
        socialLinksArr.push({
          id: 'linkedin',
          link: socialLinks[key],
          label: t1('linkedin'),
          alt: 'linkedin',
          icon: IconLinkedin,
          iconStyle: styles.oval,
          background: IconOval,
        });
        break;
      case 'pinterest':
        socialLinksArr.push({
          id: 'pinterest',
          link: socialLinks[key],
          label: t1('pinterest'),
          alt: 'pinterest',
          icon: IconPinterest,
          iconStyle: styles.oval,
          background: IconOval,
        });
        break;
      case 'twitter':
        socialLinksArr.push({
          id: 'twitter',
          link: socialLinks[key],
          label: t1('twitter'),
          alt: 'twitter',
          icon: IconTwitter,
          iconStyle: styles.oval,
          background: IconOval,
        });
        break;
      case 'youtube':
        socialLinksArr.push({
          id: 'youtube',
          link: socialLinks[key],
          label: t1('youtube'),
          alt: 'youtube',
          icon: IconYoutube,
          iconStyle: styles.oval,
          background: IconOval,
        });
        break;
      default:
        break;
    }
  });
  return socialLinksArr;
};
