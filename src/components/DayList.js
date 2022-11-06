// Each day needs to display slightly differently depending on what state it is in. It should display the name of the day, whether it is selected or unselected, and the interview spots remaining. The user must also be able to select a particular day to view the interview information for that day. To put this all together we will need the following props:

// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
// We use the spots prop for two purposes:

// 1) To display the text "{props.spots} spots remaining" 2) to determine if the day is full.

// The DayListItem "knows" what it means to be full (if props.spots is 0, the day is full) but not what it means to be selected. It uses this prop directly to determine which styles to apply.