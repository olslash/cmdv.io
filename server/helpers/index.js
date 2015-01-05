var Promise = require('bluebird');

module.exports = helpers = {
  generateUniqueKey: function(length) {

//    return 'japobaga';




      // alternate vowel and consonant
      var vowels = ['a', 'e', 'i', 'o', 'u'];
      var consonants = ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w', 'y'];

      return new Array(length)
          .join('_').split('_')
          .reduce(function (word) {
            var rand;
            if (word.length % 2 === 0) {
              rand = (Math.random() * consonants.length) | 0;
              word.push(consonants[rand]);
            } else {
              rand = (Math.random() * vowels.length) | 0;
              word.push(vowels[rand]);
            }

            return word;
          }, []).join('');
  }
};
