import { getBuyPackageUrl } from './links/common';
import BuyCourse from '../components/buy-package/list-package';
import Cart from '../components/buy-package/cart';
import Checkout from '../components/buy-package/checkout';

export default (rootUrl) => [
  {
    componentId: 'listPackage',
    path: getBuyPackageUrl(),
    component: BuyCourse,
    exact: true,
  },
  {
    componentId: 'cartPackage',
    path: getBuyPackageUrl('cart/:iid'),
    component: Cart,
  },
  {
    componentId: 'checkoutPackage',
    path: getBuyPackageUrl('checkout'),
    component: Checkout,
    exact: true,
  },
];
