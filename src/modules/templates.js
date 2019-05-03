// Exceptions to display name convention
const exceptions = [ 'and', 'or', 'hbhf', 'hv', 'mp5a4', 'rand', 'xor', 'rf', 'sam', 'smg' ];

/**
 * Get display name for item.
 */
function displayName(name) {
  let strArr = name.split(' ');
  for (let i = 0; i < strArr.length; i++) {
    if (exceptions.includes(strArr[i])) {
      strArr[i] = strArr[i].toUpperCase();
    } else {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
    }
  }
  return strArr.join(' ');
}

module.exports = {

  /**
   * Get display string for all items.
   *
   * @param Object row
   * @return String
   */
  all: (row) => {
    return displayName(row.Name) + `\n`;
  },

  /**
   * Get display string for item details.
   *
   * @param Object row
   * @return String
   */
  item: (row) => {
    let msg = `__**` + displayName(row.Name) + `**__\nLevel: ${row.Level}\nScrap: ${row.Scrap}\nIngredients:\n`;
    row.IngredArr.forEach(value => {
      msg += `\t${value.Quantity} ` + displayName(value.Name) + `\n`;
    });
    return msg;
  },

  /**
   * Get display string for destruction details.
   *
   * @param Object row
   * @return String
   */
  destr: (row) => {
    return `__**` + displayName(row.Name) + `**__\nExplosive 5.56: ${row.Explosive_Ammo}\nSatchel: ${row.Satchel}\nC4: ${row.C4}\nRocket: ${row.Rocket}\nBeancan: ${row.Beancan}\n`;
  },

  /**
   * Get display string for extended desturction details.
   *
   * @param Object row
   * @return String
   */
  destrExt: (row) => {
    return `Handmade shell: ${row.Handmade_Shell}\nIncendiary shell: ${row.Incendiary_Shell}\n`
  }

}