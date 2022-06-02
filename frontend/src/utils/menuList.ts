import { Office } from '../store/models/Office';

let data: any;

export const generateMenu = (offices: Office[]) => {
  data = [];
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

export const activeItem = (currentOffice?: Office) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].text === currentOffice?.name) {
      return data[i].text;
    }
  }
};
