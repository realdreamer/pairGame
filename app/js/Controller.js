import _ from 'lodash';

export default class Controller {
  constructor (store, view, tiles, game) {
    this.store = store;
    this.view = view;
    this.tiles = tiles;
    this.game = game;
    this.openTile = this.openTile.bind(this);
  }
  init () {
    let tiles;
    if ( this.store.getSessionStorage('tiles') === null) {
      this.tiles.generateTiles();
      this.store.setSessionStorage('tiles', JSON.stringify(this.tiles.tiles));
    }
    else {
      tiles = JSON.parse(this.store.getSessionStorage('tiles'));
      this.tiles.setTilesFromStorage(tiles);
    }
    this.view.loadTiles(JSON.parse(this.store.getSessionStorage('tiles')));
    this.view.bindEventsToTiles(this.openTile);
    this.isGameOver();
  }
  openTile (e) {
    let targetEl = e.target;
    let targetTileEl = targetEl.closest('.tile');
    targetTileEl.classList.add('open');
    let targetTileElId = targetTileEl.dataset.id;
    if ( this.game.isAlreadyOpened(targetTileElId) ) {
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
    let numberOfClicks = parseInt(this.store.getSessionStorage('numberOfClicks')) || 0;
    this.store.setSessionStorage('numberOfClicks', numberOfClicks+=1);
  }
  isTilePair () {
    let pairIds= (_.map(this.game.openTiles, 'id'));
    if ( this.game.isItComparable() ) {
      if ( this.game.isPairTiles() ) {
        this.game.update(pairIds);
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
  }
  isGameOver () {
    if ( this.game.isGameOver() ) {
      alert('*** Game Over *** \nNumber Of Clicks : ', this.store.getSessionStorage('numberOfClicks'));
      this.store.clearProp('tiles');
      this.store.clearProp('numberOfClicks');
    }
  }
}
