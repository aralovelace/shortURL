import axios from "axios";

const ShortUrlApi = {
    getRecent: () => {
        return axios.get('/api');
    },

    add: (data) => {
        return axios.post('/api',data);
    }


}

export default ShortUrlApi;
