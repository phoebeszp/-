import axios from 'axios';
export function saveRequest(param) {
    const requestUrl = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";
    try {
        return axios.post(requestUrl, param);
    }
    catch (error) {
        return error(error);
    }
}
