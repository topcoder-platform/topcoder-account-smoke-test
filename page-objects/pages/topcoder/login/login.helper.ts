import { protractor, browser } from "protractor";
import { LoginPageConstants } from "../login/login.constants";
import { LoginPageObject } from "../login/login.po";
import { commonPageHelper } from "../../../common/common.helper";
import { RegistrationPageConstants } from "../registration/registration.constants";
import * as config from "../../../../config.json";

export class LoginPageHelper {
    static async get() {
        await browser.get(LoginPageConstants.url);
        await console.log('User navigated to Topcoder Login Page');
    }

    static async waitForLoginForm() {
        const until = protractor.ExpectedConditions;
        const loginForm = LoginPageObject.loginForm;
        await browser.wait(until.visibilityOf(loginForm), 5000);
    }

    static async fillLoginForm(shouldFillUsingEmail: boolean) {
        const until = protractor.ExpectedConditions;
        const username = shouldFillUsingEmail ? config.login.email : config.login.username;
        const password = config.login.password;

        await browser.wait(until.presenceOf(LoginPageObject.usernameField), 2000);

        await LoginPageObject.usernameField.sendKeys(username);
        await LoginPageObject.passwordField.sendKeys(password);

        await console.log('Login form filled with values: username - ' + username + ', password - ' + password);

        const loginButton = LoginPageObject.loginButton;
        expect(loginButton.isEnabled()).toBeTruthy();

        await loginButton.click();
        console.log('Submitted login form');
    }

    static async waitForLoginSuccess() {
        browser.ignoreSynchronization = true;

        const until = protractor.ExpectedConditions;
        await browser.wait(until.visibilityOf(LoginPageObject.homePageDiv), 90000, 'Error: Element did not display within 90 seconds');

        const currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toEqual(LoginPageConstants.content.homePageUrl);
        console.log('Redirected to home page after login');

        await LoginPageObject.homePageMenu.click();
        await commonPageHelper.clickOnAnchorText('Log Out');
        console.log('Successfully logged out');
    }

    static async loginUsingGoogle() {
        console.log('Login using Google');
        const until = protractor.ExpectedConditions;

        const username = config.login.google.username;
        const password = config.login.google.password;

        await LoginPageObject.googleLogin.click();
        let windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(2);
        // browser.ignoreSynchronization = true;
        // await browser.switchTo().window(windows[1]);

        // await browser.wait(until.visibilityOf(LoginPageObject.googleLoginUsernameField), 90000, 'Error: Element did not display within 90 seconds');
        // await LoginPageObject.googleLoginUsernameField.sendKeys(username);
        // await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        // console.log('Google login: Filled username ' + username);

        // await browser.wait(until.visibilityOf(LoginPageObject.googleLoginPasswordField), 90000, 'Error: Element did not display within 90 seconds');
        // await LoginPageObject.googleLoginPasswordField.sendKeys(password);
        // await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        // console.log('Google login: Filled password ' + password);

        // await browser.switchTo().window(windows[0]);
        // await this.waitForLoginSuccess();
        // windows = await browser.getAllWindowHandles();
        // expect(windows.length).toBe(1);

        console.log('Google login successfully completed');
    }

    static async loginUsingGithub() {
        console.log('Login using Github');
        const until = protractor.ExpectedConditions;

        const username = config.login.github.username;
        const password = config.login.github.password;

        await LoginPageObject.githubLogin.click();
        let windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(2);
        browser.ignoreSynchronization = true;
        await browser.switchTo().window(windows[1]);

        await browser.wait(until.visibilityOf(LoginPageObject.githubLoginUsernameField), 90000, 'Error: Element did not display within 90 seconds');
        await LoginPageObject.githubLoginUsernameField.sendKeys(username);
        await LoginPageObject.githubLoginPasswordField.sendKeys(password);

        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        console.log('Github login: Filled username ' + username + ', password ' + password);

        // await browser.switchTo().window(windows[0]);
        // await this.waitForLoginSuccess();
        // windows = await browser.getAllWindowHandles();
        // expect(windows.length).toBe(1);

        console.log('Github login successfully completed');
    }

    static async loginUsingFacebook() {
        console.log('Login using Facebook');
        await LoginPageObject.facebookLogin.click();
        let windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(2);
        browser.ignoreSynchronization = true;
        await browser.switchTo().window(windows[1]);
        await browser.close();
        await browser.switchTo().window(windows[0]);
        windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(1);

        console.log('Facebook login successfully completed');
    }

