const COLS = 5; /* NOTE: Should be odd for FREE SPACE to work correctly */
const ROWS = 5; /* NOTE: Should be odd for FREE SPACE to work correctly */
const FADE = 500;

/**
 * [description]
 * NOTE: The distribution of numbers is not uniform. It is biased towards 0 and 1.
 * @see {@link https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript|Seeding the random number generator in Javascript}
 * @param  {[type]} s [description]
 * @return {[type]}   [description]
 */
Math.seed = function(s) {
  return function() {
    s = Math.sin(s) * 10000; return s - Math.floor(s);
  };
};

/**
 * [card description]
 */
function card() {
  $("#bingo").empty(); /* Remove Old Cells */
  let seed    = Math.floor(Math.random() * (Number.MAX_VALUE - 1)) + 1;
  Math.random = Math.seed(seed);
  fill();
}

/**
 * [fill description]
 */
function fill() {
  $.get("cells.txt").then(function(data) {
    let lines = data.split('\n');
    let k = 0;
    lines = lines.filter(function(a)    { return a; }); /* Remove Whitespace */
    lines = lines.sort  (function(a, b) { return 0.5 - Math.random() }); /* Randomize */

    /* Column-Major Order */
    for(let i = 0; i < COLS; i++) {
      let col = $("<div class='col'></div>").hide().appendTo("#bingo").fadeIn(FADE);
      for(let j = 0; j < ROWS; j++) {
        if(i == Math.floor(COLS / 2) && j == Math.floor(ROWS / 2)) {
          addCell(col, "FREE SPACE", true); /* Middle of Table */
        } else {
          addCell(col, lines[k++], false);
        }
      }
    }
  });
}

/**
 * [addCell description]
 * @param {[type]} col  [description]
 * @param {[type]} text [description]
 */
function addCell(col, text, free) {
  if(free) {
    let row = $("<div class='cell free'>" + text + "</div>").appendTo(col);
  } else {
    let row = $("<div class='cell'>" + text + "</div>").appendTo(col);
    $(row).click(function() {
      $(row).toggleClass('checked');
    });
  }
}
