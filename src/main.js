const fs = require('fs');
const Discord = require('discord.js');
const DBL = require('dblapi.js');
const commands = require('./modules/commands.js');
const sql = require('./modules/sql.js');
const templates = require('./modules/templates.js');
const constants = require('./modules/constants.js');

const botToken = fs.readFileSync(constants.BOT_TOKEN_PATH, 'utf-8').slice(0, -1);
const dblToken = fs.readFileSync(constants.DBL_TOKEN_PATH, 'utf-8').slice(0, -1);

const options = { statsInterval: constants.STATS_INTERVAL };
const client = new Discord.Client();
const dbl = new DBL(dblToken, options, client);

var itemArr = [];
var destrArr = [];
var puzzleArr = [];

/**
 * Checks for permission to send messages.
 */
function hasPerm(message) {
  if (message.channel.type == 'text' &&
      !message.channel.memberPermissions(client.user).has('SEND_MESSAGES')) {
    console.log('missing permissions');
    message.author.send(constants.PERMISSION_NOT_FOUND);
    return false;
  }
  return true;
}

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
    fs.appendFile(constants.LOG_PATH, templates.inputLog(message), (err) => {
      if (err) console.log(err.message);
    });

    var msgArr = [];
    var content = message.content.toLowerCase();
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
        if (hasPerm(message)) {
          console.log('listing commands');
          message.channel.send(constants.HELP);
        }
        break;

      case 'item':
        if (hasPerm(message)) {
          msgArr = commands.item(params, itemArr);
          msgArr.forEach(value => {
            message.channel.send(value);
          });
        }
        break;

      case 'destr':
        if (hasPerm(message)) {
          msgArr = commands.destr(params, destrArr);
          msgArr.forEach(value => {
            message.channel.send(value);
          });
        }
        break;

      case 'puzzle':
        if (hasPerm(message)) {
          msgArr = commands.puzzle(params, puzzleArr);
          msgArr.forEach(value => {
            message.channel.send(value);
          });
        }
        break;

      case 'bp':
        if (hasPerm(message)) {
          message.channel.send(constants.PREMIUM_NOT_FOUND);
        }
        break;

      case 'bpclear':
        if (hasPerm(message)) {
          message.channel.send(constants.PREMIUM_NOT_FOUND);
        }
        break;

      case 'upgrade':
        message.author.send(constants.UPGRADE);
        break;

      case 'donate':
        message.author.send(templates.donateUrl(message.author.id));
        break;

      case 'comment':
        client.guilds.find(g => g.id == constants.SUPPORT_SERVER)
          .channels.find(c => c.id == constants.SUPPORT_CHANNEL)
          .send(`**${message.author.username}**\n${params}`);
        message.author.send(constants.COMMENT_POSTED);
        break;

      case 'commenta':
        client.guilds.find(g => g.id == constants.SUPPORT_SERVER)
          .channels.find(c => c.id == constants.SUPPORT_CHANNEL)
          .send(`**Anonymous**\n${params}`);
        message.author.send(constants.COMMENT_POSTED);
        break;

      default:
        if (message.channel.type == 'dm') {
          message.channel.send(constants.COMMAND_NOT_FOUND);
        }    
    }

  }
});

client.on('error', (err) => {
  console.log(err.message);
});

dbl.on('posted', () => {
  console.log(`posted server count: ${client.guilds.size}`);
});

dbl.on('error', (err) => {
  console.log(err.message);
});

client.login(botToken);
