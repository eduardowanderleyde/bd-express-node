

 // server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const pg = require('pg');
const conString = "postgres://mrabacns:4RxgFVB51ULal4Q3lP_ttgzVFDW_6dlb@motty.db.elephantsql.com/mrabacns" //Can be found in the Details page
const client = new pg.Client(conString);
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
let output;

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * FROM tarefas', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    output=result.rows[0].descricao;
    console.log(result.rows[0].descricao);
    // >> output: 2018-08-23T14:02:57.117Z
    // client.end();
  });
});


// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(express.urlencoded());

app.post("/tarefas", function(request,response){
  console.log(request.body.dream);
  client.connect(function(err) {

  client.query(`INSERT INTO tarefas(descricao,feita) values('${request.body.dream}',true)`, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    // >> output: 2018-08-23T14:02:57.117Z
    // client.end();
  });
});
  response.status(200);
})
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A cool thing made with Glitch">

    <title>Welcome to Glitch!</title>

    <link id="favicon" rel="icon" href="https://glitch.com/edit/favicon-app.ico" type="image/x-icon">
    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="/style.css">

    <!-- import the webpage's client-side javascript file -->

  </head>
  <body>
    <header>
      <h1>A Dream of the Future</h1>
    </header>

    <main>
      <h2>Oh hi, ${output}</h2>

      <p>Tell me your hopes and dreams:</p>

      <form action="/tarefas" method="post">
        <label>
          New Dream
          <input name="dream" type="text" maxlength="100" required placeholder="Dreams!">
        </label>
        
        <button type="submit" id="submit-dream">Add Dream</button>
      </form>

      <section class="dreams">
        <ul id="dreams"></ul>
      </section>
    </main>

    <footer>Made with <a href="https://glitch.com">Glitch</a>!</footer>

    <!-- include the Glitch button to show what the webpage is about and
          to make it easier for folks to view source and remix -->
    <div class="glitchButton" style="position:fixed;top:2em;right:20px;"></div>
    <script src="https://button.glitch.me/button.js" defer></script>
  </body>
</html>
`);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
