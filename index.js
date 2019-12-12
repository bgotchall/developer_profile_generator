const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios=require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

// 
var name;
var fav_color;
var bio_pic;
var bio;               //text
var num_followers=0;
var num_following=0;
var num_stars=0;
var num_repos=0;
var location;
var blog_URL;
var github_URL;
var company;




function generateHTML() {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      />
      <title>Document</title>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col header">
            <img src="${bio_pic}" />
            <h1>Hi!</h1>
            <h1>My name is ${name}</h1>
            <h3>Currently at ${company}</h3>
            <p>${location}</p>
            <a href=${blog_URL}>Blog</a>
            <a href=${github_URL}>GitHub</a>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>${bio}</p>
          </div>
        </div>
        <div class="row">
          <div class="col card">
            <p>Public Repositories</p>
            <p>${num_repos}</p>
          </div>
          <div class="col card">
            <p>Followers</p>
            <p>${num_followers}</p>
          </div>
        </div>
        <div class="row">
            <div class="col card">
              <p>GitHub Stars</p>
              <p>${num_stars}</p>
            </div>
            <div class="col card">
              <p>Following</p>
              <p>${num_following}</p>
            </div>
          </div>
      </div>
    </body>
  </html>
  <style>
  
  *{
    text-align:center;
   
  }
    
  .card {
    background-color:${fav_color};
    margin:10px;
    
  }
  
  .header{
    background-color:${fav_color};
  }
  
  </style>
  `;
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
      
      bio_pic=res.data[0].owner.avatar_url;
      num_stars=0;
      res.data.forEach(element => {
          num_stars+=element.stargazers_count;
      });
      console.log(bio_pic);
      //const repoNamesStr = repoNames.join("\n");
      console.log(Color);
    fav_color=Color;
      
    }).then(function(){
     const queryUrl_bio = `https://api.github.com/users/${username}`;

    axios.get(queryUrl_bio).then(function(res) {
        name=res.data.name;
        num_repos=res.data.public_repos;
        bio=res.data.bio;
        num_following=res.data.following;
        num_followers=res.data.followers;
        location=res.data.location;
        blog_URL=res.data.blog;
        github_URL=res.data.html_url;
        company=res.data.company;
        console.log(num_repos);
        console.log(bio);
        console.log(num_following);
        console.log(num_followers);
        console.log(location);
        console.log(blog_URL);
        console.log(github_URL);
        console.log(company);
       

        const html = generateHTML();

            return writeFileAsync("index.html", html);
          })
          .then(function() {
            console.log("Successfully wrote to index.html");
          })
          .catch(function(err) {
            console.log(err);
          });
  
      
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


//function promptUser() {
    //   return inquirer.prompt([
    //     {
    //       type: "input",
    //       name: "name",
    //       message: "What is your name?"
    //     },
    //     {
    //       type: "input",
    //       name: "location",
    //       message: "Where are you from?"
    //     },
    //     {
    //       type: "input",
    //       name: "hobby",
    //       message: "What is your favorite hobby?"
    //     },
    //     {
    //       type: "input",
    //       name: "food",
    //       message: "What is your favorite food?"
    //     },
    //     {
    //       type: "input",
    //       name: "github",
    //       message: "Enter your GitHub Username"
    //     },
    //     {
    //       type: "input",
    //       name: "linkedin",
    //       message: "Enter your LinkedIn URL."
    //     }
    //   ]);
    // }