import { browser, by, element, ElementFinder } from "protractor";

export class RegistrationPageObject {

    static get registrationForm() {
        return element(by.name('vm.registerForm'));
    }

    static get firstNameField() {
        return element(by.name('firstname'));
    }

    static get lastNameField() {
        return element(by.name('lastname'));
    }

    static get usernameField() {
        return element(by.name('username'));
    }

    static get emailField() {
        return element(by.name('email'));
    }

    static get passwordField() {
        return element(by.name('password'));
    }

    static get countryField() {
        return element(by.name('country'));
    }

    static get countryDropdown() {
        return element(by.className('angucomplete-dropdown'));
    }

    static get countryDropdownOptions() {
        return element.all(by.className('angucomplete-row'));
    }

    static get registerButton() {
        return element(by.css("button[type = 'submit']"));
    }

    static get registrationSuccessContainer() {
        return element(by.className('registered-successfully-container'));
    }

    static get registrationSuccessMsgContainer() {
        return element(by.className('message'));
    }

    static getRegistrationSocialAuthLink(title: string) {
        return element(by.css('[title="' + title + '"]'));
    }

    static get privacyLinkAtBottom() {
        return element(by.className('privacy-policy'));
    }

    static get togglePasswordVisibilityBtn() {
        return element(by.id('toggleInputTypeBtn'));
    }

    static get logo() {
        return element(by.className('logo-link'));
    }
}
