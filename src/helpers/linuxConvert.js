export const convertUnixTime = unixtime => {
    // Unixtimestamp
    let unixtimestamp = unixtime;
    // Months array
    let months_arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  
    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp * 1000);
    // Year
    let year = date.getFullYear();
    // Month
    let month = months_arr[date.getMonth()];
    // Day
    let day = date.getDate();
    // Hours
    let hours = date.getHours();
    // Minutes
    let minutes = "0" + date.getMinutes();
  
    let convdataTime =
      day +
      " " +
      month +
      " " +
      year +
      " - " +
      hours +
      ":" +
      minutes.substr(-2);
    // console.log(convdataTime)
    return convdataTime
  };