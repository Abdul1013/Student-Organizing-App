function uploadProfilePicture(img) {
  var pic;
  if (img === 1) {
      pic = document.getElementById("uploadPicture");
      pic.addEventListener("change", function(event) {
          var file = event.target.files[0];
          if (file) {
              var reader = new FileReader();
              reader.onload = function(e) {
                  document.getElementById("profilePicture").src = e.target.result;
              };
              reader.readAsDataURL(file);
          }
      });
  } else {
      pic = document.getElementById("profilePicture");
  }
}

// Calculate Grade Points (GP) based on score
function calculateGP(score) {
  if (score >= 70) {
    return 5.00;
  } else if (score >= 60) {
    return 4.00;
  } else if (score >= 50) {
    return 3.00;
  } else if (score >= 45) {
    return 2.75;
  } else if (score >= 40) {
    return 2.50;
  } else if (score >= 35) {
    return 2.25;
  } else if (score >= 30) {
    return 2.00;
  } else if (score >= 0) {
    return 0.00;
  } else {
    return NaN;
  }
}

// Show transcript and calculate CGPA
function calculateCGPA() {
  var transcriptContainer = document.getElementById("transcriptContainer");
  var footer = document.querySelector(".footer");

  transcriptContainer.style.display = "block";
  footer.style.display = "block";

  var table = document.getElementById("transcriptTable");
  var rows = table.rows;
  var sumWGP = 0;
  var sumUnits = 0;

  for (var i = 1; i < rows.length; i++) {
    var unit = parseFloat(rows[i].cells[2].textContent);
    var scoreCell = rows[i].cells[3];
    var score = parseFloat(scoreCell.textContent);

    if (!isNaN(score)) {
      scoreCell.textContent = score;

      var gp = calculateGP(score);
      rows[i].cells[4].textContent = gp.toFixed(2);

      var wgp = unit * gp;
      rows[i].cells[5].textContent = wgp.toFixed(2);

      sumWGP += wgp;
      sumUnits += unit;
    }
  }

  var cgpa = (sumWGP / sumUnits).toFixed(2);
  var classOfDegree;

  if (cgpa >= 4.50) {
    classOfDegree = "First Class";
  } else if (cgpa >= 3.50) {
    classOfDegree = "Second Class Upper";
  } else if (cgpa >= 2.40) {
    classOfDegree = "Second Class Lower";
  } else if (cgpa >= 1.20) {
    classOfDegree = "Third class";
  } else {
    classOfDegree = "Pass";
  }

  document.getElementById("cgpa").textContent = cgpa;
  document.getElementById("class").textContent = classOfDegree;
}

// Add new row for a course
function addCourseRow() {
  var table = document.getElementById("transcriptTable");
  var newRow = table.insertRow(-1);

  newRow.innerHTML = `<td contenteditable="true">  
                        </td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td></td>
                        <td></td>`;
}

// Print result
function printResult() {
  window.print();
}

// Call the calculateCGPA function when the page loads
window.onload = calculateCGPA;


