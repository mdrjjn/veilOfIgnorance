function control() {
  
  var profile = generateProfile();
  var choices = collectChoices();
  var run = compute(profile, choices);
  var score = run[0];
  var logs = run[1];

  //emptying all of the display divs
  document.getElementById("displayLogs").innerHTML = "";
  //document.getElementById("displayCharacter").innerHTML = "";
  //displaying the character
  document.getElementById("charIcome").innerHTML = 'Economic Satus: '+profile.income;
  document.getElementById("charResidence").innerHTML = 'Residence: '+choices.location;
  document.getElementById("charSickRole").innerHTML = 'Sick?: '+profile.sick;
  document.getElementById("charImmRole").innerHTML = 'Immigrant Status: '+profile.legalStatus;
  document.getElementById("charabdRole").innerHTML = 'Ability: '+profile.abilityRole;
  document.getElementById("charEmpStat").innerHTML = 'Employment Status: '+profile.empStatus;
  document.getElementById("charKarmaWar").innerHTML = 'War: ' +profile.karmaCards.warCard;
  document.getElementById("charKarmaDisaster").innerHTML = 'Disaster: ' +profile.karmaCards.disasterCard;

  //Displaying the score
  document.getElementById("score").innerHTML = score.toFixed(2);;
  //populating the logs div
  var header =document.createElement("H2");
  var ht = document.createTextNode("How you got your score");
  header.appendChild(ht);
  document.getElementById("displayLogs").appendChild(header);

  for (i=0; i < logs.length; i++) {
    var para = document.createElement("P");                       // Create a <p> element
    var t = document.createTextNode(logs[i]);      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("displayLogs").appendChild(para);
  }

  //this wonderful line of code scroll to the bottom of the page to make sure all the logs are visible
  //thanks to http://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
  window.scrollTo(0,document.body.scrollHeight);

}
