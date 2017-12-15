'use strict';

export default class View {
  constructor (template) {
    this.template = template;
    this.tilesContainer = document.querySelector('#tiles');
  }
  loadTiles (tilesList) {
    this.tilesContainer.innerHTML = this.template(tilesList);
  }
  bindEventsToTiles (handler) {
    this.tiles = document.querySelectorAll('.tile');
    this.tiles.forEach ( el => {
      el.addEventListener ( 'click', (e) => {
        handler(e);
      }, true);
    });
  }
}
