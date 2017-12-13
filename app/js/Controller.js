import _ from 'lodash';

export default class Controller {
  constructor (store, view, tiles, game) {
    this.store = store;
    this.view = view;
    this.tiles = tiles;
    this.game = game;
    this.openTile = this.openTile.bind(this);
    this.init();
  }
  init () {
    let tilesCards;
    if ( this.store.getSessionStorage('cards') === null) {
      this.tiles.generateTiles();
      this.store.setSessionStorage('cards', JSON.stringify(this.tiles.cards));
    }
    else {
      tilesCards = JSON.parse(this.store.getSessionStorage('cards'));
      this.tiles.setTilesFromStorage(tilesCards);
    }
    this.view.loadTiles(JSON.parse(this.store.getSessionStorage('cards')));
    this.view.bindEventsToTiles(this.openTile);
    this.isGameOver();
  }
  openTile (e) {
    let targetEl = e.target;
    let targetTileEl = targetEl.closest('.tile');
    targetTileEl.classList.add('open');
    let targetTileElId = targetTileEl.dataset.id;
    const isExistingOpenedTile = _.find(this.game.openTiles, ( tile ) => ( tile.id === targetTileElId ));
    if ( isExistingOpenedTile ) {
      return;
    }
    this.notifyGameIsTileOpened(this.tiles.findTile(targetTileElId));
    this.countNumberOfClicks();
    this.isTilePair();
  }
  notifyGameIsTileOpened (tileId) {
    this.game.notifyTileIsOpened(tileId);
  }
  countNumberOfClicks () {
    console.log(this.store.getSessionStorage('numberOfClicks'));
    let numberOfClicks = parseInt(this.store.getSessionStorage('numberOfClicks')) || 0;
    this.store.setSessionStorage('numberOfClicks', numberOfClicks+=1);
    console.log(numberOfClicks);
  }
  isTilePair () {
    let pairIds= (_.map(this.game.openTiles, 'id'));
    if ( this.game.isItComparable() ) {
      if ( this.game.isPairTiles() ) {
        this.store.update(pairIds);
        this.isGameOver();
      }
      else {
        pairIds.forEach(function (id) {
          setTimeout( () => {
            document.querySelector("[data-id='"+id+"']").classList.remove('open');
          }, 500);
        });
      }
      this.game.resetPairTiles();
    }
    else {
      console.log('Odd Pair');
    }
  }
  isGameOver () {
    if ( this.game.isGameOver() ) {
      alert('*** Game Over *** \nNumber Of Clicks : ', this.store.getSessionStorage('numberOfClicks'));
      this.store.clearProp('cards');
      this.store.clearProp('numberOfClicks');
    }
  }
}
