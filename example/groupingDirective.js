/// <reference path="bower_components/angular/angular.js" />

angular.module('groupingExample', ['angular-groupSort'])
.directive('groupingTree', function () {
    return {
        require: "^groupSort",
        template: '<div class="title">{{groups.categoryName}}<div> \
                        <categories ng-repeat="group in groups.objects" category="group"></categories> \
                    </div></div>',
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs, groupAndSortCtrl) {

            scope.groups = groupAndSortCtrl.data();
            scope.groups.categoryName = 'Baseball teams';
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
            category: '='
        },
        link: function (scope, element, attrs) {
            var div, innerDiv, index;
            var width, left;

            // add category name
            if (Utilities.isString(scope.category.categoryName)) {

                div = angular.element('<div class="categoryName" style="margin-top:20px">{{category.categoryName}}</div>');
                innerDiv = angular.element('<div class="category">');

                // add sub categories
                if (angular.isArray(scope.category.objects)) {
                    scope.length = scope.category.objects.length;
                    for (var i = 0; i < scope.length; i++) {
                        (function () {
                            var index = i;
                            // since an array is also an object, but not vice versa we need to check for arrays first
                            // these are the objects that are were not fully categorised. i.e. they are not in the leafs 
                            if (angular.isArray(scope.category.objects[index])) {
                                innerDiv.append("<div class='categoryName' style='float: left; min-width:0px'> \
                                                    <img ng-repeat='obj in category.objects[" + index + "]' src='{{obj.icon}}' alt='{{obj.name}}' width='32' height='32'></img></div></div>");
                            } else {
                                if (angular.isObject(scope.category.objects[index])) {
                                    innerDiv.append("<div class='categoryName''><categories category='category.objects[" + index + "]'></catgories></div>");
                                }
                            }
                        })();
                    }
                }
                div.append(innerDiv);
                element.append(div);
            } else {
                element.append('<div class="category"><img src="{{category.icon}}" alt="{{category.name}}" width="32" height="32" border="0"></img></div');
            }
            $compile(element.contents())(scope)
        }
    }
})