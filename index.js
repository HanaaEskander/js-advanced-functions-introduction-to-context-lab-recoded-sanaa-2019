function createEmployeeRecord(array){
    let empObj = {
      firstName:array[0],
      familyName:array[1],
      title:array[2],
      payPerHour:array[3],
      timeInEvents:[],
      timeOutEvents:[]
    }
    return empObj;
  }
  
  function createEmployees(array){
    return array.map(function(data){
      return {
        firstName:data[0],
        familyName:data[1],
        title:data[2],
        payPerHour:data[3],
        timeInEvents:[],
        timeOutEvents:[]
      }
    });
  }
  
  function createTimeInEvent(obj,time){
    let empObj2 = Object.assign({},obj);
    let timeParts = time.split(' ');
    let timeInObj = {
      type:"TimeIn",
      date: timeParts[0],
      hour: parseInt(timeParts[1])
    }
    empObj2.timeInEvents.push(timeInObj);
    return empObj2;
  }
  
  function createTimeOutEvent(obj,time){
    let empObj3 = Object.assign({},obj);
    let timeParts = time.split(' ');
    let timeInObj = {
      type:"TimeOut",
      date: timeParts[0],
      hour: parseInt(timeParts[1])
    }
    empObj3.timeOutEvents.push(timeInObj);
    return empObj3;
  }
  
  function hoursWorkedOnDate(record,date){
    let startT = record.timeInEvents.find(ele=>ele.date === date);
    let EndTime = record.timeOutEvents.find(ele=>ele.date === date);
    let startH = startT.hour.toString();
    let endH = EndTime.hour.toString();
    let startHo = startH.length === 3 ? parseInt(startH.substring(0,1)) :parseInt(startH.substring(0,2));
    let endHo = endH.length === 3 ? parseInt(endH.substring(0,1)) : parseInt(endH.substring(0,2));
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
    let final = sum.reduce((H, A) => H + A, 0);
    return final;
  }
  
  function calculatePayroll(employeeArray){
    return employeeArray.reduce((m, e) => m + allWagesFor(e), 0);
  }
  
  function createEmployeeRecords(resume){
    return resume.map(item=>createEmployeeRecord(item));
  }
  
  function findEmployeeByFirstName(employeeArray,employeeFun){
    return employeeArray.find(emp=>emp.firstName === employeeFun);
  }