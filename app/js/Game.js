export default class Game {
  constructor (store) {
    this.store = store;
    this.openTiles = [];
    this.maxNumberOfTilesCanOpen = 2;
    this.notifyTileIsOpened = this.notifyTileIsOpened.bind(this);
  }
  update (ids, callback) {
    const id = ids;
    const tiles = JSON.parse(this.store.getSessionStorage('cards'));
    const newTiles = tiles.map( (tile) => {
                        if (id.indexOf(tile.id) > -1) {
                          tile['pair'] = true;
                        }
                        return tile;
                      });
    this.store.setSessionStorage('cards', JSON.stringify(newTiles));

    if ( callback && typeof callback === 'function' ) {
      callback();
    }
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
  currentOpenedTiles (tileId) {
    return _.find(this.openTiles, tile => tile.id === tileId);
  }
  isPairedOpenedTile (tileId) {
    let totalTiles = JSON.parse(this.store.getSessionStorage('cards'));
    return _.find(totalTiles, tile => tile.id === tileId && tile.pair);
  }
  isAlreadyOpened ( tileId ) {
    return this.currentOpenedTiles(tileId) || this.isPairedOpenedTile(tileId);
  }
  isGameOver () {
    return this.isAllTilesAreOpened();
  }
}
