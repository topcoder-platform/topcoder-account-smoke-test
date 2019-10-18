import { browser } from "protractor";
import { LoginPageConstants } from "../page-objects/pages/topcoder/login/login.constants";
import { LoginPageHelper } from "../page-objects/pages/topcoder/login/login.helper";
import { commonPageHelper } from "../page-objects/common/common.helper";
import * as config from "../config.json";

describe('Topcoder Login Page Tests: ', () => {
    const loginUrl = LoginPageConstants.url;

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
    });

    afterEach(() => {
        browser.restart();
    })

    it('should verify user is able to login successfully using username', async () => {
        await LoginPageHelper.get();
        await commonPageHelper.verifyCurrentUrl(loginUrl);
        await commonPageHelper.verifyPageTitle(LoginPageConstants.content.pageTitle);

        await LoginPageHelper.waitForLoginForm();
        await LoginPageHelper.fillLoginForm(false);
        await LoginPageHelper.waitForLoginSuccess();
    });

    it('should verify user is able to login successfully using email', async () => {
        await LoginPageHelper.get();
        await commonPageHelper.verifyCurrentUrl(loginUrl);
        await commonPageHelper.verifyPageTitle(LoginPageConstants.content.pageTitle);

        await LoginPageHelper.waitForLoginForm();
        await LoginPageHelper.fillLoginForm(true);
        await LoginPageHelper.waitForLoginSuccess();
    });

    xit('should verify user is able to reset the password successfully using "Forgot Password" option', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.verifyForgotPasswordFunctionality();
    });

    it('should verify user is able to navigate back to login screen from "Forgot Password" screen', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.verifyNavigationToLoginScreenFromForgotPasswordScreen();
    });

    it('should check if "Log In with Google" is working', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.loginUsingGoogle();
    });

    it('should check if "Log In with Github" is working', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.loginUsingGithub();
    });

    it('should check if "Log In with Facebook" is working', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.loginUsingFacebook();
    });

    it('should check if "Log In with Twitter" is working', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.loginUsingTwitter();
    });

    it('should verify whether the user is redirected to the Registration page on clicking the "Join Now" link', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.verifyRegistrationPageNavigation();
    });

    it('should verify whether the user is redirected to the privacy policy page on clicking the Privacy Policy link', async () => {
        await LoginPageHelper.get();
        await commonPageHelper.verifyNewLink('Privacy Policy', config.login.PrivacyPolicy);
    });

    it('should verify whether the Accessibility Menu pops up on clicking the human icon in right corner of page', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.verifyAccessibilityMenu();
    });

    it('should verify if "Show/Hide" Password button works', async () => {
        await LoginPageHelper.get();
        await LoginPageHelper.verifyShowPasswordFunctionality();
    });
});
