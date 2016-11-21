/*
  Alexander Self
  10/6/2016

  ** Helper functions **

*/


export function firstCharToUpper(str) {
  if (str === undefined) return;
  let s = str.split('');
  s[0] = s[0].toUpperCase();
  return s.join('');
}

export function getStatus(status) {
  let s = "New";
  switch (status) {
    case "0":
      return s;
    case "1":
      s = "Pending";
      return s;
    case "2":
      s = "Approved";
      return s;
    case "3":
      s = "Denied";
      return s;
    case "4":
      s = "Completed";
      return s;
    case "5":
      s = "Cancelled";
      return s;
    default:
      return s;
  }
}

// When single tour is displayed; async fill in form values in the assign tour form
// Called in selectTour()
export function fillValues (state) {
  if (!state.assignTour[0]) return;
  else {
    state = state.assignTour[0];
    window.setTimeout(() => {
      $("#__SIZE__").val(state.tourSize);
      $("#__DATE__").val(state.tourDate);
      $("#__TTIME__").val(state.tourTime);
      $("#__GUIDEX__").val(state.tourGuide);
      $("#__MINORS__").val(state.numMinors);
      $("#__INSTRUCTOR__").val(state.briefInstructor);
      $("#__LOC__").val(state.briefLocation);
      $("#__BTIME__").val(state.briefTime);
      $(`input[name=__FORMS__][value=${state.signedForms}]`).prop('checked', true);
      setChecked(state.MEALS, 'MEALS');
      setChecked(state.LODGING, 'LODGING');
      setChecked(state.TRANSPORTATION, 'TRANSPORTATION');
    }, 1000);
  }
}

// Resets all values in the assign tour form when the user clicks the Back button
// Called in updateTours()
export function resetValues() {
  window.setTimeout(() => {
    $("#__SIZE__").val("");
    $("#__DATE__").val("");
    $("#__TTIME__").val("");
    $("#__GUIDEX__").val("");
    $("#__MINORS__").val("");
    $("#__INSTRUCTOR__").val("");
    $("#__LOC__").val("");
    $("#__BTIME__").val("");
    $(`input[name=__FORMS__]`).prop('checked', false);
    $(`#MEALS`).prop('checked', false);
    $(`#LODGING`).prop('checked', false);
    $(`#TRANSPORTATION`).prop('checked', false);
  }, 1000);
}

// Slide in front page and show all tours
export function slideFrontPage() {
  $(`#single-tour-display`).fadeOut(`slow`, () => {
    $(`#table-tour-display`).slideToggle(`slow`);
  });
}

// Slide out front page and show single tour
export function slideOutFrontPage() {
  $(`#table-tour-display`).slideToggle(`slow`, () => {
    $(`#single-tour-display`).fadeIn(`slow`);
  });
}

function setChecked(item, id) {
  switch (item) {
    case '0':
      $(`#${id}`).prop('checked', false);
      break;
    case '1':
      $(`#${id}`).prop('checked', true);
      break;
    default:
      $(`#${id}`).prop('checked', false);
  }
}

// Checks whether all signatures have been collected prior to tour assignment
export function checkStatus(state) {
  const assign_msg = `<b>${state.main.pocName} tour has been assigned!</b>`;
  if (state.signatures.length === 3) {
    Materialize.toast(assign_msg, 3000, 'rounded green');
    return 1;
  } else {
    Materialize.toast("All signatures are required prior to assignment", 3000, "rounded red");
    return 0;
  }
}




















/* END */
