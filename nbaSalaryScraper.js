const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const util = require('util');

// this line just raises the max number of lines that can be displayed on terminal
util.inspect.defaultOptions.maxArrayLength = null; 

const url = 'https://hoopshype.com/salaries/players/';

// this code gets html page from the url
let getPageData = (url) =>{
    return axios.get(url)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    }) 
}

// this function parses the html code and scrapes data from table
let getData = html => {
    info = [];
    const $ = cheerio.load(html);
    let tableName = 'hh-salaries-ranking-table hh-salaries-table-sortable responsive';
    // based on the table on the site the 2nd child(td tag) of the row shows the player name
    $('tbody tr :nth-child(2)').each((i,elem) => {
        // create an object, and place name in specific var
        info.push({
            playerName : $(elem).text().trim(),
            playerSalary: ""
        });
    });
    // go through a second time to get the actual salary
    // 3rd td tag shows the salary
    $('tbody tr :nth-child(3)').each((i,elem) => {
        info[i].playerSalary = $(elem).text().trim();
    });

    console.log(info);
};

//called the functions

let myhtmlPage = getPageData(url);

//allows the page to load and use it as argument for my function
myhtmlPage.then(function(result){
    getData(result);
});