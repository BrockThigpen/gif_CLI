const inquirer = require("inquirer");
const axios = require("axios");
const download = require('download');
const fs = require("fs");

const start = () =>{
  inquirer.prompt({
    name: 'main',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Random Gif', 'Search for Gif'],
  }).then(choice =>{
    return choice.main==='Random Gif' ? getRandom() : getSearch();
  })
}

const getRandom = () =>{
  dlCheck();
  const apiKey ='hzggyqITdRroGeRmklySFuxkCjNXOsK1'
  const url =`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
  axios.get(url)
    .then((response) =>{
      response = response.data.data
      fileWrite(response);
    })
}

const getSearch = () =>{
  dlCheck();
  const apiKey ='hzggyqITdRroGeRmklySFuxkCjNXOsK1'
  const url =`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`
  inquirer.prompt({
    name: 'search',
    type: 'input',
    message: 'Search a Keyword'
  }).then((response) =>{
    axios.get(url+response.search)
      .then((response) =>{
        response = response.data.data[0]
        fileWrite(response)
      })
  })
}

const dlCheck = () =>{
  try {
    if(!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads')
    }
  } catch (err) {
    console.log(err)
  }
}

const fileWrite = (response) =>{
  (async () =>{
    download(response.images.downsized.url).pipe(fs.createWriteStream(`./downloads/${response.id}.gif`))
  })();
}

start();