    static async loginUsingTwitter() {
        console.log('Login using Twitter');

        await LoginPageObject.twitterLogin.click();
        let windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(2);
        browser.ignoreSynchronization = true;
        await browser.switchTo().window(windows[1]);

        await browser.close();

        await browser.switchTo().window(windows[0]);
        windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(1);

        console.log('Twitter login successfully completed');
    }

    static async verifyRegistrationPageNavigation() {
        await commonPageHelper.clickOnAnchorText('Join Now');
        const currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toEqual(RegistrationPageConstants.url);
        console.log('Redirected to registration page');
    }

    static async verifyPrivacyLinks() {
        await LoginPageObject.privacyLinkAtBottom.click();
        await commonPageHelper.verifyPopupWindowWithTitle(RegistrationPageConstants.content.privacyPolicyPageTitle);

        console.log('Verified privacy link');
    }

    static async verifyAccessibilityMenu() {
        const until = protractor.ExpectedConditions;
        await browser.wait(until.visibilityOf(LoginPageObject.accessibilityMenuIcon));
        await LoginPageObject.accessibilityMenuIcon.click();
        const iframe = await LoginPageObject.accessibilityIframe;

        // sleep to ensure that widget is open by then
        await browser.sleep(1000);
        browser.ignoreSynchronization = true;
        await browser.switchTo().frame(iframe);

        const isDisplayed = await LoginPageObject.widgetBody.isDisplayed();
        expect(isDisplayed).toBe(true);

        console.log('Accessibility menu opened');
    }



    static async verifyShowPasswordFunctionality() {
        await commonPageHelper.verifyShowPasswordFunctionality(LoginPageObject.passwordField, LoginPageObject.togglePasswordVisibilityBtn);
    }

    static async verifyForgotPasswordFunctionality() {
        function getLastEmail() {
            var deferred = protractor.promise.defer();
            console.log('Waiting for an email...');

            global.forgotPasswordMailListener.on('mail', function (mail) {
                deferred.fulfill(mail);
            })
            return deferred.promise;
        }

        const until = protractor.ExpectedConditions;
        const email = config.login.forgotPassword.email;
        const changedPassword = 'Password@123';

        await LoginPageObject.forgotPasswordLink.click();
        const forgotPasswordUrl = await browser.getCurrentUrl();
        expect(forgotPasswordUrl).toEqual(LoginPageConstants.content.forgotPasswordUrl);
        await LoginPageObject.forgotPasswordEmail.sendKeys(email);
        await LoginPageObject.resetPasswordButton.click();
        await browser.wait(until.visibilityOf(LoginPageObject.forgotPasswordMessage));
        const message = await LoginPageObject.forgotPasswordMessage.getText();
        expect(message).toEqual('We have sent you an email with a link to reset your password.')

        const latestMail = await browser.controlFlow().wait(getLastEmail());
        const resetLink = commonPageHelper.extractLinkFromMail(latestMail);
        console.log('Reset password link extracted - ' + resetLink);

        await browser.get(resetLink);
        await browser.wait(until.visibilityOf(LoginPageObject.createNewPasswordField));
        await LoginPageObject.createNewPasswordField.sendKeys(changedPassword);

        await LoginPageObject.setPasswordButton.click();

        browser.ignoreSynchronization = true;
        await browser.wait(until.visibilityOf(LoginPageObject.dashboardReactView));
        const browserUrl = await browser.getCurrentUrl();
        expect(browserUrl).toEqual(LoginPageConstants.content.dashboardUrl);

        await browser.get(LoginPageConstants.content.logoutUrl);
        await browser.wait(until.visibilityOf(LoginPageObject.homePageLoginButton));

        browser.ignoreSynchronization = false;
        await browser.get(LoginPageConstants.url);
        await browser.wait(until.visibilityOf(LoginPageObject.usernameField));
        await LoginPageObject.usernameField.sendKeys(email);
        await LoginPageObject.passwordField.sendKeys(changedPassword);

        await LoginPageObject.loginButton.click();
        await this.waitForLoginSuccess();
    }

    static async verifyNavigationToLoginScreenFromForgotPasswordScreen() {
        const until = protractor.ExpectedConditions;
        await LoginPageObject.forgotPasswordLink.click();
        await browser.sleep(1000);
        await browser.wait(until.visibilityOf(LoginPageObject.forgotPasswordEmail));
        let url = await browser.getCurrentUrl();
        expect(url).toEqual(LoginPageConstants.content.forgotPasswordUrl);
        await commonPageHelper.clickOnAnchorText('Back to Login');
        await browser.wait(until.visibilityOf(LoginPageObject.loginForm));
        url = await browser.getCurrentUrl();
        expect(url).toEqual(LoginPageConstants.url);
    }
}