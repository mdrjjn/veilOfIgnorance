        //Function that computes the score, based on the choices and the profile
        //The appropriate way to do this, I think, is to loop through decisions and
        //evaluate every one based on the respected roles. Although, more than one role
        //can come into play when evaluating a decision. This is just a theory that should
        //be changed if a better solution is found.

        var tP = {//test prfile
            income: "Poverty",
            empStatus: "uNemployed",
            sick: "No",
            legalStatus: "Illegal",
            abilityRole: "Average",
            karmaCards: {
                warCard: true,
                disasterCard: true
            }
        };
        var tC = {//test choices
            location: "east coast",
            rate: "no taxes",
            employment: "employed",
            hIns: "national_hc",
            dRelief: "semi_private",
            education: "all_private",
            immigrationP: "deport",
            wAid: "1",
            military: "voluntary"
        };

        function compute(pr, ch) {
            "use strict"; //no idea what this does, but the linter told me to use this
            var score = 0;
            var logs = [];
            var taxPoints = 0;//Keeping track of how the policies will affect the income tax.

            // DEALING WITH GOVERNEMNT REVENUE.
            if (ch.rate === "no taxes") {
                if (pr.income === "Middle Class") {
                    score = score + 0.75;
                    logs.push("Gained 0.75 point for taxation");
                }
                if (pr.income === "Wealthy") {
                    score = score + 1;
                    logs.push("Gained 1 point for taxation");
                }
                if (pr.income === "Poverty") {
                    score = score - 0.;
                    logs.push("Lost no points for taxation");
                }
                if (pr.income === "Low Income") {
                    score = score + 1;
                    logs.push("Gained 1 point for taxation as you have to pay little");
                }
            }
            //Progressive taxation
            if (ch.rate === "progressive taxation") {
                if (pr.income === "Middle Class") {
                    score = score + 0;
                    logs.push("Lost no points for taxation");
                }
                if (pr.income === "Wealthy") {
                    score = score + 0;
                    logs.push("Lost no points for taxation");
                }
                if (pr.income === "Poverty") {
                    score = score + 1;
                    logs.push("Gained 1 points for taxation");
                }
                if (pr.income === "Low Income") {
                    score = score + 0; //??!
                    logs.push("Gained no points for taxation");
                }
            }
            //Flat Tax
            if (ch.rate === "flat tax") {
                if (pr.income === "Middle Class") {
                    score = score + 0;
                    logs.push("Lost no points for taxation");
                }
                if (pr.income === "Wealthy") {
                    score = score + 1;
                    logs.push("Gained 1 point for taxation");
                }
                if (pr.income === "Poverty") {
                    score = score - 1;
                    logs.push("Lost 1 point for taxation");
                }
                if (pr.income === "Low Income") {
                    score = score - 1;
                    logs.push("Lost 1 point for taxation");
                }
            }
            //Class warfare!
            if (ch.rate === "class warfare") {
                if (pr.income === "Middle Class") {
                    score = score + 1;
                    logs.push("Gained 1 point for taxation");
                }
                if (pr.income === "Wealthy") {
                    score = score - 1;
                    logs.push("Lost 1 point for taxation");
                }
                if (pr.income === "Poverty") {
                    score = score + 1;
                    logs.push("Gained 1 point for taxation");
                }
                if (pr.income === "Low Income") {
                    score = score + 1;
                    logs.push("Gained 1 point for taxation");
                }
            }

            //DEALING WITH THE UNEMPLOYMENY POLICIES
            if (ch.employment === "no_un_aid") {
                taxPoints = taxPoints + 0;//incrementing tax points
                if (pr.empStatus === "uNemployed" && pr.income != "Wealthy") {
                    score = score - 1;
                    logs.push("Lost 1 point for unemployment policy");
                }
                if (pr.empStatus === "employed") {
                    score = score - 0; //??!
                    logs.push("Lost no points for unemployment policy");
                }
            }

            if (ch.employment === "moderate_assistance") {
              taxPoints = taxPoints + 5;
                if (pr.empStatus === "uNemployed" && pr.income != "Wealthy") {
                    score = score + 0.5; //??!
                    logs.push("Gained 0.5 points for unemployment policy");
                }
                if (pr.empStatus === "employed" && pr.income != "Wealthy") {
                    score = score - 0; //??!
                    logs.push("Lost no points for unemployment policy");
                }
            }

            if (ch.employment === "generous_assistance") {
              taxPoints = taxPoints + 10;
                if (pr.empStatus === "uNemployed") {
                    score = score + 1; //??!
                    logs.push("Gained 1 point for unemployment policy");
                }
                if (pr.empStatus === "employed") {
                    score = score - 0; //??!
                    logs.push("Lost no points for unemployment policy");
                }
            }

            //DEALING WITH HEALTH INSURANCE. FACTORS affecting: income; insurance, ability
            //ASSUMPTION: wealthu people do not care how much the care costs
            //calculating tax points
            if (ch.hIns === "private") {
              taxPoints = taxPoints + 0;
            }
            if (ch.hIns === "medicare") {
              taxPoints = taxPoints + 5;
            }
            if (ch.hIns === "national_hc") {
              taxPoints = taxPoints + 10;
            }
            //If you are obly sick
            if (ch.hIns === "private" && pr.sick === "Yes" && pr.abilityRole === "Average" && pr.income === "Poverty") { //??! impact disability?
                score = score - 1.25;
                logs.push("Lost 1.25 for health insurance");
            }
            if (ch.hIns === "private" && pr.sick === "Yes" && pr.abilityRole === "Average" && pr.income === "Low Income") { //??! impact disability?
                score = score - 1;
                logs.push("Lost 1 for health insurance");
            }
            if (ch.hIns === "private" && pr.sick === "Yes" && pr.abilityRole === "Average" && pr.income === "Middle Class") { //??! impact disability?
                score = score - 0.5;
                logs.push("Lost 0.5 for health insurance");
            }

            //if you are only disabled
            if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "No" && pr.income === "Poverty") { //??! impact disability?
                score = score - 1.5;
                logs.push("Lost 1.5 for health insurance");
            }
            if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "No" && pr.income === "Low Income") { //??! impact disability?
                score = score - 1.25;
                logs.push("Lost 1.25 points for health insurance policy");
            }
            if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "No" && pr.income === "Middle Class") { //??! impact disability?
                score = score - 0.75;
                logs.push("Lost 0.75 points for health insurance policy");
            }

            //if you are both sick AND disabled
            if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Poverty") { //??! impact disability?
                score = score - 1.75;
                logs.push("Lost 1.75 points for health insurance policy");
            }
            if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Low Income") { //??! impact disability?
                score = score - 1.5;
                logs.push("Lost 1.5 points for health insurance policy");
            }
            if (ch.hIns === "private" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Middle Class") { //??! impact disability?
                score = score - 1;
                logs.push("Lost 1 point for health insurance policy");
            }

            //MEDICARE
            if (ch.hIns === "medicare" && pr.sick === "Yes" && pr.income === "Poverty") { //??! impact disability?
                score = score + 1;
                logs.push("Gained 1 point for health insurance policy");
            }
            if (ch.hIns === "medicare" && pr.sick === "Yes" && pr.income === "Low Income") { //??! impact disability?
                score = score + 0.25;
                logs.push("Gained 0.25 points for health insurance policy");
            }
            if (ch.hIns === "medicare" && pr.sick === "Yes" && pr.income === "Middle Class") { //??! impact disability?
                score = score - 0.25;
                logs.push("Lost 0.25 points for health insurance policy");
            }

            //if you are only disabled
            if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.income === "Poverty") { //??! impact disability?
                score = score + 1.5;
                logs.push("Gained 1.5 points for health insurance policy");
            }
            if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.income === "Low Income") { //??! impact disability?
                score = score + 0.5;
                logs.push("Gained 0.5 points for health insurance policy");
            }
            if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.income === "Middle Class") { //??! impact disability?
                score = score - 0.5;
                logs.push("Lost 0.5 points for health insurance policy");
            }

            //if you are both sick AND disabled
            if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Poverty") { //??! impact disability?
                score = score + 1.75;
                logs.push("Gained 1.75 points for health insurance policy");
            }
            if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Low Income") { //??! impact disability?
                score = score + 1;
                logs.push("Gained 1 point for health insurance policy");
            }
            if (ch.hIns === "medicare" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Middle Class") { //??! impact disability?
                score = score - 1;
                logs.push("Lost 1 point for health insurance policy");
            }

            //NATIONAL HEALTH CARE
            if (ch.hIns === "national_hc" && pr.sick === "Yes" && pr.income === "Poverty") { //??! impact disability?
                score = score + 1;
                logs.push("Gained 1 point for health insurance policy");
            }
            if (ch.hIns === "national_hc" && pr.sick === "Yes" && pr.income === "Low Income") { //??! impact disability?
                score = score + 0.25;
                logs.push("Gained 0.25 points for health insurance policy");
            }
            if (ch.hIns === "national_hc" && pr.sick === "Yes" && pr.income === "Middle Class") { //??! impact disability?
                score = score + 0.25;
                logs.push("Gained 0.25 points for health insurance policy");
            }

            //if you are only disabled
            if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.income === "Poverty") { //??! impact disability?
                score = score + 1.5;
                logs.push("Gained 1.5 points for health insurance policy");
            }
            if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.income === "Low Income") { //??! impact disability?
                score = score + 0.5;
                logs.push("Gained 0.5 points for health insurance policy");
            }
            if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.income === "Middle Class") { //??! impact disability?
                score = score + 0.5;
                logs.push("Gained 0.5 points for health insurance policy");
            }

            //if you are both sick AND disabled
            if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Poverty") { //??! impact disability?
                score = score + 1.75;
                logs.push("Gained 1.75 point for health insurance policy");
            }
            if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Low Income") { //??! impact disability?
                score = score + 1;
                logs.push("Gained 1 point for health insurance policy");
            }
            if (ch.hIns === "national_hc" && pr.abilityRole === "Challenged" && pr.sick === "Yes" && pr.income === "Middle Class") { //??! impact disability?
                score = score + 1;
                logs.push("Gained 1 point for health insurance policy");
            }

            //DEALING WITH DISASTER RELIEF.
            // Factors affecting the score:
            //calculating taxPoints
            if (ch.dRelief === "all_private") {
              taxPoints = taxPoints + 0;
            }
            if (ch.dRelief === "semi_private") {
              taxPoints = taxPoints + 2;
            }
            if (ch.dRelief === "collective") {
              taxPoints = taxPoints + 6;
            }

            // income; Disaster card; choice of program
            if (ch.dRelief === "all_private" && pr.karmaCards.disasterCard === true && pr.income === "Poverty") {
                score = score - 2;
                logs.push("Lost 2 points for disaster relief policy");
            }
            if (ch.dRelief === "all_private" && pr.karmaCards.disasterCard === true && pr.income === "Low Income") {
                score = score - 1.5;
                logs.push("Lost 1.5 points for disaster relief policy");
            }
            if (ch.dRelief === "all_private" && pr.karmaCards.disasterCard === true && pr.income === "Middle Class") {
                score = score - 1;
                logs.push("Lost 1 point for disaster relief policy");
            }

            if (ch.dRelief === "semi_private" && pr.karmaCards.disasterCard === true && pr.income === "Poverty") {
                score = score - 1.5;
                logs.push("Lost 1.5 points for disaster relief policy");
            }
            if (ch.dRelief === "semi_private" && pr.karmaCards.disasterCard === true && pr.income === "Low Income") {
                score = score - 1;
                logs.push("Lost 1 point for disaster relief policy");
            }
            if (ch.dRelief === "semi_private" && pr.karmaCards.disasterCard === true && pr.income === "Middle Class") {
                score = score - 1;
                logs.push("Lost 1 point for disaster relief policy");
            }

            if (ch.dRelief === "collective" && pr.karmaCards.disasterCard === true && pr.income === "Poverty") {
                score = score - 0;
                logs.push("Lost no points for disaster relief policy");
            }
            if (ch.dRelief === "collecive" && pr.karmaCards.disasterCard === true && pr.income === "Low Income") {
                score = score - 0;
                logs.push("Lost no points for disaster relief policy");
            }
            if (ch.dRelief === "collective" && pr.karmaCards.disasterCard === true && pr.income === "Middle Class") {
                score = score - 0;
                logs.push("Lost no points for disaster relief policy");
            }

            //DEALING WITH EDUCATION
            //Factors: Choice. Income; gifted or not?
            //calculating taxPoints
            if (ch.education === "all_private") {
              taxPoints = taxPoints + 0;
            }
            if (ch.education === "public_HS") {
              taxPoints = taxPoints + 5;
            }
            if (ch.education === "sub_gov_fund") {
              taxPoints = taxPoints + 10;
            }


            if (ch.education === "all_private" && pr.income === "Poverty") {
                score = score - 1;
                logs.push("Lost 1 point for education policy");
            }
            if (ch.education === "all_private" && pr.income === "Low Income") {
                score = score - 0.75;
                logs.push("Lost 0.75 points for education policy");
            }
            if (ch.education === "all_private" && pr.income === "Middle Class") {
                score = score - 0.25;
                logs.push("Lost 0.25 points for education policy");
            }

            if (ch.education === "public_HS" && pr.income === "Poverty") {
                score = score - 0.25;
                logs.push("Lost 0.25 points for education policy");
            }
            if (ch.education === "public_HS" && pr.income === "Low Income") {
                score = score - 0.1;
                logs.push("Lost 0.1 point for education policy");
            }
            if (ch.education === "public_HS" && pr.income === "Middle Class") {
                score = score + 0.25;
                logs.push("Gained 0.25 points for education policy");
            }

            if (ch.education === "sub_gov_fund" && pr.income === "Poverty") {
                score = score + 1;
                logs.push("Gained 1 point for education policy");
                if (pr.abilityRole === "Gifted") {
                    score = score + 1;
                    logs.push("Gained an additional 1 point for education policy and being gifted");
                }
            }
            if (ch.education === "sub_gov_fund" && pr.income === "Low Income") {
                score = score + 0.75;
                logs.push("Gained 0.75 points for education policy");
                if (pr.abilityRole === "Gifted") {
                    score = score + 0.75;
                    logs.push("Gained  additional 0.75 points for education policy and being gifted, For scholarships and the like");
                }
            }
            if (ch.education === "sub_gov_fund" && pr.income === "Middle Class") {
                score = score + .5;
                logs.push("Gained 0.5 points for education policy");
                if (pr.abilityRole === "Gifted") {
                    score = score + 0.5;
                    logs.push("Gained  additional 0.5 points for education policy and being gifted");
                }
            }

            //Dealing with military policy.
            //Factors:choice; war card
            if (ch.military === "draft" && pr.karmaCards.warCard === true) {
                score = score - 2;
                logs.push("Lost 2 points for army policy");
            }

            //DEALING WITH IMMIGRATION
            //Factors: choice; legal status; gifted (if guest program)
            if (ch.immigrationP === "deport" && pr.legalStatus === "Illegal") {
                score = score - 2;
                logs.push("Lost 2 points for immigration policy");
            }
            if (ch.immigrationP === "guest_w_prog" && pr.legalStatus === "Illegal") {
                score = score + 1; //??!
                logs.push("Gained 1 point for immigration policy");
            }
            if (ch.immigrationP === "no_borders" && pr.legalStatus === "Illegal") {
                score = score + 1;
                logs.push("Gained 1 point for immigration policy");
            }
            if (ch.immigrationP === "guest_w_prog" && pr.legalStatus === "Illegal" && pr.abilityRole === "Gifted") {
                score = score + 1.5; //??!
                logs.push("Gained 1.5 points for immigration policy");
            }

            //DEALING WITH GLOBAL WARMING
            //Factors impacting: city of residence, choice, income,

            if (ch.wAid === "no_regulation" && pr.income === "Middle Class") {
                if (ch.location === "east coast" || ch.location === "west coast") {
                    score = score - 1.5;
                    logs.push("Lost 1.5 points for global warming policy");
                }
            }
            if (ch.wAid === "no_regulation" && pr.income === "Low Income") {
                if (ch.location === "east coast" || ch.location === "west coast") {
                    score = score - 1.75;
                    logs.push("Lost 1.75 points for global warming policy");
                }
            }
            if (ch.wAid === "no_regulation" && pr.income === "Poverty") {
                if (ch.location === "east coast" || ch.location === "west coast") {
                    score = score - 2;
                    logs.push("Lost 2 points for global warming policy");
                }
            }

            if (ch.wAid === "no_more_ffuels" && pr.income === "Middle Class") {
                if (ch.location === "east coast" || ch.location === "west coast") {
                    score = score - 0;
                    logs.push("Gained no points for global warming policy");
                }
            }
            if (ch.wAid === "no_more_ffuels" && pr.income === "Low Income") {
                if (ch.location === "east coast" || ch.location === "west coast") {
                    score = score - 0.;
                    logs.push("Gained 2 points for global warming policy");
                }
            }
            if (ch.wAid === "no_more_ffuels" && pr.income === "Poverty") {
                if (ch.location === "east coast" || ch.location === "west coast") {
                    score = score - 0.;
                    logs.push("Gained 2 points for global warming policy");
                }
            }

            //ADJUSTING FOR THE TAX, IN CONSIDERATION OF THE POLICIES CHOSEN (so no one selects no tax and then all gov poliies)
            //Reward or punish the middle class depending on how much tax they chose vs how much their policies demanded
            //you really won.
            if (taxPoints <= 5 && pr.income === "Wealthy"  && ch.rate === "no taxes") {
              score = score + 3.5;
              logs.push("Gained 3.5 points for being wealthy and having low-tax policies with a no tac policy. Wohooooo 1% ftw!!");
            }
            //if all the options chosen were of medium gov envolvement
            if (taxPoints >= 5 && taxPoints <= 18 && pr.income === "Wealthy" && ch.rate === "no taxes") {
              score = score - 1.5;
              logs.push("Lost 1.5 points for being wealthy and having medium-tax policies while opting for a no-tax policy");
            }
            //get heavily punished for chosing no taxes and all gov-supported programs
            if (taxPoints >= 18 && pr.income === "Wealthy" && ch.rate === "no taxes") {
              score = score - 2.5;
              logs.push("Lost 2.5 points for being wealthy and having high-tax policies while opting for a no-tax policy");
            }

            if (taxPoints <= 5 && pr.income === "Wealthy"  && ch.rate === "flat tax") {
              score = score + 2.5;
              logs.push("Gained 2.5 points for being wealthy and having low-tax policies with a flat tax policy. Wohooooo 1% ftw!!");
            }
            //if all the options chosen were of medium gov envolvement
            if (taxPoints >= 5 && taxPoints <= 18 && pr.income === "Wealthy" && ch.rate === "flat tax") {
              score = score - 1;
              logs.push("Lost 1 point for being wealthy and having medium-tax policies while opting for a flat tax policy");
            }
            //get heavily punished for chosing no taxes and all gov-supported programs
            if (taxPoints >= 18 && pr.income === "Wealthy" && ch.rate === "flat tax") {
              score = score - 2.5;
              logs.push("Lost 2.5 points for being wealthy and having medium-tax policies while opting for a flat-tax policy");
            }

            //Reward or punish the middle class depending on how much tax they chose vs how much their policies demanded
            if (taxPoints <= 5 && pr.income === "Middle Class"  && ch.rate === "no taxes") {
              score = score + 1.75;
              logs.push("Gained 1.75 points for being middle class and having low-tax policies with a no tax policy.");
            }
            //if all the options chosen were of medium gov envolvement
            if (taxPoints >= 5 && taxPoints <= 18 && pr.income === "Middle Class" && ch.rate === "no taxes") {
              score = score - 0.75;
              logs.push("Lost 0.75 points for being middle class and having medium-tax policies with a no tax policy.");
            }
            //get heavily punished for chosing no taxes and all gov-supported programs
            if (taxPoints >= 18 && pr.income === "Middle Class" && ch.rate === "no taxes") {
              score = score - 1.75;
              logs.push("Lost 1.75 points for being middle class and having high-tax policies with a no tax policy.");
            }

            if (taxPoints <= 5 && pr.income === "Middle Class"  && ch.rate === "flat tax") {
              score = score + .5;
              logs.push("Gained 0.5 points for being middle class and having low-tax policies with a flat tax policy.");
            }
            //if all the options chosen were of medium gov envolvement
            if (taxPoints >= 5 && taxPoints <= 18 && pr.income === "Middle Class" && ch.rate === "flat tax") {
              score = score - 0.25;
              logs.push("Lost 0.25 points for being middle class and having medium-tax policies with a flat tax policy.");
            }
            //get heavily punished for chosing no taxes and all gov-supported programs
            if (taxPoints >= 18 && pr.income === "Middle Class" && ch.rate === "flat tax") {
              score = score - 1.25;
              logs.push("Lost 1.25 points for being middle class and having high-tax policies with a flat tax policy.");
            }
            //If Poor or low income, get rewarded for chosing high tax policies, or get srewed over if you chose
            //all the low gov involvement ones, hoping to be wealthy
            // if (pr.income === "Poverty" || pr.income === "Low Income") {
            //   if (taxPoints <= 5 && ch.rate === "no taxes") {
            //     score = score - 3;
            //   }
            // }
            // if (pr.income === "Poverty" || pr.income === "Low Income") {
            //   if (taxPoints >= 5 && taxPoints <= 18 && ch.rate === "no taxes") {
            //     score = score - 2.5;
            //   }
            // }
            //
            // if (pr.income === "Poverty" || pr.income === "Low Income") {
            //   if (taxPoints >= 18 && ch.rate === "no taxes") {
            //     score = score - 2;
            //   }
            // }Windows sucks very hard!!!!

            //returns an array that has logs and score
            return ([score,logs]);

        }
