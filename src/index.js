#!/usr/bin/env node

const chalk = require("chalk");
const { parseArgs } = require("util");
const fs = require("fs");
const inquirer = require('inquirer');

// util prototype functions
Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});



const createNodeJSFile = (jsObj, folderName) => {
  // reading the template file
  let JsTemplate = fs.readFileSync("./templates/node_js.txt", "utf-8");
  JsTemplate = JsTemplate.replace(/{{node_name}}/g, jsObj.node_name);
  JsTemplate = JsTemplate.replace(/{{node_function_name}}/g, jsObj.node_function_name);
  JsTemplate = JsTemplate.replace(/{{lib_function_name}}/g, jsObj.lib_function_name);
  JsTemplate = JsTemplate.replace(/{{lib_path}}/g, jsObj.lib_path);
  console.log(chalk.green.bgBlack("Creating node js file"));
  fs.writeFileSync(`./${folderName}/${jsObj.node_name}.js`, JsTemplate);
  return true;
};

const createNodeHtmlFile = (htmlObj, folderName) => {
  let htmlTemplate = fs.readFileSync("./templates/node_html.txt", "utf-8");
  htmlTemplate = htmlTemplate.replace(/{{node_name}}/g, htmlObj.node_name);
  htmlTemplate = htmlTemplate.replace(/{{node_description}}/g, htmlObj.node_description);
  htmlTemplate = htmlTemplate.replace(/{{node_category}}/g, htmlObj.node_category);
  console.log(chalk.green.bgBlack("Creating node html file"));
  fs.writeFileSync(`./${folderName}/${htmlObj.node_name}.html`, htmlTemplate);
  return true;
};

const createNodePackageFile = (packageObj, folderName) => {
  let packageTemplate = fs.readFileSync("./templates/node_package.txt", "utf-8");
  packageTemplate = packageTemplate.replace(/{{node_name}}/g, packageObj.node_name);
  packageTemplate = packageTemplate.replace(/{{node_description}}/g, packageObj.node_description);
  console.log(chalk.green.bgBlack("Creating node package file"));
  fs.writeFileSync(`./${folderName}/package.json`, packageTemplate);
  return true;
};

const questions = [
  {
    type: 'input',
    name: 'node_name',
    message: "Enter Node name: ",
  },
  {
    type: "input",
    name: "node_description",
    message: "Enter Node description: "
  },
  {
    type: "input",
    name: "node_category",
    message: "Enter Node Category: "
  },
  {
    type: "input",
    name: "lib_function_name",
    message: "Enter Lib function name: "
  },
  {
    type: "input",
    name: "lib_path",
    message: "Enter Lib Path: "
  }
];


/**
 * 
 * @param {void}
 * @returns {void}
 */
const createNode = () => {
  inquirer.prompt(questions).then(answers => {
    // create node folder
    let name = answers.node_name || 'dummy-node-name';
    let folderName = `node-red-contrib-${name}`;
    let node_function_name = name;
    fs.mkdirSync(folderName);
    const jsObj = {};
    jsObj.node_name = name;
    jsObj.lib_function_name = answers.lib_function_name || 'dummyFunctionName';
    jsObj.lib_path = answers.lib_path || './dummyPath';
    jsObj.node_function_name = node_function_name.split("-").map((word, index) => {
      if (index === 0) {
        return word;
      }
      word = word.capitalize();
      return word
    }).join("");
    let jsRes = createNodeJSFile(jsObj, folderName);

    let htmlObj = {};
    htmlObj.node_name = name;
    htmlObj.node_description = answers.node_description || 'dummy node description';
    htmlObj.node_category = answers.node_category || 'Category';
    let htmlRes = createNodeHtmlFile(htmlObj, folderName);

    let packageObj = {};
    packageObj.node_name = name;
    packageObj.node_description = answers.node_description || 'dummy node description';
    let packageRes = createNodePackageFile(packageObj, folderName);

    if (jsRes && htmlRes && packageRes) {
      console.log(chalk.green.bgBlack("Node created successfully"));
    } else {
      console.log(chalk.red.bgGreen("Error creating node \n"));
    }
  }).catch(error => {
    console.log(chalk.red.bgGreen("Error creating node \n"), error);
  });
};


/**
 * @param {void}
 * @returns {void}
 * @description get help for the cli
 */
const help = () => {
  console.log(chalk.black.bgYellow("Help : "));
  console.log(chalk.green(" -h, --help : help"));
  console.log(chalk.red("NOTE : "));
  console.table(["Enter the node name without node-red-contrib-",
    "Enter some node description. Can be modified later from the editor",
    "Enter some function name in camel casing. Can be modified later from the editor",
    "Enter some lib name in camel casing. Can be modified later from the editor",
    "Enter the path of the lib. Can be modified later from the editor"]);
  console.log("Happy Coding :) ");
};

const main = () => {
  const options = {
    help: {
      short: "h",
      type: "boolean",
    },
  };
  let args = process.argv;
  const { values } = parseArgs({
    args,
    options,
    allowPositionals: true,
  });
  if (values.help) {
    help();
    process.exit(0);
  } else {
    createNode();
  }
};

if (require.main === module) {
  main();
}