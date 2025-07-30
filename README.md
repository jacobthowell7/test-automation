# test-automation
Test automation project utilizing Playwright (TS and JS), Postman, and Github Actions for CI/CD

To Run Playwright Tests:
* Option 1: Install and run through the Playwright extension for VSCode
	- https://playwright.dev/docs/getting-started-vscode
* Option 2: Install through npm in terminal and run using npx
	- https://playwright.dev/docs/intro

To Run Postman Tests in Terminal:
* Option 1: Import the collection and environment files into your Postman
	- https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/
* Option 2: Install Newman (npm install -g newman) and run collection through terminal
	- ...\test-automation\postman-api-tests> newman run Basic-Collection.postman_collection.json -e Basic-Collection-Environment.postman_environment.json


