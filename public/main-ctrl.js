/* global angular */
var app = angular.module("MiniPostmanclimate");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http){
     console.log("Modular MainCtrl climate initialized!");   
     $scope.url="/api/v1/climate-stats";
     
     function refresh()
    {
        console.log("Requesting API");
        var newSearch = $scope.newSearchclimate;
        var URL = $scope.url + "?ano=" + newSearch.year + "&mes=" + newSearch.month + "&dia=" + newSearch.day;
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
        }, 
        function (error){});
    }
    
    function initialize() 
    { 
        document.getElementById("divpagina").style.visibility = "hidden"; 
        document.getElementById("btnprvpg").style.visibility = "hidden"; 
        document.getElementById("btnsuccpg").style.visibility = "hidden"; 
    }

    initialize();

    $scope.getPagination = function (pag){ 
        if (pag == 1) 
        {
            document.getElementById("divpagina").style.visibility = "visible";
            document.getElementById("btnprvpg").style.visibility = "hidden"; 
            document.getElementById("btnsuccpg").style.visibility = "visible";
        }
        else document.getElementById("btnprvpg").style.visibility = "visible";
        $scope.pagina = pag;
        var URL = $scope.url + "?offset=" + ($scope.pagina-1)*10 + "&limit=" + (($scope.pagina-1)*10 + 10);
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            document.getElementById("btnsuccpg").style.visibility = "visible";
            $scope.climates = response.data;
        }, 
        function (error){});
        $http.get($scope.url + "?offset=" + ($scope.pagina)*3 + "&limit=" + ($scope.pagina)*3 + 3).then(function(response){}, 
        function (error){
            document.getElementById("btnsuccpg").style.visibility = "hidden";
        });
        $scope.information = "Extraido los campos de Pagina " + $scope.pagina; 
    };
    
    
    $scope.findYearandMonth = function (){
        var newSearch = $scope.newSearchclimate;
        console.log("finding recursos for " + newSearch.month + " " + newSearch.year);
        
        var URL = $scope.url + "?ano=" + newSearch.year + "&mes=" + newSearch.month + "&dia=" + newSearch.day;
        
        $http.get(URL).then(function(response){
            console.log("Found stations for " + newSearch.month + " " + newSearch.year);
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos del " + newSearch.day + " de "+ newSearch.month + " en el año " + newSearch.year ;
        }, 
        function (error){
            $scope.information = "No Encontrado los campos del " + newSearch.day + " de "+ newSearch.month + " en el año " + newSearch.year ;
        });
        
    };
    
    $scope.findForProvince = function (){
        var newSearch = $scope.newSearchclimate;
        console.log("finding recursos for the Province " + newSearch.provincia);
        
        var URL = $scope.url + "?ano=" + newSearch.year + "&mes=" + newSearch.month + "&dia=" + newSearch.day + "&provincia=" + newSearch.provincia;
        
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos de la Provincia " + newSearch.provincia;
        }, 
        function (error){
            $scope.information = "No encontrado los campos de la Provincia " + newSearch.provincia;
        });
        
    };
    
}]);