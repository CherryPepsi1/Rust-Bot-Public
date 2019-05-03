const fs = require('fs');
const Discord = require('discord.js');
const Worker = require('webworker-threads').Worker;
const commands = require('./modules/commands.js');
const sql = require('./modules/sql.js');
const constants = require('./modules/constants.js');

const client = new Discord.Client();
const token = fs.readFileSync(constants.TOKEN_PATH, 'utf-8').slice(0, -1);
var itemArr = [];
var destrArr = []; 

client.on('ready', () => {
  sql.selectAllItems(itemArr);
  sql.selectAllDestr(destrArr); 

  console.log('Rust Bot is ready');
});

client.on('message', (message) => {
  // Check for user message and 'r/' command prefix
  if (!message.author.bot && message.content.startsWith(constants.PREFIX)) {
    var content = message.content.toLowerCase();
    console.log('\n' + message.guild.id);
    console.log(message.author.tag);
    console.log(content);

    var msgArr = [];
    var contentArr, command, params = '';
    if (contentArr = content.split(' ')) {
      // Get command
      if (contentArr[0].length > 2) {
        command = (contentArr.shift().split('/'))[1];
      } else {
        command = content;
      }
      // Get parameters
      params = contentArr.join(' ');    
    }

    switch (command) {
      case 'help':
        message.channel.send(commands.help());
        break;

      case 'item':
        msgArr = commands.item(params, itemArr);
	msgArr.forEach(value => {
          message.channel.send(value);
        });
        break;

      case 'destr':
        msgArr = commands.destr(params, destrArr);
	msgArr.forEach(value => {
          message.channel.send(value);
        });
        break;

      case 'bp':
        message.channel.send(constants.PREMIUM_NOT_FOUND);
        break;

      case 'bpclear':
        message.channel.send(constants.PREMIUM_NOT_FOUND);
        break;

      case 'upgrade':
        message.channel.send(constants.UPGRADE);
        break;

      default:
        console.log('command not found')
        message.channel.send(constants.COMMAND_NOT_FOUND);
    }
  }
});

client.on('error', (err) => {
   console.log(err.message)
});

client.login(token);
