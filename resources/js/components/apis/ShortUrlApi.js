import axios from "axios";

const ShortUrlApi = {
    getRecent: () => {
        return axios.get('/api');
    },


}

export default ShortUrlApi;
