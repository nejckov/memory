var levels = (function() {

  /****************************************
  ************ GET LEVEL FUNC *************
  ****************************************/
  function getLevel(x) {

    // ALL POSIBILE LEVELS
    var level1 = ['aabb'];
    var level2 = ['aabbcc'];
    var level3 = ['aabbccdd'];
    var level4 = ['aabbccddee'];
    var level5 = ['aabbccddeeff'];
    var level6 = ['aabbccddeeffgg'];
    var level7 = ['aabbccddeeffgghh'];
    var level8 = ['aabbccddeeffgghhii'];
    var level9 = ['aabbccddeeffgghhiijj'];
    var level10 = ['aabbccddeeffgghhiijjkk'];

    // RETURN CURRENT LEVEL
    return eval('level' + x);
  }

  return {
    getLevel: function(x) {
      return getLevel(x);
    }
  }
})();

export {
  levels
};
