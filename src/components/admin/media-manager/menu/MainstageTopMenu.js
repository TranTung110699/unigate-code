import { getUrl } from 'routes/links/common';
import { t2 } from 'translate';

const media = () => [
  {
    id: 'media',
    href: getUrl('media-manager'),
    label: t2('file_manager_(deprecated_version)'),
    icon: 'home',
  },
];
export default media;
