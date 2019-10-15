export class LoginPageConstants {
    static get url() {
        return 'https://accounts.topcoder-dev.com/member'; 
    }

    static get content() {
        return {
            pageTitle: 'Login | Topcoder',
            homePageUrl: 'https://www.topcoder-dev.com/',
            forgotPasswordUrl: 'https://accounts.topcoder-dev.com/member/forgot-password',
            dashboardUrl: 'https://www.topcoder-dev.com/my-dashboard',
            logoutUrl: 'https://www.topcoder-dev.com/logout'
        };
    }
}
