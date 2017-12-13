export default class Game {
  constructor (store) {
    this.store = store;
    this.openTiles = [];
    this.maxNumberOfTilesCanOpen = 2;
    this.notifyTileIsOpened = this.notifyTileIsOpened.bind(this);
  }
  pushTiles (id) {
    this.openTiles.push(id);
  }
  notifyTileIsOpened ( id ) {
    if ( this.openTiles.length < this.maxNumberOfTilesCanOpen ) {
      this.pushTiles(id);
    }
  }
  isItComparable () {
    return this.openTiles.length === this.maxNumberOfTilesCanOpen;
  }
  isPairTiles () {
    return this.openTiles[0].name === this.openTiles[1].name;
  }
  resetPairTiles () {
    this.openTiles = [];
  }
  isAllTilesAreOpened () {
    let totalTiles = JSON.parse(this.store.getSessionStorage('cards'));
    return totalTiles.every( tile => ( tile.pair ));
  }
  isGameOver () {
    return this.isAllTilesAreOpened();
  }
}
