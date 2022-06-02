import { Office } from '../store/models/Office';

export const generateMenu = (offices: Office[]) => {
  const data = [];
  let locations: string[] = [];

  for (let i = 0; i < offices.length; i++) {
    locations.push(offices[i].location);
  }
  const uniqueLocations: string[] = Array.from(new Set(locations));
  //menu parent elements aka. locations
  for (let i = 1; i <= uniqueLocations.length; i++) {
    data.push({
      id: i,
      parent: 0,
      droppable: true,
      text: uniqueLocations[i - 1],
      data: `/${uniqueLocations[i - 1]}`,
    });
  }

  //menu child elements
  for (let i = 0; i < offices.length; i++) {
    for (let j = 0; j < uniqueLocations.length; j++) {
      if (offices[i].location === uniqueLocations[j]) {
        data.push({
          id: uniqueLocations.length + (i + 1),
          parent: j + 1,
          droppable: false,
          text: offices[i].name,
          data: `/${uniqueLocations[j]}/${offices[i]._id}`,
        });
      }
    }
  }

  return data;
};
