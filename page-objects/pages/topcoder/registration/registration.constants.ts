export class RegistrationPageConstants {
    static get url() {
        return 'https://accounts.topcoder-dev.com/member/registration'; 
    }

    static get content() {
        return {
            pageTitle: 'Register | Topcoder',
            joinTopcoder: 'JOIN TOPCODER',
            termsUrl: 'http://www.topcoder.com/community/how-it-works/terms/',
            loginUrl: 'https://accounts.topcoder-dev.com/member',
            loginUrlAfterConfirmation: 'https://accounts.topcoder-dev.com/member?retUrl=https:%2F%2Fwww.topcoder-dev.com%2Fsettings%2Fprofile&utm_source=community-app-main',
            privacyPolicyUrl: 'https://www.topcoder.com/community/how-it-works/privacy-policy/',
            privacyPolicyPageTitle: 'Community - How It Works - Privacy Policy',
            registrationSuccessUrl: 'https://accounts.topcoder-dev.com/member/registration-success?retUrl=https:%2F%2Fwww.topcoder-dev.com%2Fsettings%2Fprofile',
            registrationSuccessMsg: `Thanks for joining Topcoder. We've sent you a confirmation link. Please check your email and click the link to activate your account. If you can't find the message, please email support@topcoder.com.`
        };
    }

    static get registrationValues() {
        return {
            firstName: 'test',
            lastName: 'user',
            country: 'India',
            password: 'Password@123'
        }
    }


}
