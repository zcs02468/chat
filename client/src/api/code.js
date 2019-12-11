import instance from "./axios";

const getCode = () => {
    return instance.get("/api/code/getCode");
};

export default {
    getCode
};
