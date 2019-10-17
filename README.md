# Topcoder account app - E2E Tests

#### Software Required
Nodejs v8.11.4+
Chrome Browser

#### Installation:
- Install protractor
`npm install -g protractor`
- Install Typescript
`npm install -g typescript`
-  Install webdriver
`npm install -g webdriver-manager`
- Install dependencies
`npm install`
- In case the webdriver needs to be updated, run the below command
`webdriver-manager update`
- To run tests
`npm run test`
- Test results are generated in test-results/ folder
```
HTML report - TestResult.html
Junit report - junitresults-TopcoderLoginPageTests.xml and junitresults-TopcoderRegistrationPageTests.xml
```
- To view junit reports into html, install xunit-viewer
`npm i -g xunit-viewer`
- HTML report from Junit reports can be generated using this command
`xunit-viewer --results=test-results/ --output=/home/Documents/`

As of now, the tests are running in headless mode. To view the actual chrom browser running the tests, you can remove `--headless` option from `chromeOptions.args` in `config.ts` 

#### Circle CI deployment:
`config.yml` in `.circleci` folder has been updated to run `npm run test` during Circle CI deployment.

#### Implementation Details:
- Total of 23 specs added, covering all scenarios present in the "Test case" sheet
- Additional Features added:
  - E2E test added covering the whole registration flow, by automatically reading the "activation link" from the entered registration email and activating the account using the actual "activation link".
  - E2E test added covering the whole forgot password flow, by automatically reading the "reset password link" from the entered emailId and changing the password using the above link.
  - E2E test added of logging in using Google and Github accounts, by entering actual "Google/Github" credentials and waiting for popup to close along with checking redirection to dashboard.
  - Along with Junit XML Reporter, Jasmine HTML reporter has also been added for convenience. 

Note:
- Twitter login could have also been covered in similar way but there is no way to register a Twitter account initially, on registration page.

#### Configuration details:
- config.json holds the data level configuration, like email credentials, confirmation link.
In case registration/forgotPassword account credentials are changed, please ensure that "Less secure apps" option is turned on (https://www.google.com/settings/security/lesssecureapps)
- conf.ts holds the application configuration, like jasmine reporters to be configured, specs to be run etc.
