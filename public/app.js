var app = angular.module("myModule", []);

app.controller("myController", function($scope, $http){

    function refresh() {
       $http.get('/contactlist').success(function (response) {
           $scope.persons = response;
           $scope.person = ""; // makes the form entry blank after adding contact i.e. avoid sticky form
       });
    };
    refresh();
    
    $scope.addContact = function(){
       console.log($scope.person);  // give the 'object name' same as in index.html that we created
       $http.post('/contactlist', $scope.person) // send this object to server
           .success(function(response){
               refresh();
           });
    };

    $scope.remove = function(id){
        console.log(id); 
        $http.delete('/contactlist/' + id ).success(function(response){
            refresh();
        });
    };

    $scope.edit = function(id){
        console.log(id); // gives the id of the contact list to be edited
        $http.get('/contactlist/' + id ).success(function(response){
           $scope.person = response;
        });
    };

    $scope.update = function(){
        console.log($scope.person._id); // gives the same id of the contact list to be edited
        $http.put('/contactlist/' + $scope.person._id, $scope.person) // sent everything of object person to server
            .success(function(response){
               refresh(); 
            });
    };

    $scope.clear = function(){
        $scope.person = "";
    }
});