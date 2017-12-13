'use strict';

import Tiles from './Tiles';
import Store from './Store';
import Template from './Template';
import View from './View';
import Controller from './Controller';
import Game from './Game';

const _Tiles = new Tiles(4, 4);

const _Store = new Store();

const _Template = new Template();

const _View = new View(_Template);

const _Game = new Game(_Store);

const _Controller = new Controller(_Store, _View, _Tiles, _Game);

// console.log(_View.loadTiles());


// console.log(_Template.tilesList(_Store.getSessionStorage()));




