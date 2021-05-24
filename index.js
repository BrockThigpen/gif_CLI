// const inquirer = require("inquirer");
// const axios = require("axios");
// const download = require('download');
// const fs = require("fs");

// const start = () =>{
//   inquirer.prompt({
//     name: 'main',
//     type: 'list',
//     message: 'What would you like to do?',
//     choices: ['Random Gif', 'Search for Gif'],
//   }).then(choice =>{
//     return choice.main==='Random Gif' ? getRandom() : getSearch();
//   })
// }

// const getRandom = () =>{
//   dlCheck();
//   const apiKey ='hzggyqITdRroGeRmklySFuxkCjNXOsK1'
//   const url =`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
//   axios.get(url)
//     .then((response) =>{
//       response = response.data.data
//       fileWrite(response);
//       start();
//     })
// }

// const getSearch = () =>{
//   dlCheck();
//   const apiKey ='hzggyqITdRroGeRmklySFuxkCjNXOsK1'
//   const url =`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`
//   inquirer.prompt({
//     name: 'search',
//     type: 'input',
//     message: 'Search a Keyword'
//   }).then((response) =>{
//     axios.get(url+response.search)
//       .then((response) =>{
//         response = response.data.data[0]
//         fileWrite(response)
//         start();
//       })
//   })
// }

// const dlCheck = () =>{
//   try {
//     if(!fs.existsSync('./downloads')) {
//       fs.mkdirSync('./downloads')
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

// const fileWrite = (response) =>{
//   setTimeout( () =>{    
//     download(response.images.downsized.url).pipe(fs.createWriteStream(`./downloads/${response.id}.gif`))
//   }, 3000)
// }


// start();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const inquirer = require("inquirer");
const axios = require("axios");
const download = require('download');
const fs = require("fs");
const apiKey ='hzggyqITdRroGeRmklySFuxkCjNXOsK1';

const dlCheck = () =>{
  try {
    if(!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads')
    }
  } catch (err) {
    console.log(err)
  }
}

const getter = async () =>{
  const prompt = await mainPrompt()
  const getGif =  prompt==='Random Gif' ? await getRandom() : await getSearch();
  fileWrite(getGif)
}

const mainPrompt = async () =>{
    const choice = await inquirer.prompt({
    name: 'main',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Random Gif', 'Search for Gif'],
  })
  return choice.main
}

const searchPrompt = async () =>{
  const choice = await inquirer.prompt({
    name: 'search',
    type: 'input',
    message: 'Search a Keyword'
  })
  return choice.search
}

const getRandom = async () =>{
  const res = await axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
  return res.data.data
}

const getSearch = async () =>{
  const keyword = await searchPrompt()
  const res = await axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${keyword}`)
  return res.data.data[0]
}

const fileWrite = (gif) =>{
  setTimeout( () =>{    
    download(gif.images.downsized.url).pipe(fs.createWriteStream(`./downloads/${gif.id}.gif`))
    getter()
  }, 3000)
}

dlCheck()
getter()