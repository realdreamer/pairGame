'use strict';

export default class Template {
  tilesList ( tiles ) {
    return tiles.reduce( (prev, current, idx) => {
      const className = current.pair === true ? 'open' : '';
      return prev + `<div class="tile tile-${parseInt(idx+1)} ${className}" data-id="${current.id}">
                        <div class="flipper">
                          <div class="front"></div>
                          <div class="back">
                            <img src="${current.imageUrl}" />
                          </div>
                        </div>
                     </div>`
    }, '');
  }
}
