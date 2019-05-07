const fs = require('fs');
const Discord = require('discord.js');
const commands = require('./modules/commands.js');
const sql = require('./modules/sql.js');
const templates = require('./modules/templates.js');
const constants = require('./modules/constants.js');

const client = new Discord.Client();
const token = fs.readFileSync(constants.TOKEN_PATH, 'utf-8').slice(0, -1);
var itemArr = [];
var destrArr = [];
var puzzleArr = [];

client.on('ready', () => {
  if (itemArr.length == 0) {
    sql.selectAllItems(itemArr);
  }
  if (destrArr.length == 0) {
    sql.selectAllDestr(destrArr);
  }
  if (puzzleArr.length == 0) {
    sql.selectAllPuzzles(puzzleArr);
  }
  console.log('Rust Bot is ready');
});

client.on('message', (message) => {
  // Check for user message and 'r/' command prefix
  if (!message.author.bot && message.content.startsWith(constants.PREFIX)) {
    var content = message.content.toLowerCase();
    if (message.guild) {
      console.log(`\n${message.guild.id}`);
    } else {
      console.log(`\n${message.channel.id}`);
    }
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

      case 'puzzle':
        msgArr = commands.puzzle(params, puzzleArr);
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

      case 'donate':
        message.author.send(templates.donateUrl(message.author.id));
        break;

      case 'comment':
        client.guilds.find(g => g.id === constants.SUPPORT_SERVER)
          .channels.find(c => c.id === constants.SUPPORT_CHANNEL)
          .send(`**${message.author.username}**\n${params}`);
        break;

      case 'commenta':
        client.guilds.find(g => g.id === constants.SUPPORT_SERVER)
          .channels.find(c => c.id === constants.SUPPORT_CHANNEL)
          .send(`**Anonymous**\n${params}`);
        break;

      default:
        console.log('command not found')
        message.channel.send(constants.COMMAND_NOT_FOUND);
    }
  }
});

client.on('error', (err) => {
  console.log(err.message);
});

client.login(token);
