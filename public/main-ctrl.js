/* global angular */
var app = angular.module("MiniPostmanclimate");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http){
     console.log("Modular MainCtrl climate initialized!");   
     $scope.url="/api/v1/climate-stats";
     
     function refresh()
    {
        console.log("Requesting API");
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date;
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
    
    
    $scope.finddate = function (){
        var date = document.getElementById("date").value;
        console.log("finding recursos for " + date);
        var URL = $scope.url + "?FECHA=" + date;
        
        $http.get(URL).then(function(response){
            console.log("Found stations for " + date);
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos del " + date;
        }, 
        function (error){
            $scope.information = " Introduzca la FECHA correctamente, por favor ";
        });
        
    };
    
    $scope.findForProvince = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        if (newSearch == undefined) $scope.information = "Introduce el campo Provincia correctamente, por favor";
        else
        {
            var URL = $scope.url + "?FECHA=" + date + "&PROVINCIA=" + newSearch.provincia;
        
            console.log("finding recursos for the Province " + newSearch.provincia);
            $http.get(URL).then(function(response){
                console.log("Data received " + JSON.stringify(response.data, null, 2));
                $scope.climates = response.data;
                if (response.status == 200) $scope.information = "Encontrado los campos de la Provincia " + newSearch.provincia + " por la FECHA " + date;
            }, 
            function (error){
                $scope.information = "No encontrado los campos de la Provincia " + newSearch.provincia + " con la FECHA busqueada. Introduce el año y la provincia correctos";
            });
        }
    };
    
    $scope.findforaltitude = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date + "&ALTITUDMIN=" + newSearch.altitudemin + "&ALTITUDMAX=" + newSearch.altitudemax;
    
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con altitud entre " + newSearch.altitudemin + " y " + newSearch.altitudemax;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con altitud entre " + newSearch.altitudemin + " y " + newSearch.altitudemax + ", o simplemente input inserido incorrectamente.";
        });
    };
    
    $scope.findfortmedia = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date + "&TMEDIAMIN=" + newSearch.tmediaminima + "&TMEDIAMAX=" + newSearch.tmediamaxima;
    
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con temperatura media entre " + newSearch.tmediaminima + "° y " + newSearch.tmediamaxima + "°";
        }, 
        function (error){
            $scope.information = "No encontrado los campos con temperatura media entre " + newSearch.tmediaminima + "° y " + newSearch.tmediamaxima + "°, o simplemente input inserido incorrectamente.";
        });
    };
    
    $scope.findforprecipitacion = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date + "&PRECIPITACIONMIN=" + newSearch.precminima + "&PRECIPITACIONMAX=" + newSearch.precmaxima;
    
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con precipitacion entre " + newSearch.precminima + " y " + newSearch.precmaxima;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con precipitacion entre " + newSearch.precminima + " y " + newSearch.precmaxima + " o simplemente input inserido incorrectamente.";
        });
    };
    
    $scope.findforvelocidadmedia = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date + "&VELMEDIAMIN=" + newSearch.velmediamin + "&VELMEDIAMAX=" + newSearch.velmediamax;
    
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con velocidad media entre " + newSearch.velmediamin + " y " + newSearch.velmediamax;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con velocidad media entre " + newSearch.velmediamin + " y " + newSearch.velmediamax + " o simplemente input inserido incorrectamente.";
        });
    };
    
    $scope.findforracha = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date + "&RACHAMIN=" + newSearch.rachamin + "&RACHAMAX=" + newSearch.rachamax;
    
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con velocidad media entre " + newSearch.rachamin + " y " + newSearch.rachamax;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con velocidad media entre " + newSearch.rachamin + " y " + newSearch.rachamax + " o simplemente input inserido incorrectamente.";
        });
    };
    
    $scope.findforsol = function (){
        var newSearch = $scope.newSearchclimate;
        var date = document.getElementById("date").value;
        var URL = $scope.url + "?FECHA=" + date + "&SOLMIN=" + newSearch.solmin + "&SOLMAX=" + newSearch.solmax;
    
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.climates = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con velocidad media entre " + newSearch.solmin + " y " + newSearch.solmax;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con velocidad media entre " + newSearch.solmin + " y " + newSearch.solmax + " o simplemente input inserido incorrectamente.";
        });
    };
    
}]);