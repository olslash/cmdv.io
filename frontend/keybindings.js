var bindings = {
  saveOnCmdCtrlS(flux) {
    Mousetrap.bind(['meta+s', 'ctrl+s'], function (e) {
      e.preventDefault();
      flux.actions();
      console.log(combo); // logs 'ctrl+shift+up'
    });
  }
};

module.exports = {
//  insertTabSpaces(e) {
//    if (e.keyCode === 9) { // tab was pressed
//      // get caret position/selection
//      var start = this.selectionStart;
//      var end = this.selectionEnd;
//
//      var target = e.target;
//      var value = target.value;
//
//      // set textarea value to: text before caret + tab + text after caret
//      target.value = value.substring(0, start)
//      + "\t"
//      + value.substring(end);
//
//      // put caret at right position again (add one for the tab)
//      this.selectionStart = this.selectionEnd = start + 1;
//
//      // prevent the focus lose
//      e.preventDefault();
//    }
//  }
  start(flux) {
    Object.keys(bindings).forEach( (key) => bindings[key].call(null, flux) )
  }
};
