/**
 * Class for Puzzle.
 *
 * @member String        Name
 * @member Number        Radiation
 * @member Array<String> ReqArr
 * @member Array<String> LootArr
 * @member Array<String> SolutionArr
 */
module.exports = class Puzzle {
  constructor(name, radiation, reqArr, lootArr, solutionArr) {
    this.Name = name;
    this.Radiation = radiation;
    this.ReqArr = reqArr;
    this.LootArr = lootArr;
    this.SolutionArr = solutionArr;
  }
}
