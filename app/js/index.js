'use strict';

import Tiles from './Tiles';
import Store from './Store';
import { Template } from './Template';
import View from './View';
import Controller from './Controller';
import Game from './Game';

export const startGame = () => {
  const _Tiles = new Tiles(4, 4);

  const _Store = new Store();

  const _View = new View(Template);

  const _Game = new Game(_Store);

  const _Controller = new Controller(_Store, _View, _Tiles, _Game);
  
  _Controller.init();
};
