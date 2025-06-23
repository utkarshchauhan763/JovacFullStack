// Student Record System
let student = {
    name: "Alice",
    age: 20,
    grade: "B",
    subjects: ["Math", "English"]
};

function addSubject(subject) {
    student.subjects.push(subject);
}

function updateGrade(newGrade) {
    student.grade = newGrade;
}

function displayInfo() {
    console.log(student);
}

// Example usage:
addSubject("Science");
updateGrade("A");
displayInfo();