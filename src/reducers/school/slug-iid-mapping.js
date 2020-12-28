/**
 * Created by vohung on 02/07/2017.
 */

function slugIidMapping(state = {}, action) {
  switch (action.type) {
    case 'SLUGS_IID_MAPPING': {
      const { slug, iid } = action;
      return {
        ...state,
        [slug]: iid,
      };
    }
    default: {
      return state;
    }
  }
}

export default slugIidMapping;
