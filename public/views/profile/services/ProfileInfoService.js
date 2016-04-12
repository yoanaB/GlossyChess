angular.module('chessApp')
    .factory('ProfileInfoService', [ '$http', function ($http) {
        var user = {};
        return{
            getInfo: function () {

                if (!user) {
                    var data = JSON.parse(localStorage.getItem('user'));
                    for (var i in data) {
                        user[i] = data[i];
                    }
                }

                return user;
            },

            getActiveGames: function () {
                var user = this.getInfo();
                return $http({
                    method: 'GET',
                    url:'api/freegames',
                    data: {
                        "api_token" : user.api_token
                    }
                });
            },

            enterGame: function(gameID){
                return $http.get('api/joingame', {"api_token" : this.getInfo().api_token,
                                                    "gameid": gameID});
            },

            getNotifications: function(gameID){
                  return $http.get('api/checkgame/' + gameID, {"api_token" : this.getInfo().api_token,
                                                                 "gameid": gameID});
            },

            accept: function(){
                //return $http.post('api/profile/accept', {"challenger": challenger.username});
            },

            addGame: function(){
                return $http({
                    method: 'GET',
                    url:'api/freegames',
                    data: {
                        "api_token" : this.getInfo().api_token
                    }
                });
            }

        }
    }])