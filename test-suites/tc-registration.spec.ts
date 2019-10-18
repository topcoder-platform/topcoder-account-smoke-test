import { browser } from "protractor";
import { RegistrationPageConstants } from "../page-objects/pages/topcoder/registration/registration.constants";
import { RegistrationPageHelper } from "../page-objects/pages/topcoder/registration/registration.helper";
import { commonPageHelper } from "../page-objects/common/common.helper";
import * as config from "../config.json";

describe('Topcoder Registration Page Tests: ', () => {
    const registrationUrl = RegistrationPageConstants.url;

    beforeEach(() => {
        browser.ignoreSynchronization = false;
    });


    it('should verify user is able to successfully register and login to the system', async () => {
        await RegistrationPageHelper.get();
        await commonPageHelper.verifyCurrentUrl(registrationUrl);
        await commonPageHelper.verifyPageTitle(RegistrationPageConstants.content.pageTitle);

        await RegistrationPageHelper.waitForRegistrationForm();
        await RegistrationPageHelper.verifyTextInH1(RegistrationPageConstants.content.joinTopcoder);

        await RegistrationPageHelper.fillRegistrationForm(null);
        await RegistrationPageHelper.waitForRegistrationSuccess();
        await commonPageHelper.verifyCurrentUrl(RegistrationPageConstants.content.registrationSuccessUrl);
        await RegistrationPageHelper.verifyRegistrationSuccessMsg(RegistrationPageConstants.content.registrationSuccessMsg);
        await RegistrationPageHelper.verifyConfirmationLink();
    });

    xit('should verify user is able to successfully register by retrieving confirmation mail from email inbox', async () => {
        await RegistrationPageHelper.get();
        await RegistrationPageHelper.waitForRegistrationForm();
        await RegistrationPageHelper.fillRegistrationForm(RegistrationPageHelper.generateRandomEmail());
        await RegistrationPageHelper.waitForRegistrationSuccess();
        await RegistrationPageHelper.verifyConfirmationLinkFromEmail();
    });

    it('should verify user is able to register using Github credentials', async () => {
        await RegistrationPageHelper.get();
        await RegistrationPageHelper.clickSocialAuth('Register with Github');
        await commonPageHelper.verifyPopupWindowWithTitle('Sign in to GitHub · GitHub');
    });

    it('should verify verify user is able to register using Google credentials', async () => {
        await RegistrationPageHelper.get();
        await RegistrationPageHelper.clickSocialAuth('Register with Google');
        await commonPageHelper.verifyPopupWindow();
    });

    it('should verify user is able to register using Facebook credentials', async () => {
        await RegistrationPageHelper.get();
        await RegistrationPageHelper.clickSocialAuth('Register with Facebook');
        await commonPageHelper.verifyPopupWindow();
    });

    it('should verify if "Show/Hide" Password button works', async () => {
        await RegistrationPageHelper.get();
        await RegistrationPageHelper.verifyShowPasswordFunctionality();
    });

    it('should verify whether the user is redirected to Terms page on clicking the Terms link', async () => {
        await RegistrationPageHelper.get();
        await commonPageHelper.verifyNewLink('Terms', config.registration.Terms);
    });

    it('should verify whether the user is redirected to Privacy Policy page', async () => {
        await RegistrationPageHelper.get();
        await commonPageHelper.verifyNewLink('Privacy Policy', config.registration.PrivacyPolicy);
    });

    it('should verify whether the user is redirected to the Login page on clicking the LOG IN link', async () => {
        await RegistrationPageHelper.get();
        await commonPageHelper.clickOnAnchorText('Log in');
        await RegistrationPageHelper.verifyLoginPageNavigation();
    });

    it('should verify if clicking on Logo takes the user to the Login screen', async () => {
        await RegistrationPageHelper.get();
        await RegistrationPageHelper.clickLogo();
        await RegistrationPageHelper.verifyLoginPageNavigation();
    });
});
