const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.ycombinator.com/';

// this tries to retrieve html page
axios.get(url)
    .then(Response => {
        console.log(Response.data);
    })
    .catch(error => {
        console.log(error);
    })