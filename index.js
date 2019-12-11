const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios=require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?"
    },
    {
      type: "input",
      name: "food",
      message: "What is your favorite food?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

var bio_pic;
var bio;               //text
var num_followers=0;
var num_followed=0;
var num_stars=0;
var num_repos=0;
var location;
var blog_URL;
var github_URL;



function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}


  inquirer
  .prompt([{
    type: "input",
    message: "Enter your GitHub username:",
    name: "username"
  },
  {type: "input",
    message: "What is your favorite color:",
    name: "Color"
  }])
  .then(function({ username,Color }) {
    const queryUrl_repos = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl_repos).then(function(res) {
      num_repos=
      bio_pic=res.data[0].owner.avatar_url;
      console.log(bio_pic);
      //const repoNamesStr = repoNames.join("\n");
      console.log(Color);

      const queryUrl_bio = `https://api.github.com/users/${username}/repos?per_page=100`;

    });



    
  });




//   fs.writeFile("repos.txt", repoNamesStr, function(err) {
    //     if (err) {
    //       throw err;
    //     }

    //     console.log(`Saved ${repoNames.length} repos`);
    //     //console.log(res);
    //   });


 // promptUser()
//   .then(function(answers) {

// ///////////////////////////////////
// //get github info:
// //const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

// axios
//   .get("https://icanhazdadjoke.com/", config)
//   .then(function(res) {
//     const { joke } = res.data;

//     appendFileAsync("jokes.txt", joke + "\n").then(function() {
//       readFileAsync("jokes.txt", "utf8").then(function(data) {
//         console.log("Saved dad jokes:");
//         console.log(data);
//       });
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// ////////////////////////////////

//     const html = generateHTML(answers);

//     return writeFileAsync("index.html", html);
//   })
//   .then(function() {
//     console.log("Successfully wrote to index.html");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });