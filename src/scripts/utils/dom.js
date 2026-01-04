export function fadeOut(element){
    var transitionEvent;

  if (element.style.opacity === 0) {
    element.style.display = 'none';
  } else {
    transitionEvent = getTransitionEvent(element);

    if (transitionEvent) {
      element.addEventListener(transitionEvent, onFadeComplete);
      element.style.opacity = 0;
    }
  }
}

export function fadeIn(element) {
  var transitionEvent;

  if (element.style.opacity === '' || element.style.opacity === '1') {
    element.style.display = 'block';
  } else {
    transitionEvent = getTransitionEvent(element);
    element.style.display = 'block';

    if (transitionEvent) {
      element.addEventListener(transitionEvent, onFadeComplete);
    }

    setTimeout(function () {
      element.style.opacity = 1;
    }, 15);
  }
}

export function hideElement(element) {
  element.style.opacity = 0;
  element.style.display = 'none';
}


export function showElement(element) {
  element.style.display = 'block';
  element.style.opacity = 1;
}

function getTransitionEvent() {
  var t;
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  for (t in transitions) {
    if (document.body.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

function onFadeComplete(e) {
  e.currentTarget.removeEventListener(e.type, onFadeComplete);

  if (e.currentTarget.style.opacity === '0') {
    e.currentTarget.style.display = 'none';
  } else {
    e.currentTarget.style.display = 'block';
  }
}