const inquirer = require('inquirer');
const fs = require('fs');
const SVG = require('svg.js');

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => input.length > 0 && input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hex):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hex):',
    },
  ]);

  return userInput;
}

(async () => {
  async function generateLogo(userInput) {
    const draw = SVG().size(300, 200);
    const shape = draw[userInput.shape]();

    shape.fill(userInput.shapeColor);
    shape.attr('cx', 150).attr('cy', 100);

    draw.text(userInput.text).fill(userInput.textColor).move(150, 100).font({ size: 30, anchor: 'middle' });

   
    const svgContent = draw.svg();
    fs.writeFileSync('logo.svg', svgContent);

    console.log('Generated logo.svg');
  }

  async function run() {
    const userInput = await getUserInput();
    await generateLogo(userInput);
  }

  
  await run();
})();
