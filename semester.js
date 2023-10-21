const semesters = [];
let selectedSemesterIndex = -1;

function addSemester() {
    const semesterName = document.getElementById("semester-name").value.trim();
    if (semesterName !== "") {
        semesters.push({ name: semesterName, courses: [] });
        renderSemesters();
        document.getElementById("semester-name").value = "";
    }
}

function renderSemesters() {
    const semesterList = document.getElementById("semester-list");
    semesterList.innerHTML = "";
    semesters.forEach((semester, index) => {
        const li = document.createElement("li");
        li.textContent = semester.name;
        li.addEventListener("click", () => selectSemester(index));
        semesterList.appendChild(li);
    });
}

function selectSemester(index) {
    selectedSemesterIndex = index;
    const selectedSemester = semesters[index];
    const selectedSemesterText = selectedSemester ? `Selected Semester: ${selectedSemester.name}` : "Selected Semester: None";
    document.getElementById("selected-semester-name").textContent = selectedSemesterText;
    renderCourses();
}

function addCourse() {
    if (selectedSemesterIndex !== -1) {
        const courseName = document.getElementById("course-name").value.trim();
        if (courseName !== "") {
            const selectedSemester = semesters[selectedSemesterIndex];
            selectedSemester.courses.push(courseName);
            renderCourses();
            document.getElementById("course-name").value = "";
        }
    }
}

function editCourse() {
    if (selectedSemesterIndex !== -1 && selectedCourseIndex !== -1) {
        const newCourseName = prompt("Enter new course name:");
        if (newCourseName !== null && newCourseName.trim() !== "") {
            const selectedSemester = semesters[selectedSemesterIndex];
            selectedSemester.courses[selectedCourseIndex] = newCourseName;
            renderCourses();
        }
    }
}

function deleteCourse() {
    if (selectedSemesterIndex !== -1 && selectedCourseIndex !== -1) {
        if (confirm("Are you sure you want to delete this course?")) {
            const selectedSemester = semesters[selectedSemesterIndex];
            selectedSemester.courses.splice(selectedCourseIndex, 1);
            renderCourses();
            selectedCourseIndex = -1;
        }
    }
}

function renderCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";
    if (selectedSemesterIndex !== -1) {
        const selectedSemester = semesters[selectedSemesterIndex];
        selectedSemester.courses.forEach((course, index) => {
            const li = document.createElement("li");
            li.textContent = course;
            li.addEventListener("click", () => selectCourse(index));
            courseList.appendChild(li);
        });
    }
}

function selectCourse(index) {
    selectedCourseIndex = index;
    document.getElementById("course-actions").style.display = "block";
}

// function renderCourses() {
//     const courseList = document.getElementById("course-list");
//     courseList.innerHTML = "";
//     if (selectedSemesterIndex !== -1) {
//         const selectedSemester = semesters[selectedSemesterIndex];
//         selectedSemester.courses.forEach((course) => {
//             const li = document.createElement("li");
//             li.textContent = course;
//             courseList.appendChild(li);
//         });
//     }
// }

let selectedAssignmentIndex = -1;

function addAssignment() {
    if (selectedSemesterIndex !== -1 && selectedCourseIndex !== -1) {
        const assignmentName = document.getElementById("assignment-name").value.trim();
        if (assignmentName !== "") {
            const selectedSemester = semesters[selectedSemesterIndex];
            const selectedCourse = selectedSemester.courses[selectedCourseIndex];
            if (!selectedCourse.assignments) {
                selectedCourse.assignments = [];
            }
            selectedCourse.assignments.push(assignmentName);
            renderAssignments();
            document.getElementById("assignment-name").value = "";
        }
    }
}

function editAssignment() {
    if (selectedSemesterIndex !== -1 && selectedCourseIndex !== -1 && selectedAssignmentIndex !== -1) {
        const newAssignmentName = prompt("Enter new assignment name:");
        if (newAssignmentName !== null && newAssignmentName.trim() !== "") {
            const selectedSemester = semesters[selectedSemesterIndex];
            const selectedCourse = selectedSemester.courses[selectedCourseIndex];
            selectedCourse.assignments[selectedAssignmentIndex] = newAssignmentName;
            renderAssignments();
        }
    }
}

function deleteAssignment() {
    if (selectedSemesterIndex !== -1 && selectedCourseIndex !== -1 && selectedAssignmentIndex !== -1) {
        if (confirm("Are you sure you want to delete this assignment?")) {
            const selectedSemester = semesters[selectedSemesterIndex];
            const selectedCourse = selectedSemester.courses[selectedCourseIndex];
            selectedCourse.assignments.splice(selectedAssignmentIndex, 1);
            renderAssignments();
            selectedAssignmentIndex = -1;
        }
    }
}

function renderAssignments() {
    const assignmentList = document.getElementById("assignment-list");
    assignmentList.innerHTML = "";
    if (selectedSemesterIndex !== -1 && selectedCourseIndex !== -1) {
        const selectedSemester = semesters[selectedSemesterIndex];
        const selectedCourse = selectedSemester.courses[selectedCourseIndex];
        if (selectedCourse.assignments) {
            selectedCourse.assignments.forEach((assignment, index) => {
                const li = document.createElement("li");
                li.textContent = assignment;
                li.addEventListener("click", () => selectAssignment(index));
                assignmentList.appendChild(li);
            });
        }
    }
}

function selectAssignment(index) {
    selectedAssignmentIndex = index;
    document.getElementById("assignment-actions").style.display = "block";
}

function editSemester() {
    if (selectedSemesterIndex !== -1) {
        const newSemesterName = prompt("Enter new semester name:");
        if (newSemesterName !== null && newSemesterName.trim() !== "") {
            semesters[selectedSemesterIndex].name = newSemesterName;
            renderSemesters();
            document.getElementById("selected-semester-name").textContent = `Selected Semester: ${newSemesterName}`;
        }
    }
}

function deleteSemester() {
    if (selectedSemesterIndex !== -1) {
        if (confirm("Are you sure you want to delete this semester?")) {
            semesters.splice(selectedSemesterIndex, 1);
            selectedSemesterIndex = -1;
            renderSemesters();
            document.getElementById("selected-semester-name").textContent = "Selected Semester: None";
            document.getElementById("course-list").innerHTML = "";
        }
    }
}

