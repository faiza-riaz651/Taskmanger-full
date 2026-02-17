import React from "react";

const Calender = () => {
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  const allMonths = [
    "Jan",
    "Feb",
    "March",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const allDays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return <div className="absolute top-10  ">calender</div>;
};

export default Calender;
