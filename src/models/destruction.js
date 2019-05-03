/**
 * Class for Destruction.
 *
 * @member String Name
 * @member Number Explosive_Ammo
 * @member Number Satchel
 * @member Number C4
 * @member Number Rocket
 * @member Number Beancan
 * @member Number Handmade_Shell
 * @member Number Incendiary_Shell
 */
module.exports = class Destr {
  constructor(name, ammo, satchel, c4, rocket, beancan, handmade, incendiary) {
    this.Name = name;
    this.Explosive_Ammo = ammo;
    this.Satchel = satchel;
    this.C4 = c4;
    this.Rocket = rocket;
    this.Beancan = beancan;
    this.Handmade_Shell = handmade;
    this.Incendiary_Shell = incendiary;
  }
}
