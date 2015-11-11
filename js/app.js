var app = angular.module('PomodoroClock', []);
app.controller('MainController', function($scope) {
  function show(n) {
    return n > 9 ? (n) : ("0" + n);
  };
  function convert(num) {
    return parseInt(num);
  };
  $scope.breakMode = null;
  $scope.Data = {};
  $scope.Data.session = 25;
  $scope.Data.seconds = 60;
  $scope.Data.break = 5;
  $scope.Data.mode = show($scope.Data.session);
  $scope.Data.secMode = show(0);
  $scope.Data.whichMode = "Let's Get Started!";
  var work =true;
  var Break = true;
  var sec = 0;
  var remind = false;
  var audio = "http://soundbible.com/grab.php?id=2062&type=mp3";
  $scope.Data.StartPomo = function() {
    if(!remind){
        remind = true;
     }else if(remind){
       return;
     } 
    var alertUser = new Audio(audio);
     $scope.Data.main = setInterval(function() {
      if (convert($scope.Data.mode) == 0 && convert($scope.Data.secMode) == 0) {
        if (Break && $scope.Data.break > 0) {
          alertUser.play();
          $scope.Data.whichMode = 'Take a Break!';
          Break = false;
          work = false;
          $scope.Data.mode = show($scope.Data.break);
          $scope.$apply();
        } else {
          work = true;
          Break = true;
          $scope.Data.mode = show($scope.Data.session);
          $scope.$apply();
        }
      }
      if(work){ $scope.Data.whichMode = 'Keep Working!'};
      if (sec == 0) {
        sec = $scope.Data.seconds;
        $scope.Data.mode = show($scope.Data.mode - 1);
      }
      $scope.Data.secMode = show(sec -= 1);
      $scope.$apply();

    }, 1000);
  }
  $scope.Data.reset = function() {
    $scope.breakMode = null;
    $scope.Data.session = 25;
    $scope.Data.seconds = 60;
    $scope.Data.break = 5;
    $scope.Data.mode = show($scope.Data.session);
    $scope.Data.secMode = show(0);
		$scope.Data.whichMode = "Let's Get Started!";
    Break = true;
    sec = 0;
    if(remind){
      remind = false;
    }
    return clearInterval($scope.Data.main);
  }
  $scope.Data.adjust = function(who,what){
    if(remind){return};
    if(who == 'break'){
       if(what == 'plus'){
          $scope.Data.break += 1;
      }else if(what == 'minus'){
        if($scope.Data.break == 0){return}
        $scope.Data.break -= 1;
      }
    }else if(who == 'work'){
       if(what == 'plus'){
         if($scope.Data.session == 60){return}
        $scope.Data.session += 1; 
      }else if(what == 'minus'){
        if($scope.Data.session == 1){return}
        $scope.Data.session -= 1;
      }
      $scope.Data.mode = show($scope.Data.session);
     }      
  }
});