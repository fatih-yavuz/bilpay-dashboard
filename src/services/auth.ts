export default (email: string, password: string) => {
    return new Promise((res, rej) => {
        if (email === "admin@admin.com" && password === "admin") {
            res(Math.floor(Math.random() * 100000));
        } else {
            rej("error");
        }
    });
};