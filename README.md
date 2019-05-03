## Rust Bot

Discord bot for Rust in-game info. All item data has been pulled from https://rustlabs.com. Steps listed are for Ubuntu 18.04.

### Requirements

* nodejs
* npm
* discord.js
* sqlite3
```
sudo apt-get install nodejs npm
npm install discord.js
npm install sqlite3
```

### Setup

 1. Create new app at https://discordapp.com/developers/applications.
 2. Create new bot for application.
 3. Add bot to Discord server at https://discordapp.com/oauth2/authorize?&client_id=[client-id]&scope=bot.
 4. Save bot token at root within file named **rust-bot.token**.

### Running

```
./start.sh
```

### Discord Commands

* *r/help*
* *r/item*
* *r/item [start]*
* *r/destr*
* *r/destr [start]*

### Authors

* CherryPepsi#3151
* czarder#3564

