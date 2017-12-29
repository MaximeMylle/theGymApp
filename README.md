# Gym statistics app

1. applicatie lokaal opstarten

-> ga naar de folder waar deze readme staat in de commandprompt of de terminal en voer "npm install" uit.<br>
-> nadat dit voltooid is, voer "npm start" uit. Er zou een bericht moeten verschijnen dat de applicatie op http://localhost:3000
kan gezien worden<br>
-> surf in de browser naar http://localhost:3000 om de applicatie te zien.<br>
-> (werkt niet zonder een internetverbinding)<br>
<br>
2. applicatie online bekijken<br>
-> surf in de browser naar https://gymstats.eu-gb.mybluemix.net<br>
<br>
3. Login gegevens<br>
-> beide van de bovenstaande applicaties gebruiken al de Cloudant NOSQL Database (noSQL database van IBM cloud),<br>
dus zowel lokaal als online kunt u dezelfde account gebruiken.<br>
-> om statistieken te tonen heeft de app al wat data nodig, daarom voor het gebruiksgemak heb ik al een account
gemaakt zodat u niet bij alles eerst wat gegevens moet invoeren.<br>
-> voorgemaakt account (login: aaa , passwoord: aaa)<br>

4. Over de applicatie<br>
-> De backend van de app is geschreven in Node.js (server.js)<br>
-> In de Frontend werd gebruik gemaakt van html/css + bootstrap<br>
-> De app wordt gehost op het IBM cloud platform, en ook da database waarvan de app gebruik gemaakt wordt daar gehost.<br>
-> Github repo: https://github.com/MaximeMylle/theGymApp

5. indien online app niet werkt.<br>
-> de regels van IBM gaan als volg: na enkele dagen niet uploaden naar de server gaat de applicatie 'slapen'<br>
(dit komt omdat ik gebruik maak van een Lite edititie, die dan ook gratis is)<br>
-> indien dit zo is, mag u altijd een mailtje sturen naar maxime.mylle@student.howest.be zodat ik deze snel terug kan aansteken.<br>
-> opmerken, in feite werkt de applicatie identiek offline als online, de Cloudant NOSQL db blijft werken. <br>
