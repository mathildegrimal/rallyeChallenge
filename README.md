# rallyeChallenge
Little app with node.js to store scores about a Racing Challenge (computer game)
Express router, mysql database, ejs templates and that's all.

Run : 
<code>Npm install</code>

You have to create a .env file with database access variables

The databse has 3 tables : players (id, name), rallyes (id, name) and participations (player id, rallye id, score, total_time, minutes, seconds, milliseconds).
