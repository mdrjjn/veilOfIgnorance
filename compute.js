        //Function that computes the score, based on the choices and the profile
        //The appropriate way to do this, I think, is to loop through decisions and 
        //evaluate every one based on the respected roles. Although, more than one role
        //can come into play when evaluating a decision. This is just a theory that should
        //be changed if a better solution is found

testProfile = {income: "Middle Class", sick: "No", legalStatus: "Legal", abilityRole: "Average"};
testChoices = {rate: "no taxes", employment: "2", hIns: "3", dRelief: "1", education: "2", immigrationP: "2", wAid:"1", military: "1"};

function compute(pr, ch) {
    "use strict";//no idea what this does, but the linter told me to use this
    var score = 0;
    
    if (ch.rate==="no taxes") {
        if (pr.income === "Middle Class") {
            
        }
    }
      
    
}