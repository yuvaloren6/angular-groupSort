/// <reference path="bower_components/angular/angular.js" />

angular.module('groupingTree', ['angular-groupSort', 'ui.bootstrap'])
.directive('groupingTree', function () {
    return {
        scope: {
            title: '@'
        },
        require: "^groupSort",
        template: '<div class="btn-group" uib-dropdown style="width:250px"> \
                                <button id="split-button" type="button" class="btn btn-success">{{title}}</button> \
                                <button type="button" class="btn btn-success" uib-dropdown-toggle> \
                                <span class="caret"></span> \
                                <span class="sr-only">Split button!</span> \
                                </button> \
                                <ul style="width:220px" class="dropdown-menu" uib-dropdown-menu aria-labelledby="split-button"> \
                                    <categories ng-repeat="group in groups.objects" category="group" first="{{$first == true}}"></ul> \
                           </div>',
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs, groupAndSortCtrl) {

            scope.groups = groupAndSortCtrl.data();
        },
        controller: function ($scope, $element, $attrs) {

        }
    }
})
.directive('categories', function ($compile, Utilities) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            first: '@',
            category: '=',
        },
        link: function (scope, element, attrs) {
            var div, index;
            var width, left;

            if (scope.category.isLeaf) {
                if ("true" !== scope.first) { element.append('<li><hr></li>'); }
                element.append('<li style="font-style: italic; font-weight: bold; color: grey">{{category.categoryName}}</li> \
                                <ul style="list-style-type: none;"> \
                                    <li ng-repeat="object in category.objects" style="margin-top:5px; margin-left:10px"> \
                                        <a href="#"><img style="margin-right:5px" src="{{object.icon}}" height="16" width="16"><span>{{object.name}}<span></a></li> \
                                </ul>');
            } else {
                // add non leaf category
                if ("true" !== scope.first) { element.append('<li><hr></li>'); }
                element.append('<li style="font-style: italic; font-weight: bold; color: grey">{{category.categoryName}}</li>');

                // add sub categories
                if (angular.isArray(scope.category.objects)) {
                    scope.length = scope.category.objects.length;
                    for (var i = 0; i < scope.length; i++) {
                        (function () {
                            var index = i;

                            if (angular.isObject(scope.category.objects[index])) {
                                element.append('<ul style="list-style-type: none;"> \
                                                    <categories category="category.objects[' + index + ']" first="' + (index == 0) + '"></catgories> \
                                                </ul>');
                            }
                        })();
                    }
                }
            }
            $compile(element.contents())(scope);
        }
    }
})
