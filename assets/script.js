// vars
var projForm = document.getElementById("project-form");
var projTable = document.getElementById("project-table");
var projTableBody = document.getElementById("project-table-body");
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

  addToLocalStore(projName, projType, projDue);
}

projForm.addEventListener("submit", getFormInputs);

// add input values to local storage
function addToLocalStore(name, type, due) {
  // check if local storage is not empty
  if (localStorage.getItem("Projects") !== null) {
    // if not empty then get existing array and add to it or else it will overwrite
    var existingProj = JSON.parse(localStorage.getItem("Projects"));
    var storageObj = {
      ProjectName: name,
      ProjectType: type,
      ProjectDue: due,
    };
    existingProj.push(storageObj);
    localStorage.setItem("Projects", JSON.stringify(existingProj));
  } else {
    // if storage is empty just simply add new arr
    var storageArr = [];
    var storageObj = {
      ProjectName: name,
      ProjectType: type,
      ProjectDue: due,
    };
    storageArr.push(storageObj);
    localStorage.setItem("Projects", JSON.stringify(storageArr));
  }
}

// print project details to the page
function printProjInfo() {
  var projNameFromStor = JSON.parse(localStorage.getItem("Projects"));
  console.log(projNameFromStor);

  for (var i = 0; i < projNameFromStor.length; i++) {
    var project = projNameFromStor[i];

    // create row
    var tableRow = document.createElement("tr");
    var tdName = document.createElement("td");
    var tdType = document.createElement("td");
    var tdDate = document.createElement("td");

    // insert td Data
    tdName.textContent = project.ProjectName;
    tdType.textContent = project.ProjectType;
    tdDate.textContent = project.ProjectDue;

    // add to DOM
    tableRow.append(tdName, tdType, tdDate);
    projTableBody.append(tableRow);
  }
}

printProjInfo();
