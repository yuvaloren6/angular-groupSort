/// <reference path="bower_components/angular/angular.js" />

angular.module('example', ['fancyAngularCombobox', 'universalAngularSelect', 'ui.bootstrap'])
.controller('exampleCtrl', function ($scope, $timeout) {

    $scope.checkModel = {
        A: false,
        B: false,
        C: false,
        D: false
    };

    $scope.locations = [
        { location: 'A', top: '0%', left: '0%' },
        { location: 'B', top: '0%', left: '50%' },
        { location: 'C', top: '50%', left: '0%' },
        { location: 'D', top: '50%', left: '50%' },
    ];

    $scope.selections = [
        { id: 1, category: "Combobox behavior" },
        { id: 2, category: "Listbox behavior" },
        { id: 3, category: "Listbox behavior" },
        { id: 4, category: "Listbox behavior" }
    ];


    $scope.selectionsTitle = 'Max selections';
    $scope.selectionsTitleClass = 'btn-primary';
    $scope.maxSelectionsValue = 'id';
    $scope.resetMapSelect = 0;

    // difficulty captions
    $scope.getMaxSelectionsCaption = function (obj, request) {

        if ('selectedString' === request) {
            return obj.id;
        }

        return '<span>Select ' + obj.id + '</span>';
    }

    // group combobox options into categories
    $scope.groupByNumSelections = function (obj) {

        return obj.category;
    }

    $scope.beautifyCategory = function (category) {
        return '<span class="beautifyCategory">' + category + '</span>';
    }

    // toggle selection of region 'B' through ng-model
    $scope.toggleSelectionRegionB = function () {

        $timeout(function () {

            if ((null === $scope.mapSelections) || angular.isString($scope.mapSelections)) {
                $scope.mapSelections = 'B';
            } else {
                if ((angular.isArray($scope.mapSelections)) && (0 < $scope.mapSelections.length) && (-1 < (i = $scope.mapSelections.indexOf('B')))) {
                    $scope.mapSelections.splice(i, 1);
                } else {
                    $scope.mapSelections.unshift('B');
                }
                // hack - if ngModel is an array - angular will not update the view unless you re-initialize the array
                var a = $scope.mapSelections.slice(0);
                $scope.mapSelections = a.slice(0);
            }
        }, 1)
    }
})
.controller('buttonsController', function ($scope, MessageItemSelected) {

    // emit disable/enable item 
    $scope.buttonClick = function (event, id) {

        var text = ($scope.checkModel[id] === true) ? 'Enable ' + id : 'Disable ' + id;

        event.target.innerText = text;

        $scope.$emit(MessageItemSelected, id);
    };
})
.controller('mapController', function ($scope, MessageItemSelected, MessageDisableItems, MessageSelectionChanged, MessageSelectReset) {

    var meDisabled = false;

    // enable region
    $scope.isEnabled = 'map-region-enabled'

    // attach event to directive in order to set value on model variable
    $scope.clickEvent = function (event, id) {

        // item is disabled - do nothing
        if (meDisabled) {
            return;
        }

        $scope.$emit(MessageItemSelected, id);
    };

    // listen to disble event
    $scope.$on(MessageDisableItems, function (event, disabledList) {

        if (-1 < disabledList.indexOf($scope.$parent.location.location)) {
            $scope.isEnabled = 'map-region-disabled';
            meDisabled = true;
        } else {
            $scope.isEnabled = 'map-region-enabled';
            meDisabled = false;
        }
    });

    // listen to selection changed event
    selectionChangedEvent = $scope.$on(MessageSelectionChanged, function (event, selections) {

        if (-1 < selections.indexOf($scope.$parent.location.location)) {
            $scope.isSelected = 'map-region-selected';
        } else {
            $scope.isSelected = "";
        }
    });

    // listen to reset changed event
    SelectResetEvent = $scope.$on(MessageSelectReset, function (event) {

        $scope.isSelected = "";
    });
})

