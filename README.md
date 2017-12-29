# Gym statistics app

1. applicatie lokaal opstarten

-> ga naar de folder waar deze readme staat in de commandprompt of de terminal en voer "npm install" uit.
-> nadat dit voltooid is, voer "npm start" uit. Er zou een bericht moeten verschijnen dat de applicatie op http://localhost:3000
kan gezien worden
-> surf in de browser naar http://localhost:3000 om de applicatie te zien.
-> (werkt niet zonder een internetverbinding)

2. applicatie online bekijken
-> surf in de browser naar https://gymstats.eu-gb.mybluemix.net

3. Login gegevens
-> beide van de bovenstaande applicaties gebruiken al de Cloudant NOSQL Database (noSQL database van IBM cloud),
dus zowel lokaal als online kunt u dezelfde account gebruiken.
-> om statistieken te tonen heeft de app al wat data nodig, daarom voor het gebruiksgemak heb ik al een account
gemaakt zodat u niet bij alles eerst wat gegevens moet invoeren.
-> voorgemaakt account (login: aaa , passwoord: aaa)

4. Over de applicatie
-> De backend van de app is geschreven in Node.js (server.js)
-> In de Frontend werd gebruik gemaakt van html/css + bootstrap
-> De app wordt gehost op het IBM cloud platform, en ook da database waarvan de app gebruik gemaakt wordt daar gehost.

5. indien online app niet werkt.
-> de regels van IBM gaan als volg: na enkele dagen niet uploaden naar de server gaat de applicatie 'slapen'
(dit komt omdat ik gebruik maak van een Lite edititie, die dan ook gratis is)
-> indien dit zo is, mag u altijd een mailtje sturen naar maxime.mylle@student.howest.be zodat ik deze snel terug kan aansteken.
-> opmerken, in feite werkt de applicatie identiek offline als online, de Cloudant NOSQL db blijft werken. 
