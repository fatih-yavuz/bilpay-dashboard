export default (email: string, password: string): Promise<{ email: string, session: string }> => {
    return new Promise((res, rej) => {
        if (email === "admin@admin.com" && password === "admin") {
            res({ email, session: String(Math.floor(Math.random() * 100000)) });
        } else {
            rej("Authentication Failure");
        }
    });
};
