const sqlite3 = require('sqlite3');
const Item = require('../models/item.js');
const Destr = require('../models/destruction.js');
const Ingred = require('../models/ingredient.js');
const Puzzle = require('../models/puzzle.js');
const constants = require('./constants.js');

/**
 * Get ingredients for item.
 */
function selectIngreds(name, arr) {
  let db = new sqlite3.Database(constants.DB_ITEMS, sqlite3.OPEN_READONLY);
  let sql = 
    `SELECT Ingredient, Quantity FROM ${constants.TABLE_INGREDS} ` + 
    `WHERE Name = ? ORDER BY Ingredient`;
  db.each(sql, [name], (err, row) => {
    if (err) {
      console.log(err.message);
    } else {
      arr.push(new Ingred(row.Ingredient, row.Quantity));
    }
  });
  db.close();
}

/**
 * Get puzzle requirements for monument.
 */
function selectReqs(name, arr) {
  let db = new sqlite3.Database(constants.DB_PUZZLES, sqlite3.OPEN_READONLY);
  let sql = 
    `SELECT Requirement FROM ${constants.TABLE_REQS} ` + 
    `WHERE Name = ? ORDER BY Requirement`;
  db.each(sql, [name], (err, row) => {
    if (err) {
      console.log(err.message);
    } else {
      arr.push(row.Requirement);
    }
  });
  db.close();
}

/**
 * Get puzzle loot for monument.
 */
function selectLoot(name, arr) {
  let db = new sqlite3.Database(constants.DB_PUZZLES, sqlite3.OPEN_READONLY);
  let sql = 
    `SELECT Loot FROM ${constants.TABLE_LOOT} ` + 
    `WHERE Name = ? ORDER BY Loot`;
  db.each(sql, [name], (err, row) => {
    if (err) {
      console.log(err.message);
    } else {
      arr.push(row.Loot);
    }
  });
  db.close();
}

/**
 * Get puzzle solution for monument.
 */
function selectSolution(name, arr) {
  let db = new sqlite3.Database(constants.DB_PUZZLES, sqlite3.OPEN_READONLY);
  let sql = 
    `SELECT Step, Task FROM ${constants.TABLE_SOLUTIONS} ` + 
    `WHERE Name = ? ORDER BY Step`;
  db.each(sql, [name], (err, row) => {
    if (err) {
      console.log(err.message);
    } else {
      arr.push(row.Task);
    }
  });
  db.close();
}

module.exports = {

  /**
   * Get all items from database.
   *
   * @param Array<Item> arr
   */
  selectAllItems: (arr) => {
    let db = new sqlite3.Database(constants.DB_ITEMS, sqlite3.OPEN_READONLY);
    let item, sql = `SELECT * FROM ${constants.TABLE_ITEMS} ORDER BY Name`;
    db.each(sql, [], (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        item = new Item(row.Name, row.Level, row.Scrap, []);
        selectIngreds(row.Name, item.IngredArr);
        arr.push(item);
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
    let db = new sqlite3.Database(constants.DB_ITEMS, sqlite3.OPEN_READONLY);
    let sql = `SELECT * FROM ${constants.TABLE_DESTR} ORDER BY Name`;
    db.each(sql, [], (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        arr.push(new Destr(row.Name, row.Explosive_Ammo, row.Satchel, row.C4, row.Rocket, row.Beancan, row.Handmade_Shell, row.Incendiary_Shell));
      }
    });
    db.close();
  },

  /**
   * Get all puzzles from database.
   *
   * @param Array<Puzzle> arr
   */
  selectAllPuzzles: (arr) => {
    let db = new sqlite3.Database(constants.DB_PUZZLES, sqlite3.OPEN_READONLY);
    let puzzle, sql = `SELECT * FROM ${constants.TABLE_MONUMENTS} ORDER BY Name`;
    db.each(sql, [], (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        puzzle = new Puzzle(row.Name, row.Radiation, [], [], []);
        selectReqs(row.Name, puzzle.ReqArr);
        selectLoot(row.Name, puzzle.LootArr);
        selectSolution(row.Name, puzzle.SolutionArr);
        arr.push(puzzle);
      }
    });
    db.close();
  }

}
