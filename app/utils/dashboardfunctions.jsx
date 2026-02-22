export function totalattendance({data}){
    console.log(data)
    let totalclass = 0
    let attendedclass =0
    data.forEach(item => {
        totalclass += item.totalclasses
        attendedclass += item["attended classes"]
    });
    let zone = "Safe Zone" ;
    if(attendedclass / totalclass <= 0.75){
        zone = "Low Attendance"
    }
    return {totalclass  , attendedclass , zone }
}


// {subject: 'cn', code: '1', totalclasses: 0, attended classes: 0, classesabsent: 0, …}
// attended classes
// : 
// 0
// classesabsent
// : 
// 0
// code
// : 
// "1"
// dates
// : 
// []
// subject
// : 
// "cn"
// totalclasses
// : 
// 0
// _id
// : 
// "699997cf352c3262edc714ac"
// [[Prototype]]
// : 
// Object