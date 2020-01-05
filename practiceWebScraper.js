const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.ycombinator.com/';

// this tries to retrieve html page
let getPageData = (url) =>{
    return axios.get(url)
    .then(response => {
        //console.log(myhtmlPage.data);
        //console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.log(error);
    }) 
}

let getData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('table.itemlist tr td:nth-child(3)').each((i,elem) => {
        data.push({
            title : $(elem).text(),
            link: $(elem).find('a.storylink').attr('href')
        });
    });
    console.log(data);
};

let myhtmlPage = getPageData(url);

//this waits for the page to load then executes getData on the page
myhtmlPage.then(function(result){
    getData(result);
});