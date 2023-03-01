// vars
var projForm = document.getElementById("project-form");
var projTable = document.getElementById("project-table");
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

  addToLocalStore(projName + " Project", projName);
  addToLocalStore(projName + " Project Type", projType);
  addToLocalStore(projName + " Project Due", projDue);

  printProjInfo();
}

projForm.addEventListener("submit", getFormInputs);

// add input values to local storage
function addToLocalStore(desc, value) {
  localStorage.setItem(desc, value);
}

// print project details to the page
function printProjInfo() {
  console.log(projTable);

  var tableRow = document.createElement("tr");
  var tableData = document.createElement("td");

  tableRow.appendChild(tableData);
  projTable.appendChild(tableRow);
  // TODO: This data should be coming from LocalStorage though
  tableData.textContent = projName;
}
