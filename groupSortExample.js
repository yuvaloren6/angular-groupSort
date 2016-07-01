angular.module('groupExample', ['angular-groupSort', 'groupingDirectives'])
.controller('exampleCtrl', function ($scope, $timeout, $filter) {

    $scope.baseballTeams = [
        { name: "New York Yankees", category: "American League", subCategory: "East", icon: "./icons/nyy.png" },
        { name: "Boston Red Sox", category: "American League", subCategory: "East", icon: "./icons/bos.png" },
        { name: "Toronto Blue Jays", category: "American League", subCategory: "East", icon: "./icons/tor.png" },
        { name: "Baltimore Orioles", category: "American League", subCategory: "East", icon: "./icons/bal.png" },
        { name: "Tampa Bay Rays", category: "American League", subCategory: "East", icon: "./icons/tb.png" },
        { name: "New York Mets", category: "National League", subCategory: "East", icon: "./icons/nym.png" },
        { name: "Washington Nationals", category: "National League", subCategory: "East", icon: "./icons/wsh.png" },
        { name: "Miami Marlins", category: "National League", subCategory: "East", icon: "./icons/mia.png" },
        { name: "Philadelphia Phillis", category: "National League", subCategory: "East", icon: "./icons/phi.png" },
        { name: "Atlanta Braves", category: "National League", subCategory: "East", icon: "./icons/atl.png" },
        { name: "Cleveland Indians", category: "American League", subCategory: "Central", icon: "./icons/cle.png" },
        { name: "Kansas city Royals", category: "American League", subCategory: "Central", icon: "./icons/kc.png" },
        { name: "Detroit Tigers", category: "American League", subCategory: "Central", icon: "./icons/det.png" },
        { name: "Chicago White Sox", category: "American League", subCategory: "Central", icon: "./icons/chw.png" },
        { name: "Minnesota Twins", category: "American League", subCategory: "Central", icon: "./icons/min.png" },
        { name: "Chicago Cubs", category: "National League", subCategory: "Central", icon: "./icons/chc.png" },
        { name: "St. Louis Cardinals", category: "National League", subCategory: "Central", icon: "./icons/stl.png" },
        { name: "Pittsburgh Pirates", category: "National League", subCategory: "Central", icon: "./icons/pit.png" },
        { name: "Milwaukee Brewers", category: "National League", subCategory: "Central", icon: "./icons/mil.png" },
        { name: "Cinncinaty Reds", category: "National League", subCategory: "Central", icon: "./icons/cin.png" },
        { name: "Texas Rangers", category: "American League", subCategory: "west", icon: "./icons/tex.png" },
        { name: "Huston Astros", category: "American League", subCategory: "west", icon: "./icons/hou.png" },
        { name: "Seattle Mariners", category: "American League", subCategory: "west", icon: "./icons/sea.png" },
        { name: "Oakland Athletics", category: "American League", subCategory: "west", icon: "./icons/oak.png" },
        { name: "Los Angeles Angels", category: "American League", subCategory: "west", icon: "./icons/laa.png" },
        { name: "San francisco Giants", category: "National League", subCategory: "west", icon: "./icons/sf.png" },
        { name: "Los Angelos Dodgers", category: "National League", subCategory: "west", icon: "./icons/lad.png" },
        { name: "Arizona Diamondbacks", category: "National League", subCategory: "west", icon: "./icons/ari.png" },
        { name: "Colorado Rockies", category: "National League", subCategory: "west", icon: "./icons/col.png" },
        { name: "San Diego Padres", category: "National League", subCategory: "west", icon: "./icons/sd.png" },
    ];

    $scope.americanLeagueTeams = $filter('filter')($scope.baseballTeams, { category: "American League" });
    $scope.nationalLeagueTeams = $filter('filter')($scope.baseballTeams, { category: "National League" });

    $scope.groupBy = function (object, level) {
        var categoryName;

        switch (level) {
            case 1:
                categoryName = object.category;
                break;
            case 2:
                categoryName = object.subCategory;
                break;
            default:
                categoryName = null;
        }

        return categoryName;
    }

    $scope.groupByConference = function (object, level) {
        var categoryName;

        switch (level) {
            case 1:
                categoryName = object.subCategory;
                break;
            default:
                categoryName = null;
        }

        return categoryName;
    }

    // sort categories
    $scope.sortCategories = function(name1, name2) {

        return (name1 <= name2) ? -1 : 1;
    }

    // sort items
    $scope.sortItems = function (obj1, obj2) {

        return (obj1.name <= obj2.name) ? -1 : 1;
    }
})