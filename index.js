import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

var question = 
{
    type: "input",
    name: "url",
    message: "Please enter your URL: ",
}

inquirer
  .prompt(
    /* Pass your questions in here */
    question
  )
  .then((answer) => {
    // Use user feedback for... whatever!!
    // console.log(answer.url.input);
    var qr_svg = qr.image(answer.url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('url.png'));
    
    var svg_string = qr.imageSync('url', { type: 'png' });

    console.log(svg_string);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log("sth else went wrong");
      console.log(error);
    }
  });
