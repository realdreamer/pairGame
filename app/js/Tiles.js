'use strict';

import tileDictionary  from './Constants';
import _ from 'lodash';

export default class Tiles {
  constructor (row, column) {
    this.row = row;
    this.column = column;
    this.cards = [];
  }
  generateTiles () {
    let counter = 1, index;
    for ( let i = 1; i <= this.row; i++ ) {
      for ( let j =  1; j <= this.column; j++) {
        if (counter % 2 !== 0) {
          index = Math.floor(Math.random() * tileDictionary.length);
        }
        let card = {
          id: `${i}_${j}`,
          name: tileDictionary[index].name,
          imageUrl: tileDictionary[index].img
        };
        this.cards.push(card);
        counter++;
      }
    }
    return this.cards = this.shuffleTiles();
  }
  shuffleTiles () {
    return _.shuffle(this.cards);
  }
  setTilesFromStorage (tiles) {
    this.cards = tiles;
  }
  findTile (id) {
    return _.find(this.cards, function ( card ) {
      return card.id === id;
    });
  }
}

