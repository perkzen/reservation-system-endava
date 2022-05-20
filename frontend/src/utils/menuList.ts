import { Office } from '../store/models/Office';

//overriding if DB elements change
let json: any;

export const generateMenu = (offices: Office[]) => {
  const data: object[] = [];
  let locations: string[] = [];
  for (let i = 0; i < offices.length; i++) {
    locations.push(offices[i].location);
  }
  // @ts-ignore
  let uniqueLocations: string = [...new Set(locations)];
  //menu parent elements aka. locations
  for (let i = 1; i <= uniqueLocations.length; i++) {
    const json_object = {
      id: i,
      parent: 0,
      droppable: true,
      text: uniqueLocations[i - 1],
    };
    data.push(json_object);
  }

  //menu child elements
  for (let i = 0; i < offices.length; i++) {
    for (let j = 0; j < uniqueLocations.length; j++) {
      if (offices[i].location === uniqueLocations[j]) {
        const json_object = {
          id: offices[i]._id, //uniqueLocations.length + (i + 1) if we want id sequence, we need uuid's ?
          parent: j,
          droppable: false,
          text: offices[i].name,
        };
        data.push(json_object);
      }
    }
  }

  json = JSON.stringify(data);
  console.log(json);
};
