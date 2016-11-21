/*
  Hard coded constants used throughout app
*/

// Generates a unique ID
const generateUUID = () => {
  var d = new Date().getTime();
  if(window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

// Generates a unique ID
export const generateSID = () => {
  var d = new Date().getTime();
  if(window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
  }
  var sid = 'xxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return sid;
};


// SET Select input options HERE
export const SELECT_OPTS = [
  { val: 'Under 18', option: 'Under 18' },
  { val: 'Over 18', option: '18 and Older' }
];

// SET Checkbox input options HERE
export const CHECK_OPTS = [
  {name: '__TOUREQ__', id: 'MEALS', label: 'Meals'},
  {name: '__TOUREQ__', id: 'LODGING', label: 'Lodging'},
  {name: '__TOUREQ__', id: 'TRANSPORTATION', label: 'Transportation'}
];

export const DENY_CHECK_OPTS = [
  { name: '__DENY__', id: '__NODATE__', label: 'Date unavailable' },
  { name: '__DENY__', id: '__NOSTAFF__', label: 'Lack of Gemini staff available for specified date' },
  { name: '__DENY__', id: '__TOOLARGE__', label: 'Tour group is too large' },
  { name: '__DENY__', id: '__OPSCONF__', label: 'Operations conflict' },
  { name: '__DENY__', id: '__LACKPERMIT__', label: 'Lack of required Office of Mauna Kea Permit' },
  { name: '__DENY__', id: '__OTHER__', label: 'Other' }
];

// TEST; Autocomplete
export const autocomplete_data = {
  "AirBnB": null,
  "Apple": null,
  "Google": null,
  "IBM": null,
  "Microsoft": null
};

export const MEMBER_HEADERS = [
  { key: 'Name', header: 'Name' },
  { key: 'Age', header: 'Age' },
  { key: 'Disability', header: 'Disability' }
];

// For footer information
export const LINKS = [
  { href: '#', name: 'Development', icon: 'dashboard' },
  { href: '#', name: 'Science', icon: 'polymer' },
  { href: '#', name: 'Administration' , icon: 'supervisor_account'},
  { href: '#', name: 'Safety', icon: 'verified_user' },
  { href: '#', name: 'ITS', icon: 'assessment' }
];

// Headers of the tour tables
export const HEADERS = [
  { key: 'type', header: 'Type' },
  { key: 'name', header: 'Name' },
  { key: 'date', header: 'Date' },
  { key: 'time', header: 'Time' },
  { key: 'organization', header: 'Organization' },
  { key: 'guests', header: 'Guests' },
  { key: 'status', header: 'Status' }
];

/* END */
