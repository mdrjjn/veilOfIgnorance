        //Function that computes the score, based on the choices and the profile
        //The appropriate way to do this, I think, is to loop through decisions and 
        //evaluate every one based on the respected roles. Although, more than one role
        //can come into play when evaluating a decision. This is just a theory that should
        //be changed if a better solution is found

var testProfile = {income: "Middle Class", sick: "No", legalStatus: "Legal", abilityRole: "Average"};
var testChoices = {rate: "no taxes", employment: "2", hIns: "3", dRelief: "1", education: "2", immigrationP: "2", wAid: "1", military: "1"};

function compute(pr, ch) {
    "use strict";//no idea what this does, but the linter told me to use this
    var score = 0;
    
    // DEALING WITH GOVERNEMNT REVENUE.
    if (ch.rate === "no taxes") {
        if (pr.income === "Middle Class") {
            score = score + 1;
        }
        if (pr.income === "Wealthy") {
            score = score + 1;
        }
        if (pr.income === "Poverty") {
            score = score - 1;
        }
    }
    
    if (ch.rate === "progressive taxation") {
        if (pr.income === "Middle Class") {
            score = score + 0;
        }
        if (pr.income === "Wealthy") {
            score = score + 0;
        }
        if (pr.income === "Poverty") {
            score = score + 1;
        }
    }
    
    if (ch.rate === "flat tax") {
        if (pr.income === "Middle Class") {
            score = score + 0;
        }
        if (pr.income === "Wealthy") {
            score = score + 1;
        }
        if (pr.income === "Poverty") {
            score = score - 1;
        }
    }
      
    return (score);
}