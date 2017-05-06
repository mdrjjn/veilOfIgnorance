        //Function that computes the score, based on the choices and the profile
        //The appropriate way to do this, I think, is to loop through decisions and
        //evaluate every one based on the respected roles. Although, more than one role
        //can come into play when evaluating a decision. This is just a theory that should
        //be changed if a better solution is found

var testProfile = {income: "Middle Class", empStatus: "uNemployed", sick: "No", legalStatus: "Legal", abilityRole: "Average", karmaCards:{warCard: true, disasterCard: false}};
var testChoices = {location: "east coast", rate: "no taxes", employment: "employed", hIns: "national_hc", dRelief: "semi_private", education: "all_private", immigrationP: "deport", wAid: "1", military: "voluntary"};

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
        if (pr.income === "Low Income") {
          score = score + 1;
        }
    }
    //Progressive taxation
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
        if (pr.income === "Low Income") {
          score = score + 0;//??!
        }
    }
    //Flat Tax
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
        if (pr.income === "Low Income") {
          score = score - 1;
        }
    }
    //Class warfare!
    if (ch.rate === "class warfare") {
        if (pr.income === "Middle Class") {
            score = score + 1;
        }
        if (pr.income === "Wealthy") {
            score = score - 1;
        }
        if (pr.income === "Poverty") {
            score = score + 1;
        }
        if (pr.income === "Low Income") {
          score = score + 1;
        }
    }

    //DEALING WITH THE UNEMPLOYMENY POLICIES
    if (ch.employment === "no_un_aid") {
      if (pr.empStatus === "uNemployed" && pr.income != "Wealthy") {
        score = score - 1;
      }
      if (pr.empStatus === "employed") {
        score = score - 0;//??!
      }
    }

    if (ch.employment === "moderate_assistance") {
      if (pr.empStatus === "uNemployed" && pr.income != "Wealthy") {
        score = score + 0.5;//??!
      }
      if (pr.empStatus === "employed" && pr.income != "Wealthy") {
        score = score - 0;//??!
      }
    }

    if (ch.employment === "generous_assistance") {
      if (pr.empStatus === "uNemployed") {
        score = score + 1;//??!
      }
      if (pr.empStatus === "employed") {
        score = score - 0;//??!
      }
    }

    //DEALING WITH HEALTH INSURANCE. FACTORS affecting: income; insurance, ability
    //ASSUMPTION: wealthu people do not care how much the care costs
    //If you are obly sick
    if (ch.hIns === "private" && pr.sick === "Yes" && pr.income === "Poverty") {//??! impact disability?
        score = score - 1.25;
    }
    if (ch.hIns === "private" && pr.sick === "Yes" && pr.income === "Low Income") {//??! impact disability?
        score = score - 1;
    }
    if (ch.hIns === "private" && pr.sick === "Yes" && pr.income === "Middle Class") {//??! impact disability?
        score = score - 0.5;
    }

    //if you are only disabled
    if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.income === "Poverty") {//??! impact disability?
        score = score - 1.5;
    }
    if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.income === "Low Income") {//??! impact disability?
        score = score - 1.25;
    }
    if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.income === "Middle Class") {//??! impact disability?
        score = score - 0.75;
    }

    //if you are both sick AND disabled
    if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "Yes"  && pr.income === "Poverty") {//??! impact disability?
        score = score - 1.75;
    }
    if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Low Income") {//??! impact disability?
        score = score - 1.5;
    }
    if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Middle Class") {//??! impact disability?
        score = score - 1;
    }

  //MEDICARE
    if (ch.hIns === "medicare" && pr.sick === "Yes" && pr.income === "Poverty") {//??! impact disability?
        score = score + 1;
    }
    if (ch.hIns === "medicare" && pr.sick === "Yes" && pr.income === "Low Income") {//??! impact disability?
        score = score + 0.25;
    }
    if (ch.hIns === "medicare" && pr.sick === "Yes" && pr.income === "Middle Class") {//??! impact disability?
        score = score - 0.25;
    }

    //if you are only disabled
    if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.income === "Poverty") {//??! impact disability?
        score = score + 1.5;
    }
    if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.income === "Low Income") {//??! impact disability?
        score = score + 0.5;
    }
    if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.income === "Middle Class") {//??! impact disability?
        score = score - 0.5;
    }

    //if you are both sick AND disabled
    if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.sick === "Yes"  && pr.income === "Poverty") {//??! impact disability?
        score = score + 1.75;
    }
    if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Low Income") {//??! impact disability?
        score = score + 1;
    }
    if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Middle Class") {//??! impact disability?
        score = score - 1;
    }

    //NATIONAL HEALTH CARE
    if (ch.hIns === "national_hc" && pr.sick === "Yes" && pr.income === "Poverty") {//??! impact disability?
        score = score + 1;
    }
    if (ch.hIns === "national_hc" && pr.sick === "Yes" && pr.income === "Low Income") {//??! impact disability?
        score = score + 0.25;
    }
    if (ch.hIns === "national_hc" && pr.sick === "Yes" && pr.income === "Middle Class") {//??! impact disability?
        score = score + 0.25;
    }

    //if you are only disabled
    if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.income === "Poverty") {//??! impact disability?
        score = score + 1.5;
    }
    if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.income === "Low Income") {//??! impact disability?
        score = score + 0.5;
    }
    if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.income === "Middle Class") {//??! impact disability?
        score = score + 0.5;
    }

    //if you are both sick AND disabled
    if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.sick === "Yes"  && pr.income === "Poverty") {//??! impact disability?
        score = score + 1.75;
    }
    if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Low Income") {//??! impact disability?
        score = score + 1;
    }
    if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Middle Class") {//??! impact disability?
        score = score + 1;
    }

    //DEALING WITH DISASTER RELIEF.
    // Factors affecting the score:
    // income; Disaster card; choice of program
    if (ch.dRelief === "all_private" && pr.karmaCards.disasterCard === true && pr.income === "Poverty") {
      score = score - 2;
    }
    if (ch.dRelief === "all_private" && pr.karmaCards.disasterCard === true && pr.income === "Low Income") {
      score = score - 1.5;
    }
    if (ch.dRelief === "all_private" && pr.karmaCards.disasterCard === true && pr.income === "Middle Class") {
      score = score - 1;
    }

    if (ch.dRelief === "semi_private" && pr.karmaCards.disasterCard === true && pr.income === "Poverty") {
      score = score - 1.5;
    }
    if (ch.dRelief === "semi_private" && pr.karmaCards.disasterCard === true && pr.income === "Low Income") {
      score = score - 1;
    }
    if (ch.dRelief === "semi_private" && pr.karmaCards.disasterCard === true && pr.income === "Middle Class") {
      score = score - 1;
    }

    if (ch.dRelief === "collective" && pr.karmaCards.disasterCard === true && pr.income === "Poverty") {
      score = score - 0;
    }
    if (ch.dRelief === "collecive" && pr.karmaCards.disasterCard === true && pr.income === "Low Income") {
      score = score - 0;
    }
    if (ch.dRelief === "collective" && pr.karmaCards.disasterCard === true && pr.income === "Middle Class") {
      score = score - 0;
    }

    //DEALING WITH EDUCATION
    //Factors: Choice. Income; gifted or not?
    if (ch.education === "all_private" && pr.income === "Poverty") {
      score = score - 1;
    }
    if (ch.education === "all_private" && pr.income === "Low Income") {
      score = score - 0.75;
    }
    if (ch.education === "all_private" && pr.income === "Middle Class") {
      score = score - 0.25;
    }

    if (ch.education === "public_HS" && pr.income === "Poverty" ) {
      score = score - 0.25;
    }
    if (ch.education === "public_HS" && pr.income === "Low Income" ) {
      score = score - 0.1;
    }
    if (ch.education === "public_HS" && pr.income === "Middle Class" ) {
      score = score - 0;
    }

    if (ch.education === "sub_gov_fund" && pr.income === "Poverty" ) {
      score = score + 1;
      if (pr.abilityRole === "Gifted") {
        score = score + 1;
      }
    }
    if (ch.education === "sub_gov_fund" && pr.income === "Low Income" ) {
      score = score + 0.75;
      if (pr.abilityRole === "Gifted") {
        score = score + 0.75;
      }
    }
    if (ch.education === "sub_gov_fund" && pr.income === "Middle Class" ) {
      score = score + .25;
      if (pr.abilityRole === "Gifted") {
        score = score + 0.5;
      }
    }

    //Dealing with military policy.
    //Factors:choice; war card
    if (ch.military === "draft" && pr.karmaCards.warCard === true) {
      score = score - 2;
    }

    //DEALING WITH IMMIGRATION
    //Factors: choice; legal status; gifted (if guest program)
    if (ch.immigrationP === "deport" && pr.legalStatus === "Illegal") {
      score = score - 2;
    }
    if (ch.immigrationP === "guest_w_prog" && pr.legalStatus === "Illegal") {
      score = score + 1;//??!
    }
    if (ch.immigrationP === "no_borders" && pr.legalStatus === "Illegal") {
      score = score + 1;
    }
    if (ch.immigrationP === "guest_w_prog" && pr.legalStatus === "Illegal" && pr.abilityRole === "Gifted") {
      score = score + 1.5;//??!
    }

    //DEALING WITH GLOBAL WARMING
    //Factors impacting: city of residence, choice, income,
    if (ch.wAid === "no_regulation" && pr.income === "Middle Class") {
      if (ch.location === "east coast" || ch.location === "west coast") {
        score = score - 1.5;
      }
    }
    if (ch.wAid === "no_regulation" && pr.income === "Low Income") {
      if (ch.location === "east coast" || ch.location === "west coast") {
        score = score - 1.75;
      }
    }
    if (ch.wAid === "no_regulation" && pr.income === "Poverty") {
      if (ch.location === "east coast" || ch.location === "west coast") {
        score = score - 2;
      }
    }

    if (ch.wAid === "no_more_ffuels" && pr.income === "Middle Class") {
      if (ch.location === "east coast" || ch.location === "west coast") {
        score = score - 0;
      }
    }
    if (ch.wAid === "no_more_ffuels" && pr.income === "Low Income") {
      if (ch.location === "east coast" || ch.location === "west coast") {
        score = score - 0.;
      }
    }
    if (ch.wAid === "no_more_ffuels" && pr.income === "Poverty") {
      if (ch.location === "east coast" || ch.location === "west coast") {
        score = score - 0.;
      }
    }


    return (score);
}
