// Your code here
function createEmployeeRecord(sourceArray) {
    let obj = {
        firstName: sourceArray[0],
        familyName: sourceArray[1],
        title: sourceArray[2],
        payPerHour: sourceArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj;
}

function createEmployees(sourceArray) {
    return sourceArray.map(function (data) {
        return {
            firstName: data[0],
            familyName: data[1],
            title: data[2],
            payPerHour: data[3],
            timeInEvents: [],
            timeOutEvents: []
        }
    });
}

function createTimeInEvent(obj, time) {
    let obj = Object.assign({}, obj);
    let timeParts = time.split(' ');
    let timeInObj = {
        type: "TimeIn",
        date: timeParts[0],
        hour: parseInt(timeParts[1])
    }
    obj.timeInEvents.push(timeInObj);
    return obj;
}

function createTimeOutEvent(obj, time) {
    let obj = Object.assign({}, obj);
    let timeParts = time.split(' ');
    let timeInObj = {
        type: "TimeOut",
        date: timeParts[0],
        hour: parseInt(timeParts[1])
    }
    obj.timeOutEvents.push(timeInObj);
    return obj;
}

function hoursWorkedOnDate(record, date) {
    let start = record.timeInEvents.find(emp => emp.date === date);
    let end = record.timeOutEvents.find(emp => emp.date === date);
    let startH = start.hour.toString();
    let endH = end.hour.toString();
    let startH = startH.length === 3 ? parseInt(startH.substring(0, 1)) : parseInt(startH.substring(0, 2));
    let endHo = endHo.length === 3 ? parseInt(endHo.substring(0, 1)) : parseInt(endHo.substring(0, 2));
    let total = endHo - startH;
    return total;

}

function wagesEarnedOnDate(record, date) {
    let total = hoursWorkedOnDate(record, date);
    return total * record.payPerHour;
}

function allWagesFor(record) {
    let total = [];
    for (let i = 0; i < record.timeInEvents.length; i++) {
        total.push(wagesEarnedOnDate(record, record.timeInEvents[i].date));
    }
    let finalW = total.reduce((n, l) => n + l, 0);
    return finalW;
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((a, h) => a + allWagesFor(h), 0);
}

function createEmployeeRecords(resume) {
    return resume.map(item => createEmployeeRecord(item));
}

function findEmployeebyFirstName(employeeArray, employeeFun) {
    return employeeArray.find(emp => emp.firstName === employeeFun);
}
