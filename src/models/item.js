/**
 * Class for Item.
 *
 * @member String        Name
 * @member Number        Level
 * @member Number        Scrap
 * @member Array<Ingred> IngredArr
 */
module.exports = class Item {
  constructor(name, level, scrap, ingredArr) {
    this.Name = name;
    this.Level = level;
    this.Scrap = scrap;
    this.IngredArr = ingredArr;
  }
}
