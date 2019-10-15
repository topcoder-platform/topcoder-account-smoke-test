import { protractor, browser, by, element } from "protractor";
import { RegistrationPageConstants } from "./registration.constants";
import { RegistrationPageObject } from "./registration.po";
import { commonPageHelper } from "../../../common/common.helper";
import * as config from "../../../../config.json";
import { LoginPageObject } from "../login/login.po";

export class RegistrationPageHelper {
    static async get() {
        await browser.get(RegistrationPageConstants.url);
        await console.log('User navigated to Topcoder Registration Page');
    }

    static async waitForRegistrationForm() {
        const until = protractor.ExpectedConditions;
        const registrationForm = RegistrationPageObject.registrationForm;
        await browser.wait(until.visibilityOf(registrationForm), 5000);
    }

    static async verifyTextInH1(expectedH1Text: string) {
        const until = protractor.ExpectedConditions;
        const h1 = element(by.xpath('//h1'));
        await browser.wait(until.presenceOf(h1));
        const h1Text = await h1.getText();
        await console.log('Got H1 text: ' + h1Text);
        expect(h1Text).toEqual(expectedH1Text);
        await console.log('Verified H1 text');
    }

    static async fillRegistrationForm(emailInput: string) {
        const until = protractor.ExpectedConditions;
        const registrationValues = RegistrationPageConstants.registrationValues;
        const firstName = registrationValues.firstName;
        const lastName = registrationValues.lastName;
        const country = registrationValues.country;
        const password = registrationValues.password;
        const currDate = this.getCurrentDate();
        const email = emailInput != null ? emailInput : ('e' + currDate + "@gmail.com");
        const username = 'e' + currDate;

        await browser.wait(until.presenceOf(RegistrationPageObject.firstNameField), 2000);
        await RegistrationPageObject.firstNameField.sendKeys(firstName);
        await RegistrationPageObject.lastNameField.sendKeys(lastName);
        await RegistrationPageObject.countryField.sendKeys(country);
        await browser.wait(until.visibilityOf(RegistrationPageObject.countryDropdown), 2000);
        const dropdownOptions = await RegistrationPageObject.countryDropdownOptions;
        for (const d of dropdownOptions) {
            const text = await d.getText();
            if (text === country) {
                await d.click();
                break;
            }
        }
        await RegistrationPageObject.emailField.sendKeys(email);
        await RegistrationPageObject.usernameField.sendKeys(username);
        await RegistrationPageObject.passwordField.sendKeys(password);

        await console.log('Registration form filled with values: firstName - ' + firstName + ', lastName - ' + lastName + ', country - ' + country + ', email - ' + email + ' username - ' + username + ', password - ' + password);

        const registerButton = RegistrationPageObject.registerButton;
        expect(registerButton.isEnabled()).toBeTruthy();

        await registerButton.click();
        console.log('Submitted registration form');
    }

    static generateRandomEmail() {
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        }
        return config.registration.username + '+' + uuidv4() + '@gmail.com';
    }

    static async verifyConfirmationLinkFromEmail() {
        const latestMail = await browser.controlFlow().wait(commonPageHelper.getLastEmail('registrationMailListener'));
        const confirmationLink = commonPageHelper.extractLinkFromMail(latestMail);
        console.log('Activation link extracted - ' + confirmationLink);

        await this.verifyConfirmationLink(confirmationLink, false);
    }
    
    static async waitForRegistrationSuccess() {
        const until = protractor.ExpectedConditions;
        await browser.wait(until.visibilityOf(RegistrationPageObject.registrationSuccessContainer));
    }

    static async verifyRegistrationSuccessMsg(msg : string) {
        let messageText = await RegistrationPageObject.registrationSuccessMsgContainer.getText();
        messageText = messageText.replace(/(\r\n|\n|\r)/gm, " ");
        await expect(messageText).toContain(msg);
        console.log('Verified registration success message');
    }

    static async verifyConfirmationLink(
        confirmationLink : string = config.registration.authLink, shouldCheckForAlert : boolean = true) {
        const until = protractor.ExpectedConditions;
        browser.ignoreSynchronization = true;
        await browser.get(confirmationLink);

        if (shouldCheckForAlert) {
            browser.wait(until.alertIsPresent(), 3000, 'Error: alert did not appear in 3 secs');
            const alertDialog = await browser.driver.switchTo().alert();
            const alertText = await alertDialog.getText();
            expect(alertText).toEqual('User has been activated');
            await alertDialog.accept();
        }
        
        await browser.wait(until.visibilityOf(LoginPageObject.loginForm));
        const browserUrl = await browser.getCurrentUrl();
        expect(browserUrl).toEqual(RegistrationPageConstants.content.loginUrlAfterConfirmation);
    }

    static async clickSocialAuth(title: string) {
        await RegistrationPageObject.getRegistrationSocialAuthLink(title).click();
        console.log('Clicked social auth link with title ' + title);
    }

    static async verifyPrivacyLinks() {
        await commonPageHelper.clickOnAnchorText('Privacy Policy');
        await commonPageHelper.verifyPopupWindowWithTitle(RegistrationPageConstants.content.privacyPolicyPageTitle);

        await RegistrationPageObject.privacyLinkAtBottom.click();
        await commonPageHelper.verifyPopupWindowWithTitle(RegistrationPageConstants.content.privacyPolicyPageTitle);

        console.log('Verified privacy links');
    }

    static async verifyShowPasswordFunctionality() {
        await commonPageHelper.verifyShowPasswordFunctionality(RegistrationPageObject.passwordField, RegistrationPageObject.togglePasswordVisibilityBtn);
    }

    static async verifyLoginPageNavigation() {
        const browserUrl = await browser.getCurrentUrl();
        expect(browserUrl).toEqual(RegistrationPageConstants.content.loginUrl);
    }

    static async clickLogo() {
        await RegistrationPageObject.logo.click();
        console.log('Click on logo');
    }

    private static getCurrentDate() {
        const pad = (n : number) => {
            return n < 10 ? '0' + n : n;
        };

        const date = new Date();

        return date.getFullYear().toString() + 
            pad(date.getMonth() + 1) + 
            pad(date.getDate()) + 
            pad(date.getHours()) + 
            pad(date.getMinutes()) + 
            pad(date.getSeconds());
    }
}