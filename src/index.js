#!/usr/bin/env node

const chalk = require("chalk");
const { parseArgs } = require("util");
const fs = require("fs");



const createNode = (name) => {
  // create node folder
  let folderName = `node-red-contrib-${name}`;
  fs.mkdirSync(folderName);
  // create package.json
  let packageJson = {
    name: `node-red-contrib-${name}`,
    version: "1.0.0",
    description: "",
    main: `${name}.js`,
    scripts: {
      test: "echo \"Error: no test specified\" && exit 1"
    },
    author: "",
    license: "ISC",
  }
  // adding node
  packageJson["node-red"] = {};
  packageJson["node-red"]["nodes"] = {};
  packageJson["node-red"]["nodes"][`${name}`] = `${name}.js`;

  fs.writeFileSync(`${folderName}/package.json`, JSON.stringify(packageJson, null, 2));


  let functionName = "dummyFunction";
  // create js file
  let jsFile = `module.exports = function (RED) {
  function ${functionName}(config) {
    RED.nodes.createNode(this, config);
    let node = this;

    node.on('input', function (msg, send, done) {
      // lib.${functionName}(msg, config, function (err, response) {
      //   if (err) {
      //     node.error(err, msg);
      //   } else {
      //     send(response);
      //     done();
      //   }
      // });
    });
  }
  RED.nodes.registerType('${name}', ${functionName});
};`;
  fs.writeFileSync(`${folderName}/${name}.js`, jsFile);

  // create html file
  let htmlFile = `<script type="text/javascript">
  RED.nodes.registerType('${name}', {
      category: 'dummy',
      color: '#a6bbcf',
      defaults: {
          name: { value: "" },
      },
      inputs: 1,
      outputs: 2,
      icon: "file.png",
      label: function () {
          return this.name || "${name}";
      }
  });
</script>

<script type="text/x-red" data-template-name="${name}">
  <div class="form-row">
      <label for="node-input-name"><i class="icon-tag"></i> Name</label>
      <input type="text" id="node-input-name" placeholder="Name">
  </div>   
      <h3>Description</h3>
      <p></p>
</script>

<script type="text/x-red" data-help-name="${name}">
  <p></p>
</script>
`

  fs.writeFileSync(`${folderName}/${name}.html`, htmlFile);

  console.log(chalk.green.bgBlack("Node created successfully"));
  return true;
};


/**
 * @param {void}
 * @returns {void}
 * @description get help for the cli
 */
const help = () => {
  console.log(chalk.black.bgYellow("Help : "));
  console.log(chalk.green(" -h, --help : help"));
  console.log(chalk.green(" -n, --name : name of the node"));
  console.log("Happy Coding :) ");
};

const main = () => {
  const options = {
    name: {
      type: "string",
      short: "n",
    },
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
  } else if (values.name) {
    console.log("setting node name : ", values.name);
    let res = createNode(values.name);
    if(!res){
      console.log(chalk.red.bgGreen("Error creating node \n"));
    }
  } else {
    console.log(chalk.red.bgGreen("No name passed for node \n"));
    help();
    process.exit(0);
  }
};

if (require.main === module) {
  main();
}