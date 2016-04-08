var myApp=angular.module('starter.controllers', [])

myApp.factory('Data',function(){
    return{
        id:''
    };
});

myApp.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

myApp.controller('homeCtrl', function($scope,$stateParams) {
  $scope.list_areas = {
        data: [{name: 'Malviya Nagar'},
               {name: 'Sanganer'},
               {name:'Bajaj Nagar'}]
    };
    $scope.list_services = {
        data: [{name: 'Dancing'},
               {name: 'Singing'},
              {name:'Yoga'},
              {name:'Gym'},
              {name:'Music'},
              {name:'Salon'},
              {name:'Club'}]
    };
    $scope.services = [
    { title: 'Singing', id: "Singing",img:'1.jpg' },
    { title: 'Dancing', id: "Dancing",img:'2.jpg' },
    { title: 'Yoga', id: "Yoga",img:'3.jpg' },
    { title: 'Gym', id: "Gym",img:'4.jpg' },
    { title: 'Music', id: "Guitar",img:'5.jpg'},
    { title: 'Club', id: "Swimming",img:'6.jpg' },
    { title: 'Salon', id: "Salon",img:'7.jpg' }
  ];
})

myApp.controller('ListingController', function($scope, $stateParams, $http,Data) {
    console.log($stateParams);
    Data.id=$stateParams.serviceId;
    console.log(Data.id);
    $http.get('json/services'+$stateParams.serviceId+'.json',{}).success(function(data){
			$scope.lists = data;
        console.log($scope.lists);
		});
})

myApp.controller('DetailController',function($scope, $stateParams, $http,Data){
    var x = Data.id;
    console.log(x);
     $http.get('json/services'+Data.id+'.json',{}).success(function(data){
         $scope.lists = data;
         
         for(i=0;i<data.length;i++){
             if(data[i].id==$stateParams.listId){
                 $scope.detail=data[i];
                 //$scope.demo=data[i].id;
                 break;
             }
         }
		});
    console.log("hello");
    $http.get('json/'+Data.id+'_services.json',{}).success(function(data){
        $scope.lists=data;
        $scope.tuples=[];
        var k=0
        console.log($stateParams.listId);
        console.log("hi");
        for(i=0;i<data.length;i++){
            if(data[i].id==$stateParams.listId){
                $scope.tuples[k]=data[i];
                k=k+1;
                console.log($scope.tuples);
                
            }
        }
    });
    
    $http.get('json/'+Data.id+'_gallery.json',{}).success(function(data){
        $scope.lists=data;
        var j=0;
        $scope.images=[];
        console.log($stateParams.listId);
        console.log("hi");
        for(i=0;i<data.length;i++){
            if(data[i].id==$stateParams.listId){
                $scope.images[j]=data[i];
                j=j+1;
                console.log($scope.images);
                
            }
        }
    });       
})
myApp.controller('OrderController',function($scope,$stateParams,Data,$http){
    $scope.message=$stateParams.serviceId;
    $http.get('json/'+Data.id+'_services.json',{}).success(function(data){
        $scope.lists=data;
        for(i=0;i<data.length;i++){
            if(data[i].service_id==$stateParams.serviceId){
                $scope.order=data[i];
                break;
            }
        }
    });
})
myApp.controller('PlaylistCtrl', function($scope, $stateParams) {
});
