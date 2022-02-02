import LegendItem from "./LengendItem";

var legendItems = [
  new LegendItem("200 +", "#184e77", (users) => users >= 200, "white"),

  new LegendItem(
    "150 - 200",
    "#1a759f",
    (users) => users >= 150 && users < 200,
    "White"
  ),

  new LegendItem(
    "100 - 150",
    "#34a0a4",
    (users) => users >= 100 && users < 150
  ),

  new LegendItem("50 - 100", "#76c893", (users) => users >= 50 && users < 100),

  new LegendItem("0 - 50", "#b5e48c", (users) => users >= 0 && users < 50),

  new LegendItem("No Data", "#ffffff", (users) => true),
];

export default legendItems;

/*
#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/
