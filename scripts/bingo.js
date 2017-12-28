const COLS = 5; /* NOTE: Should be odd for FREE SPACE to work correctly */
const ROWS = 5; /* NOTE: Should be odd for FREE SPACE to work correctly */

$.get("cells.txt").then(function(data) {
  var lines = data.split('\n');
  var k = 0;
  lines = lines.filter(function(a)    { return a; }); /* Remove Whitespace */
  lines = lines.sort  (function(a, b) { return 0.5 - Math.random() }); /* Randomize */

  /* Column-Major Order */
  for(let i = 0; i < COLS; i++) {
    let col = $("<div class='col'></div>").appendTo("#bingo");
    for(let j = 0; j < ROWS; j++) {
      if(i == Math.floor(COLS / 2) && j == Math.floor(ROWS / 2)) {
        let row = $("<div class='cell free'>FREE SPACE</div>").appendTo(col); /* Middle of Table */
      } else {
        let row = $("<div class='cell'>" + lines[k++] + "</div>").appendTo(col);
      }
    }
  }
});
