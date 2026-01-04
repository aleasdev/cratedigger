export function shuffle(array) {
  var counter = array.length;
  var temp;
  var index;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export function coordsEqualsApprox(coord1, coord2, range) {
  return (Math.abs(coord1.x - coord2.x) <= range) && (Math.abs(coord1.y - coord2.y) <= range);
}

export function wheelDistance(e) {
  var event;
  var wheelDelta;
  var detail;

  event = e || window.event;

  wheelDelta = event.wheelDelta;
  detail = event.detail;

  if (detail) {
    if (wheelDelta) {
      return wheelDelta / detail / 40 * detail > 0 ? 1 : -1; // Opera
    }

    return -detail / 3; // Firefox;
  }

  return wheelDelta / 120; // IE/Safari/Chrome
}

export function wheelDirection(e) {
  var event;

  event = e || window.event;

  return (event.detail < 0) ? 1 : (event.wheelDelta > 0) ? 1 : -1;
}

export function isFunction(obj) {
  return typeof obj === 'function' || false;
}