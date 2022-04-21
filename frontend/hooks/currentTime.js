 export const todayTimeFormal = (timestamp) => { //현재 년/월/일/시간
    let now = new Date(timestamp);
    let todayYear = now.getFullYear();
    let todayMonth = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    let hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
    let minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
    return todayYear + '-' + todayMonth + '-' + todayDate + ' ' + hours + ':' + minutes;
}
// console.log(new Date())
// console.log(new Date(Date.now()))
// console.log(Date.now())
// console.log(todayTimeFormal(1649158292117))