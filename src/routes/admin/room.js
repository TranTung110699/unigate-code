import VenueEditor from 'components/admin/venue/room/edit/index.js';

export default [
  {
    componentId: 'VenueEditor',
    path: '/admin/venue/:iid',
    component: VenueEditor,
    exact: true,
  },
];
