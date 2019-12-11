import instance from "./axios";

const login = (data) => {
    return instance.post("/api/user/login", data);
};
const registered = (data) => {
    return instance.post("/api/user/register", data);
};

export default {
    registered,
    login
};
