var path = require('path');

import { protractor, browser, by, element } from "protractor";
import { commonPageObjects } from "./common.po";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export class commonPageHelper {

    static async clickOnAnchorText(text: string) {
        await commonPageObjects.clickOnAnchorText(text).click();
        await console.log('Click on link with text ' + text);
    }

    static async verifyPageTitle(pageTitle: string) {
        const title = await browser.getTitle();
        await console.log('Got page title: ' + title);
        expect(title).toEqual(pageTitle);
        await console.log('Verified Page Title');
    }

    static async verifyCurrentUrl(currentUrl: string) {
        const getURL = await browser.getCurrentUrl();
        await console.log('Got page url: ' + getURL);
        expect(getURL).toEqual(currentUrl);
        await console.log('Verified Current Url');
    }

    static async verifyPopupWindow() {
        const windows = await browser.getAllWindowHandles();
        expect(windows.length).toBe(2);
        await browser.switchTo().window(windows[1]);
        await browser.close();
        await browser.switchTo().window(windows[0]);
    }

    static async verifyPopupWindowWithTitle(title: string) {
        const windows = await browser.getAllWindowHandles();
        const until = protractor.ExpectedConditions;
        const windowTitle = element(by.xpath('//title'));
        expect(windows.length).toBe(2);
        browser.ignoreSynchronization = true;
        await browser.switchTo().window(windows[1]);
        await browser.wait(until.presenceOf(windowTitle));
        const popupWindowTitle = await browser.getTitle();
        expect(popupWindowTitle).toEqual(title);
        await browser.close();
        await browser.switchTo().window(windows[0]);
    }
    static async verifyNewLink(text: string, hrefText: string) {
        const href = await commonPageObjects.getHrefTextByText(text);
        expect(href).toEqual(hrefText);
    }

    static async verifyShowPasswordFunctionality(passwordField, togglePasswordVisibilityBtn) {
        await passwordField.sendKeys("testPassword");
        let type = await passwordField.getAttribute('type');
        expect(type).toEqual('password');

        await togglePasswordVisibilityBtn.click();
        type = await passwordField.getAttribute('type');
        expect(type).toEqual('text');
        let text = await passwordField.getAttribute('value');
        expect(text).toEqual('testPassword');

        await togglePasswordVisibilityBtn.click();
        type = await passwordField.getAttribute('type');

        expect(type).toEqual('password');
        text = await passwordField.getAttribute('value');
        expect(text).toEqual('testPassword');
    }

    static getLastEmail(listener) {
        var deferred = protractor.promise.defer();
        console.log('Waiting for an email...');

        global[listener].on('mail', function (mail) {
            deferred.fulfill(mail);
        })
        return deferred.promise;
    }

    static extractLinkFromMail(mail) {
        const html = mail.html;
        const dom = new JSDOM(html);
        return dom.window.document.querySelector('a').textContent;
    }
}