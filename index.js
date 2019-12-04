function createEmployeeRecord(arr){
  let empObj = {
    firstName:arr[0],
    familyName:arr[1],
    title:arr[2],
    payPerHour:arr[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
  return empObj;
}

function createEmployees(arr){
  return arr.map(function(e){
    return {
      firstName:e[0],
      familyName:e[1],
      title:e[2],
      payPerHour:e[3],
      timeInEvents:[],
      timeOutEvents:[]
    }
  });
}

function createTimeInEvent(obj,time){
  let newObj = Object.assign({},obj);
  let timeParts = time.split(' ');
  let timeInObj = {
    type:"TimeIn",
    date: timeParts[0],
    hour: parseInt(timeParts[1])
  }
  newObj.timeInEvents.push(timeInObj);
  return newObj;
}

function createTimeOutEvent(obj,time){
  let newObj = Object.assign({},obj);
  let timeParts = time.split(' ');
  let timeInObj = {
    type:"TimeOut",
    date: timeParts[0],
    hour: parseInt(timeParts[1])
  }
  newObj.timeOutEvents.push(timeInObj);
  return newObj;
}

function hoursWorkedOnDate(record,date){
  let startTime = record.timeInEvents.find(ele=>ele.date === date);
  let EndTime = record.timeOutEvents.find(ele=>ele.date === date);
  let startHour = startTime.hour.toString();
  let endHour = EndTime.hour.toString();
  let startH = startHour.length === 3 ? parseInt(startHour.substring(0,1)) :parseInt(startHour.substring(0,2));
  let endH = endHour.length === 3 ? parseInt(endHour.substring(0,1)) : parseInt(endHour.substring(0,2));
  let sum = endH - startH;
  return sum;

}

function wagesEarnedOnDate(record,date){
  let sum = hoursWorkedOnDate(record,date);
  return sum * record.payPerHour;
}

function allWagesFor(record){
  let sum = [];
  for(let i = 0; i < record.timeInEvents.length; i++){
    sum.push(wagesEarnedOnDate(record,record.timeInEvents[i].date));
  }
  let final = sum.reduce((acc, cur) => acc + cur, 0);
  return final;
}

function calculatePayroll(empArr){
  return empArr.reduce((m, e) => m + allWagesFor(e), 0);
}

function createEmployeeRecords(cvs){
  return cvs.map(item=>createEmployeeRecord(item));
}

function findEmployeeByFirstName(empArr,empFN){
  return empArr.find(emp=>emp.firstName === empFN);
}