// Prompt user for name
// var studentName = prompt("Please enter your name:");
// var studentNameElement = document.getElementById("studentName");
// studentNameElement.textContent = studentName;

// Prompt user for department
// [var department = prompt("Please enter your department:");
// var departmentElement = document.getElementById("department");
// departmentElement.textContent = department;]

// User to upload img
function handleFileSelect(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var image = document.getElementById('preview');
    image.src = event.target.result;
  };

  reader.readAsDataURL(file);
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

  newRow.innerHTML = `<td contenteditable="true"> <select name="Course" size="1" id="">
                            <option value="" selected>MTH 111</option>
                            <option value="" >SEN 101</option>
                            <option value="" >CSC 112</option>
                            <option value="" >GST 105</option>
                            <option value="" >CSC 111</option>
                            <option value="" >CSC 113</option>
                            <option value="" >STT 112</option>
                            <option value="" >MTH 112</option>
                            <option value="" >PHY 111</option>
                            <option value="" >PHY 117</option>
                            </select>
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


//code for course page
document.addEventListener('DOMContentLoaded', function() {
  const courseForm = document.getElementById('courseForm');
  const courseNameInput = document.getElementById('courseName');
  const semesterInput = document.getElementById('semester');
  const courseList = document.getElementById('courseList');

  const timetableForm = document.getElementById('timetableForm');
  const classTitleInput = document.getElementById('classTitle');
  const classTimeInput = document.getElementById('classTime');
  const timetableList = document.getElementById('timetableList');

  // Function to create a new course item
  function createCourseItem(courseName, semester) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${courseName} - ${semester}`;

      // Add buttons for editing and deleting courses
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function() {
          // Allow users to edit course name and semester
          const updatedCourseName = prompt('Edit course name:', courseName);
          const updatedSemester = prompt('Edit semester:', semester);

          if (updatedCourseName && updatedSemester) {
              listItem.innerHTML = `${updatedCourseName} - ${updatedSemester}`;
          }
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
          // Remove the course item from the list
          courseList.removeChild(listItem);
      });

      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      return listItem;
  }

  // Function to create a new class item
  function createClassItem(classTitle, classTime) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${classTitle} - ${classTime}`;

      // Add a button to delete the class
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
          // Remove the class item from the list
          timetableList.removeChild(listItem);
      });

      listItem.appendChild(deleteButton);

      return listItem;
  }

  courseForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const courseName = courseNameInput.value;
      const semester = semesterInput.value;

      if (courseName && semester) {
          // Create a new course item and add it to the list
          const listItem = createCourseItem(courseName, semester);
          courseList.appendChild(listItem);

          // Clear the form inputs
          courseNameInput.value = '';
          semesterInput.value = '';
      }
  });

  timetableForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const classTitle = classTitleInput.value;
      const classTime = classTimeInput.value;

      if (classTitle && classTime) {
          // Create a new class item and add it to the list
          const listItem = createClassItem(classTitle, classTime);
          timetableList.appendChild(listItem);

          // Clear the form inputs
          classTitleInput.value = '';
          classTimeInput.value = '';
      }
  });
});