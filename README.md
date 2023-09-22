# Generate Node-RED Node

Generate Node-RED Node is a powerful command-line tool designed to simplify and streamline the process of creating custom Node-RED nodes. Node-RED is a popular flow-based development tool for visual programming, and custom nodes are an essential part of extending its functionality. This tool empowers Node-RED developers by automating much of the node creation process, saving time and effort.

[![Node.js Package](https://github.com/itsvinayak/generate-node-red-node/actions/workflows/npm-publish.yml/badge.svg?event=release)](https://github.com/itsvinayak/generate-node-red-node/actions/workflows/npm-publish.yml)
<a src="https://www.npmjs.com/package/generate-node-red-node">
   
   ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
</a>

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Node-RED is an open-source flow-based development tool for visual programming. It is widely used for connecting hardware devices, APIs, and online services. Creating custom nodes for Node-RED allows you to extend its capabilities and tailor it to your specific needs.

However, writing custom Node-RED nodes from scratch can be a complex and time-consuming task, especially for beginners. This is where Generate Node-RED Node comes in. It simplifies the node creation process by providing a user-friendly interface to configure your node and generate the necessary code.

## Getting Started

To create a Node-RED node using this tool, follow these simple steps:

1. Open your terminal or command prompt.

2. Run the following command:

   ```bash
   npx generate-node-red-node
   ```

   This command will start the node generation wizard and guide you through the process.

3. For help run the following command with **-h** tag
    ```bash
   npx generate-node-red-node -h
   ```

## Usage

The tool will prompt you to provide several pieces of information to configure your Node-RED node, including:

- Node name (without "node-red-contrib-")
- Node description
- Function name (in camel casing)
- Library name (in camel casing)
- Library path

Once you've provided this information, the tool will generate the necessary code for your custom node.

## Customization

Generate Node-RED Node is open-source software, and you are welcome to customize and extend it to meet your specific needs. You can modify the templates, add new features, or contribute to the development of the tool. If you make improvements or bug fixes, consider contributing back to the project.

## Contributing

We welcome contributions from the Node-RED community. If you want to contribute to Generate Node-RED Node, please follow these guidelines:

- Fork the repository and create a branch for your contributions.
- Make your changes and submit a pull request.
- Provide clear and concise descriptions of your changes in the pull request.
- Test your changes thoroughly to ensure they do not introduce new issues.

## License

Generate Node-RED Node is distributed under the [MIT License](LICENSE). You are free to use, modify, and distribute this tool for your projects. Please refer to the license file for more details.

Thank you for using Generate Node-RED Node, and we hope it makes your Node-RED node development process easier and more efficient! If you have any questions or encounter issues, feel free to reach out to the community for support.


This revised README provides a clearer and more organized structure, with detailed information on how to use and contribute to the tool.
