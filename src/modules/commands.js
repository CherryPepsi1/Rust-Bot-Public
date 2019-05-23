const templates = require('./templates.js');
const constants = require('./constants.js');

var msgArr;

/**
 * Add message to array if exceeding message content limit.
 */
function buildMsg(msg, str) {
  if ((msg.length + str.length) > constants.BUFFER_SIZE) {
    msgArr.push(msg);
    return str;
  } else {
    return msg + str;
  }
}

module.exports = {

  /**
   * Execute command 'item'.
   *
   * @param String      params
   * @param Array<Item> arr
   * @return Array<String> message array
   */
  item: (params, arr) => {
    msgArr = [];
    let msg = '';

    if (!params) {
      console.log('listing all items');
      arr.forEach(value => {
        msg = buildMsg(msg, templates.all(value))
      });

    } else {
      console.log(`listing items that start with '${params}'`);
      arr.forEach(value => {
        if (value.Name.indexOf(params) == 0) {
          msg = buildMsg(msg, templates.item(value));
        }
      });

      if (!msg) {
        msg = constants.ITEM_NOT_FOUND;
      }
    }

    msgArr.push(msg);
    return msgArr;
  },

  /**
   * Execute command 'destr'.
   *
   * @param String       params
   * @param Array<Destr> arr
   * @return Array<String> message array
   */
  destr: (params, arr) => {
    msgArr = [];
    let msg = '';

    if (!params) {
      console.log('listing all destruction items');
      arr.forEach(value => {
        msg = buildMsg(msg, templates.all(value));
      });

    } else {
      console.log(`listing destruction items that start with '${params}'`);
      arr.forEach(value => {
        if (value.Name.indexOf(params) == 0) {
          msg = buildMsg(msg, templates.destr(value));
          if (value.Handmade_Shell) {
            msg = buildMsg(msg, templates.destrExt(value));
          }
        }
      });

      if (!msg) {
        msg = constants.DESTR_NOT_FOUND;
      }
    }

    msgArr.push(msg);
    return msgArr;
  },

  /**
   * Execute command 'puzzle'.
   *
   * @param String        params
   * @param Array<Puzzle> arr
   * @return Array<String> message array
   */
  puzzle: (params, arr) => {
    msgArr = [];
    let msg = '';

    if (!params) {
      console.log('listing all puzzle monuments');
      arr.forEach(value => {
        msg = buildMsg(msg, templates.all(value));
      });

    } else {
      console.log(`listing puzzles that start with '${params}'`);
      arr.forEach(value => {
        if (value.Name.indexOf(params) == 0) {
          msg = buildMsg(msg, templates.puzzle(value));
        }
      });

      if (!msg) {
        msg = constants.PUZZLE_NOT_FOUND;
      }
    }

    msgArr.push(msg);
    return msgArr;
  }

}
