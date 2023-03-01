// vars
var projForm = document.getElementById("project-form");
var projName = "";
var projType = "";
var projDue = "";

// update time every second
function displayCurrTime() {
  var dateArea = document.getElementById("date");
  var currDate = dayjs().format("dddd, MMMM D YYYY, h:mm a");
  dateArea.textContent = currDate;
}
displayCurrTime();
setInterval(displayCurrTime, 1000);

// capture form data
function getFormInputs(event) {
  event.preventDefault();
  projName = document.getElementById("project-name").value;
  projType = document.getElementById("project-type").value;
  projDue = document.getElementById("project-date").value;

  addToLocalStore("Project Name", projName);
  addToLocalStore("Project Type", projType);
  addToLocalStore("Project Due", projDue);
}

projForm.addEventListener("submit", getFormInputs);

// add input values to local storage
function addToLocalStore(desc, value) {
  localStorage.setItem(desc, value);
}
