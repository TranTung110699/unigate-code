import { VenueTypeValue } from 'configs/constants';

const unFloorName = 'không xác định';

export const getRootVenue = (venueList) => {
  if (!venueList || venueList.length === 0) {
    return [];
  }
  const venueResults = [];

  venueList.map((venue) => {
    if (venue.type === VenueTypeValue.REVENUE) {
      venueResults.push(venue);
    }
  });
  return venueResults;
};

export const getFloorsOfVenue = (venueList, venueIid) => {
  if (!venueList || venueList.length === 0 || !venueIid) {
    return [];
  }
  const floorsResults = [];
  const floorsObjects = {};
  venueList.map((venue) => {
    if (venue.parent_iid === venueIid) {
      let key = venue.floor_number;
      if (key === undefined) {
        key = unFloorName;
      }
      let floor = floorsObjects[key];
      if (floor === undefined) {
        let floorName = {
          name: `Floor ${key}`,
          iid: key,
        };
        floorsResults.push(floorName);
        floorsObjects[key] = floorName;
      }
    }
  });
  return floorsResults;
};

export const getRoomsOfVenueAndFloor = (venueList, venueIid, floorIid) => {
  if (
    !venueList ||
    venueList.length === 0 ||
    !venueIid ||
    floorIid === undefined
  ) {
    return [];
  }
  const roomResults = [];
  let floor = floorIid;
  if (floorIid === unFloorName) {
    floor = undefined;
  }
  venueList.map((venue) => {
    if (venue.parent_iid === venueIid && venue.floor_number === floor) {
      roomResults.push(venue);
    }
  });
  return roomResults;
};
