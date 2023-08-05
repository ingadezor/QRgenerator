//2 external npm packages used
import inquirer from "inquirer"; //gets inputs from user
import qr from "qr-image"; //generates qr images
//import local module
import fs from "fs";



//1. getting user's input from terminal
inquirer
  .prompt([ //setting question object:
        {"message" : "Type your URL:",
         "name" : "URL"
        }
    ])


  .then((answers) => { //waiting for the answers (obj) from a user
    let URL = answers.URL; //what user inputted

    //2. turning URL into QR code and saving it
    let img = qr.image(URL); //turning to qr code
    img.pipe(fs.createWriteStream("qr_img.png")); //saving  image under that name

    //3. creating .txt file and saving user's input there
    fs.writeFile("urls.txt", URL, (err) =>{
        if(err) throw err;
        console.log("saved");
    });
  })

  
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



