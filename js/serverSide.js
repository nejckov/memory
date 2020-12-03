var serverSide = (function() {

  /**************************************************
  ********SETTING ACCESS TO SERVER FUNC *************
  **************************************************/
  async function api() {

    // SET DATA API VARIABLE -> TRUE(1) -> FALSE(0)
    var dataAPI;

    // GET ACCESS TO SERVER THROUGH OAUTH2 PASSPORT TOKEN
    await axios.post('https://cors-anywhere.herokuapp.com/https://apps.nejckov.si/games/public/oauth/token', {
      client_id: 6,
      client_secret: 'jdLpH6wPqSqxOk2PMJRqxACHCAHEHx7pQJ6Iumwt',
      grant_type: 'password',
      username: 'nejckov@gmail.com',
      password: 'password'
    })
    .then(({data}) => {
      // IF GETTING ACCESS TO SERVER -> SAVE AUTHORIZATION TO HEADER OF REQUEST
      axios.defaults.headers.common['Authorization'] = data.token_type + data.access_token;
      // SET DATAAPI TO TRUE
      dataAPI = 1;
    })
    .catch(error => {
    })
    // RETURN DATAAPI
    return dataAPI;
  }


  /**************************************************
  *********** GET DATA FROM SERVER ******************
  **************************************************/
  async function getData() {

    // SET VARIABLES INIT
    var getRanking; // VARIABLE FOR RETURNING RESULTS

    // GETTING TO SERVER DATA
    await axios.get('https://cors-anywhere.herokuapp.com/https://apps.nejckov.si/games/public/api/games/1')
    .then(({data}) => {
      // SAVE DATA FROM SERVER TO VARIABLE
      getRanking = data.data;
    })
    .catch(error => {
    })

    // RETURN RESULT
    return getRanking;
  }


  /*****************************************************
  ************* POST DATA POINTS ***********************
  *****************************************************/
  async function postData(playerName, sumPoints) {

    // STORE DATA TO SERVER
    await axios.post('https://cors-anywhere.herokuapp.com/http://apps.nejckov.si/games/public/api/players', {
      name: playerName ? playerName : 'Anonymous',
      points: sumPoints,
      game_id: 1,
    })
    .then(({data}) => {
    })
    .catch(error => {
    })
  }


  return {
    api: function() {
      return api();
    },
    getData: function() {
      return getData();
    },
    postData: function(playerName, points) {
      return postData(playerName, points);
    }
  }
})();


export {
  serverSide
};
