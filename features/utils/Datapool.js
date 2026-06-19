export class DataPool {
    static credentials = {
        valid: {
            username: process.env.USERNAME || 'test@webdriver.io',
            password: process.env.PASSWORD || 'Test1234!',
        },
        invalid: {
            username: 'invalid-email',
            password: 'short',
        },
        empty: {
            username: '',
            password: '',
        },
    };
}
