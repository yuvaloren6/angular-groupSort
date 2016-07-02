angular.module('groupingDirectives')
.directive('tableView', function ($compile) {
    return {
        scope: {
            height: '@',
            width: '@',
        },
        template: '<div style="position:relative; ng-style="{height: height, width: width;}"></div>',
        require: "^groupSort",
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs, groupAndSortCtrl) {
            var height;
            var divs = [];
            
            var league = function (height, left, top, width, league) {
                var divs = [];
                var childHeight, childTop, childWidth

                if (league.categoryName) {
                    divs.push('<div class="categoryName" style="left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px">' + league.categoryName + '</div>')
                }

                childHeight -= height - 25;
                childTop = top + 25;
                childWidth = width / 3;
                for (var i = 0; i < league.objects.length; i++) {
                    divs = divs.concat(division(childHeight, (left + (i * childWidth)), childTop, childWidth, league.objects[i]));
                }

                return divs;
            }

            var division = function (height, left, top, width, division) {
                var divs = [];
                var childrenTop;

                if (division.categoryName) {
                    divs.push('<div class="categoryName" style="left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px">' + division.categoryName + '</div>')
                }

                childrenTop = top + 25;
                for (var i = 0; i < division.objects.length; i++) {
                    divs.push(teamTableView(left, (childrenTop + (25 * i)), width, division.objects[i]));
                }

                return divs;
            }

            var teamTableView = function (left, top, width, team) {

                return '<div class="team" style="left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px"> \
                            <a href="#" ng-click="clickEvent($event)"><img style="margin-right:5px" src="' + team.icon + '" height="16" width="16" />' + team.name + '</a> \
                        </div>';
            }

            scope.groups = groupAndSortCtrl.data();

            height = Number(scope.height) / 2;
            for (var i = 0; i < scope.groups.objects.length; i++) {
                divs = divs.concat(league(height, 0, (i * height), Number(scope.width), scope.groups.objects[i]));
            }

            divs.forEach(function (currentValue) { console.log(currentValue); element.append(currentValue); })

            $compile(element.contents())(scope);
        },
        controller: function ($scope, $element, $attrs) {

            $scope.clickEvent = function (event) {

                event.preventDefault();
            };
        }
    }
})
