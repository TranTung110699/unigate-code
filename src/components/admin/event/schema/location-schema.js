import { required } from 'common/validators';
import { t1 } from 'translate';
import get from 'lodash.get';
import apiUrls from 'api-endpoints/index';

const schema = (formid, values) => {
  return {
    venue_iid: {
      type: 'select',
      floatingLabelText: t1('venue'),
      options: 'async',
      fullWidth: true,
      paramsasync: {
        valueKey: 'iid',
        __url__: `${apiUrls.venue_search}?type=venue`,
      },
      transformData: (venues) => {
        if (!Array.isArray(venues) || !venues.length) {
          return [];
        }
        return [
          {
            value: '',
            label: t1('none'),
          },
        ].concat(
          venues.map((v) => ({
            value: get(v, 'iid'),
            label: get(v, 'name'),
          })),
        );
      },
    },
    room_iids: {
      type: 'select',
      floatingLabelText: t1('rooms'),
      options: 'async',
      multiple: true,
      fullWidth: true,
      paramsasync: {
        valueKey: 'iid',
        key: `venue-${get(values, 'location.venue_iid')}`,
        __url__: `${apiUrls.venue_search}?type=room&parent_iid=${get(
          values,
          'location.venue_iid',
        )}`,
      },
      validate: [required(t1('rooms'))],
    },
  };
};

const ui = () => [
  {
    id: 'default',
    title: t1('location'),
    fields: ['venue_iid', 'room_iids'],
  },
];

export default { schema, ui };
