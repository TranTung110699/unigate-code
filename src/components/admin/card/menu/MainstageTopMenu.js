import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const CardsMenu = () => [
  {
    id: 'card_package',
    href: getUrl('card/card-package'),
    label: t1('card_package'),
    icon: 'home',
  },
  {
    id: 'new_card_package',
    href: getUrl('card/new-package'),
    label: t1('new_card_package'),
    icon: 'home',
  },
  {
    id: 'search_card',
    href: getUrl('card/search-card'),
    label: t1('search_card'),
    icon: 'home',
  },
];

export default CardsMenu;
