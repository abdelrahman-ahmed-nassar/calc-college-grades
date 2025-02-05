////////////////////////////////////////////////////
// ! DATA

// const subjectsArr = [
//   ["math", 200],
//   ["drawing", 200],
//   ["descriptive", 200],
//   ["physics", 200],
//   ["mechanics", 150],
//   ["production", 100],
//   ["chemistry", 100],
//   ["computer", 100],
//   ["technology", 100],
//   ["faith", 100],
//   ["law", 100],
//   ["quran", 100],
//   ["english", 50],
// ];

const subjectsArr = [
    ["math", 150],
    ["Electronics", 150],
    ["Circuits", 100],
    ["Programming", 100],
    ["Measurement", 100],
    ["english", 100],
  ];

const classifications = [
  { name: "Excellent", code: "A", max: 1, min: 0.85, average: 0.925 },
  { name: "Very good", code: "B", max: 0.85, min: 0.75, average: 0.8 },
  { name: "Good", code: "C", max: 0.75, min: 0.65, average: 0.7 },
  { name: "acceptable", code: "D", max: 0.65, min: 0.5, average: 0.575 },
  { name: "Failure", code: "F", max: 0.5, min: 0.25, average: 0.375 },
  { name: "very failure", code: "G", max: 0.25, min: 0.1, average: 0.125 },
  { name: "Failed", code: "J", max: 0.1, min: -0.1, average: 0 },
];

/////////////////////////////////////////////
// !HTML
let optionEl = ``;

for (let i = 0; i < classifications.length; i++) {
  let tempOptionEl = `
              <option value="${classifications[i].code}">${classifications[i].name}</option>
  `;
  optionEl += tempOptionEl;
}
let subjectsEl = ``;
for (let i = 0; i < subjectsArr.length; i++) {
  let subjectName = subjectsArr[i][0];
  let tempSubjectEl = `
          <div class="form-group">
          <label for="${subjectName}">${subjectName}</label>
          <select id="${subjectName}" name="${subjectName}">
            ${optionEl}
          </select>
        </div>`;
        subjectsEl += tempSubjectEl;
}
subjectsEl += `<button type="button" onclick="calculate()">احسب التقدير</button>`;
let gradesFormEl = document.querySelector("#gradesForm");
gradesFormEl.innerHTML = subjectsEl;

////////////////////////////////////
// !LOGIC

let subjects = [];
let totalMarks = 0;

for (let subject of subjectsArr) {
  // creating object according to degree
  subjects.push({
    name: subject[0],
    degree: subject[1],
    maxCurrent: 0,
    minCurrent: 0,
    averageCurrent: 0,
  });
  totalMarks += subject[1];
}

function getGrade(grade) {
  for(let i = 0; i <classifications.length; i++) {
    if (grade >= classifications[i].min && grade <= classifications[i].max) {
      return classifications[i].name;
    }
  }
}

function calcPercentage(degree) {
  return ((degree / totalMarks) * 100).toFixed(2);
}

//*  calc the grade 
function calculate() {
  // get the degrees
  let maxSum = 0;
  let minSum = 0;
  let averageSum = 0;
  for (let i = 0; i < subjects.length; i++) {
    const degreeClass = document.getElementById(`${subjects[i].name}`).value;
    const degreeClassObject = classifications.find(
      (obj) => obj.code === degreeClass
    );
    // adjust the object
    subjects[i].maxCurrent = subjects[i].degree * degreeClassObject.max;
    subjects[i].minCurrent = subjects[i].degree * degreeClassObject.min;
    subjects[i].averageCurrent = subjects[i].degree * degreeClassObject.average;

    // calc the sum
    maxSum += subjects[i].maxCurrent;
    minSum += subjects[i].minCurrent;
    averageSum += subjects[i].averageCurrent;
  }
  // print output
  document.getElementById("grade").textContent = ` التقدير العام: ${getGrade(
    averageSum / totalMarks
  )}`;
  document.getElementById(
    "maxGrade"
  ).textContent = ` أعلى تقدير ممكن: %${calcPercentage(maxSum.toFixed(2))}`;
  document.getElementById(
    "minGrade"
  ).textContent = ` أقل تقدير ممكن: %${calcPercentage(minSum.toFixed(2))}`;
  document.getElementById(
    "averageGrade"
  ).textContent = ` المتوسط: %${calcPercentage(averageSum.toFixed(2))}`;
}
