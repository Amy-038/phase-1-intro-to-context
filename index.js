// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    const employeeObject = {}
    employeeObject['firstName'] = firstName;
    employeeObject['familyName'] = familyName;
    employeeObject['title'] = title;
    employeeObject['payPerHour'] = payPerHour;
    employeeObject['timeInEvents'] = [];
    employeeObject['timeOutEvents'] = [];

    return employeeObject;
}

//console.log(createEmployeeRecord(['Amy', 'Sirma', 'relationship officer', 100]))

function createEmployeeRecords([employee, ...otherEmployees]){
    const employeeRecords = [];

    employeeRecords.push(createEmployeeRecord(employee))

    for(const member of otherEmployees){
        employeeRecords.push(createEmployeeRecord(member))
    }
    
    return employeeRecords;
}

//console.log(createEmployeeRecords([['Amy', 'Sirma', 'relationship officer', 100], ['Abigail', 'Jepng\'etich', 'head engineer', 2000]]))

function createTimeInEvent(employeeObject, dateStamp) {
    const dateAndTime = dateStamp.split(' ')
    const time = dateAndTime[1];
    const date = dateAndTime[0]

    const timeInObject = {}
    timeInObject['type'] = "TimeIn";
    timeInObject['date'] = date;
    timeInObject['hour'] = parseInt(time, 10);

    employeeObject['timeInEvents'].push(timeInObject)
    return employeeObject;
}

//console.log(createTimeInEvent(createEmployeeRecord(['Amy', 'Sirma', 'relationship officer', 100]), '2024-13-01 1031'))

function createTimeOutEvent(employeeObject, dateStamp) {
    const dateAndTime = dateStamp.split(' ')
    const time = dateAndTime[1];
    const date = dateAndTime[0]

    const timeOutObject = {}
    timeOutObject['type'] = "TimeOut";
    timeOutObject['date'] = date;
    timeOutObject['hour'] = parseInt(time, 10);

    employeeObject['timeOutEvents'].push(timeOutObject)
    return employeeObject;
}

function hoursWorkedOnDate(employeeObject, formDate) {
    const dayConsideredArrival = employeeObject['timeInEvents'].find(day => day.date === formDate)
    const dayConsideredDeparture = employeeObject['timeOutEvents'].find(day => day.date === formDate)

    const arrivalTime = dayConsideredArrival['hour']
    const departureTime = dayConsideredDeparture['hour']

    return (departureTime - arrivalTime)/100
}

//console.log(hoursWorkedOnDate())

function wagesEarnedOnDate(employeeObject, formDate) {
    const payOwed = employeeObject['payPerHour']

    return payOwed * hoursWorkedOnDate(employeeObject, formDate)
}

function allWagesFor(employeeObject) {
    const timeInEvents = employeeObject['timeInEvents'];

    let totalWages = 0;

    for (const timeInEvent of timeInEvents) {
        const formDate = timeInEvent.date;
        const wagesForDate = wagesEarnedOnDate(employeeObject, formDate);
        totalWages += wagesForDate;
    }

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let payroll = 0

    for (const employee of employeeRecords) {
        const perEmployee = allWagesFor(employee)
        payroll += perEmployee
    }

    return payroll
}
