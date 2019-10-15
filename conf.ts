import { browser } from "protractor";
import * as config from "./config.json";
 
var reporters = require('jasmine-reporters');
var MailListener = require("mail-listener2");

declare global {
    namespace NodeJS {
      interface Global {
         document: Document;
         window: Window;
         navigator: Navigator;
         forgotPasswordMailListener: any;
         registrationMailListener: any;
      } 
    }
}

exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=1325x744']
        }
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',

    specs: ['../temp/test-suites/tc-registration.spec.js', '../temp/test-suites/tc-login.spec.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 90000,
        isVerbose: true
    },

    onPrepare: () => {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
        var junitReporter = new reporters.JUnitXmlReporter({
            savePath: 'test-results',
            consolidateAll: false
        });
        jasmine.getEnv().addReporter(junitReporter);

        const initMailListener = (email: string, password: string) => {
            const mailListener = new MailListener({
                username: email,
                password: password,
                host: "imap.gmail.com",
                port: 993, // imap port
                secure: true,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
                mailbox: "INBOX", // mailbox to monitor
                searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
                markSeen: true, // all fetched email willbe marked as seen and not fetched next time
                fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
                mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
                attachments: true, // download attachments as they are encountered to the project directory
                attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
            });
        
            mailListener.start();
        
            mailListener.on("server:connected", function(){
                console.log("Mail listener initialized")
            });
        
            mailListener.on("error", function(err){
              console.log(err)
            });
        
            mailListener.on("server:disconnected", function(){
              console.log("imapDisconnected")
            });

            return mailListener;
        };

        const forgotPasswordMailListener = initMailListener(
            config.login.forgotPassword.email, config.login.forgotPassword.password
        );
        const registrationMailListener = initMailListener(
            config.registration.email, config.registration.password
        );
    
        global.forgotPasswordMailListener = forgotPasswordMailListener;
        global.registrationMailListener = registrationMailListener;
    },

    onCleanup: () => {
        global.forgotPasswordMailListener.stop();
        global.registrationMailListener.stop();
    }
}