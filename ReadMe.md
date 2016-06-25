#<p style="text-align: center;">Angular Group and Sort</p>

The <b>group And Sort</b> is a transcluding directive to will group an array of objects into categories as deep as you like. 
After grouping your objects into categories, you may sort your categories at every level and finally, sort your items.

Objects may not be fully categorised, if some of the objects do not have as many sub-categories as other objects, they simply remain at the 
group into which they were categorised.

Grouping and sorting is not mandatory. You can group item and skip sort or skip grouping and justsort items. (however, if you do not group - 
you cannot sort by categories). 

Grouping and sorting of categories and items is acheived by calling your assigned grouping and sorting functions as described bellow.

The <b>group And Sort</b> directive does nothing until data is requested by its transcluded directive. You call the directive's 'data'
function in order to retreive the groupd and sorted objects which are encapsulated in a convinient-to-retreive data structure. 
###Dependencies
The <b>Angular Group and Sort</b> sole dependency is on AngularJS 1.5.6 [get AngularJS](http://angularjs.org/)
###Demo
THe directive comes with an example project that lets you try out its various capabilities.
###Properties
The directive exihibts the following properties:
####objects
An array of objects you wish to group and/or sort.
####group-by
The name of the grouping function used for dividing objects into different caregories. The function will be passed an object and a level 
(specifying grouping depth) one at a time until all objects are categorised. The function is expected to return a string (the category name) or 
null if the item has been fully categorised.
```javascript
	groupingFunction = function(object, level) {
		your grouping logic ...
		return categoryName or return null
	}
```
####sort-categories
The name of sorting function used to sort categories (only when grouping is in effect). The function will be passed two category names at a
time and should return a value less than zero ( < 0) if the first category should be ordered before the second category, zero (0) if the 
categories may appear in any order, or a value greater than zero (0 <) if the second category should be ordered before the first.
```javascript
	categorySortingFunction = function(categoryName1, categoryName2) {
		your sorting logic ...
		return -1 // category1 appears before category2
		or return 0 // either one may appear before the other
		or return 1 // category2 appears before category1
	}
```
####sort-items
The name of sorting function used to sort the inputed objects (regardless of grouping and/or categry sorting). The function will be passed 
two objects at a time and should return a value less than zero ( < 0) if the first object should be ordered before the second object, 
zero (0) if the objects may appear in any order, or a value greater than zero (0 <) if the second object should be ordered before the first.
```javascript
	itemSortingFunction = function(obj1, obj2) {
		your sorting logic ...
		return -1 // obj1 appears before obj2
		or return 0 // either one may appear before the other
		or return 1 // obj2 appears before obj1
	}
```
###Methods
####data
The data function should be called by the transcluded directive in order to pull its data from the <b>Group and Sort</b> directive. Only then will the directive
proccess its input array of objects - group and sort (categories and/or items) if needed - before returning an array of output objects as specified bellow:
```javascript
	[
		{
			category: categoryName,
			objects: [ array of objects ]
		},
		....
	]
```
The value of the top-most category will always be null as this is the root of the catgories tree.

If no grouping is requested, then all the objects are present in the 'objects' array. (the objects may still be sorted, if a sort-items function was provided 
to the directive.)

If grouping is requested, then each category will be manifested in the 'object' array as an object whose properties are 'category' and 'objects' and whose behavior imitates
 the top-most object depicted above. At each level objects who are not categorised are collected into an array which is the last element of the objects array.

So, categorised objects are always an object as the one described above, and done categorised objects if any are in an array who is the last element in the objects 
array. 

IF all your objects are fully categorised, then you need not worry about not fully categorised items. All your objects will like the one above, and all your objects 
will be at leafs.

### Install with Bower
When you install with bower, you only get the javascript source file and the README.md file. If you want to download the example, get the zip or tar files from Github.

```sh
$ bower install angular-GroupSort
```
