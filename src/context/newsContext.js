import React from "react";

const aboutContext = React.createContext({
  editPost: "",
  addPost: false,
  toState() {},
  numDate() {},
  uploadPost() {},
  stringDate: date => {
    const d = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let m = monthNames[d.getMonth()];
    return `${m} ${d.getDate()}, ${d.getFullYear()}`;
  }
});

export default aboutContext;
