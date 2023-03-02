// vars
var projForm = document.getElementById("project-form");
var projTableBody = document.getElementById("project-table-body");
var projName = "";
var projType = "";
var projDue = "";
var projNameFromStor = [];
var deleteButton = "";

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

  if (projName.length !== 0 && projDue.length !== 0) {
    addToLocalStore(projName, projType, projDue);
    printProjInfo();

    // closing modal and backdrop
    // https://stackoverflow.com/questions/46577690/hide-bootstrap-modal-using-pure-javascript-on-click
    var modal = document.getElementById("staticBackdrop");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("style", "display: none");
    var modalBackdrops = document.getElementsByClassName("modal-backdrop");
    document.body.removeChild(modalBackdrops[0]);
  } else {
    alert("please fill in fields");
  }
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
  projNameFromStor = JSON.parse(localStorage.getItem("Projects"));
  // clear out tbody so that a fresh array of projects is printed
  projTableBody.textContent = "";

  if (projNameFromStor === null) {
    return;
  } else {
    for (var i = 0; i < projNameFromStor.length; i++) {
      var project = projNameFromStor[i];

      // create row
      var tableRow = document.createElement("tr");
      var tdName = document.createElement("td");
      var tdType = document.createElement("td");
      var tdDate = document.createElement("td");
      var tdButton = document.createElement("button");
      tdButton.setAttribute("type", "button");
      tdButton.setAttribute("id", "delete-button");
      tdButton.setAttribute("aria-label", [i]);

      // insert td Data
      tdName.textContent = project.ProjectName;
      tdType.textContent = project.ProjectType;
      tdDate.textContent = project.ProjectDue;
      tdButton.textContent = "X";

      // add to DOM
      tableRow.append(tdName, tdType, tdDate, tdButton);
      projTableBody.append(tableRow);

      deleteButton = document.getElementById("delete-button");
    }
  }
}

printProjInfo();

//Remove project
projTableBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    var ariaIndex = event.target.getAttribute("aria-label");
    // remove object based on ariaIndex
    projNameFromStor.splice(ariaIndex, 1);
    // set new arr to local storage
    localStorage.setItem("Projects", JSON.stringify(projNameFromStor));
    // print updated arr
    printProjInfo();
  } else {
    console.log("not a button");
  }
});
