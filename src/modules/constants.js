module.exports = {

    // Bot token path
    TOKEN_PATH: './rust-bot.token',

    // Bot command prefix
    PREFIX: 'r/',

    // Discord message strings
    HELP: 
      '**r/help** list commands\n' + 
      '**r/item** list all items\n' +
      '**r/item [start]** list details for items that start with [start]\n' +
      '**r/destr** list all destruction items\n' +
      '**r/destr [start]** list destruction details for items that start with [start]\n' +
      '**r/upgrade** how to upgrade to Rust Bot Premium\n' +
      '\n__Rust Bot Premium:__\n' +
      '**r/bp** list all blueprints for current server\n' +
      '**r/bp [item]** add blueprint for current user\n' +
      '**r/bpclear** delete all blueprints for current server\n',

    ITEM_NOT_FOUND: 'Item not found. Use **r/item** for list of items.',
    DESTR_NOT_FOUND: 'Destruction item not found. Use **r/destr** for list of destruction items.',
    COMMAND_NOT_FOUND: 'Command not found. Use **r/help** for list of commands.',
    PREMIUM_NOT_FOUND: 'This server does not have Rust Bot Premium. Use **r/upgrade** for information on upgrading.',
    UPGRADE: 'Upgrade to Rust Bot Premium for $1.99/server. BTC/PP payment methods accepted. Message *CherryPepsi#3151* about upgrading.',

    // Discord message limit
    BUFFER_SIZE: 2000,

    // SQLite strings
    DB_PATH: './db/rust-items.sqlite',
    TABLE_ITEMS: 'items',
    TABLE_DESTR: 'destruction',
    TABLE_INGREDS: 'ingredients'

  }
  
