var scoreusername = localStorage.getItem("name")
var scorerecord = localStorage.getItem("Highscore")
var h3 = document.createElement(h3);
h3.textContent = "1." + scoreusername + "---" + scorerecord;
scoreName.appendChild(h3);