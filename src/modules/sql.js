const sqlite3 = require('sqlite3');
const Item = require('../models/item.js');
const Destr = require('../models/destruction.js');
const Ingred = require('../models/ingredient.js');
const constants = require('./constants.js');

module.exports = {

  /**
   * Get all items from database.
   *
   * @param Array<Item> arr
   */
  selectAllItems: (arr) => {
    let db = new sqlite3.Database(constants.DB_PATH, sqlite3.OPEN_READONLY);
    let item, sql =
      `SELECT ${constants.TABLE_ITEMS}.Name, ` +
        `${constants.TABLE_ITEMS}.Level, ` +
        `${constants.TABLE_ITEMS}.Scrap, ` +
        `${constants.TABLE_INGREDS}.Ingredient, ` +
        `${constants.TABLE_INGREDS}.Quantity ` +
      `FROM ${constants.TABLE_ITEMS} ` +
      `LEFT JOIN ${constants.TABLE_INGREDS} ` +
      `ON ${constants.TABLE_ITEMS}.Name = ${constants.TABLE_INGREDS}.Name ` +
      `ORDER BY ${constants.TABLE_ITEMS}.Name`;
    db.each(sql, [], (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        // Check if item is in array
        if (item = arr.find(value => value.Name.toLowerCase() === row.Name)) {
          // Push ingredient to item's ingredient array
          item.IngredArr.push(new Ingred(row.Ingredient, row.Quantity));
        } else {
          // Push new item to array
          arr.push(new Item(row.Name.toLowerCase(), row.Level, row.Scrap, [new Ingred(row.Ingredient, row.Quantity)]));
        }
      }
    });
    db.close();
  },

  /**
   * Get all destruction items from database.
   *
   * @param Array<Destr> arr
   */
  selectAllDestr: (arr) => {
    let db = new sqlite3.Database(constants.DB_PATH, sqlite3.OPEN_READONLY);
    let sql = `SELECT * FROM ${constants.TABLE_DESTR} ORDER BY Name`;
    db.each(sql, [], (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        arr.push(new Destr(row.Name, row.Explosive_Ammo, row.Satchel, row.C4, row.Rocket, row.Beancan, row.Handmade_Shell, row.Incendiary_Shell));
      }
    });
    db.close();
  }

}
