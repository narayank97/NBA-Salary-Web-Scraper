const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const util = require('util');

const url = 'https://hoopshype.com/salaries/players/';

let getPageData = (url) =>{
    return axios.get(url)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    }) 
}

let getData = html => {
    info = [];
    const $ = cheerio.load(html);
    let tableName = 'hh-salaries-ranking-table hh-salaries-table-sortable responsive';

    $('tbody tr :nth-child(2)').each((i,elem) => {
        info.push({
            playerName : $(elem).text().trim(),
            playerSalary: ""
        });
    });

    $('tbody tr :nth-child(3)').each((i,elem) => {
        info[i].playerSalary = $(elem).text().trim();
    });

    console.log(info);
};

let myhtmlPage = getPageData(url);

myhtmlPage.then(function(result){
    getData(result);
});