/**
 * Created by Amit Thakkar on 19/8/14.
 */

(function () {
    var todoModule = angular.module("todoDemo", ['ngStorage', 'decipher.history']);
    todoModule.controller("TODOController", ['$localStorage', 'History', '$scope', function ($localStorage, History, $scope) {
        this.storage = $localStorage;
        if (!this.storage.todoObject) {
            this.storage.todoObject = {
                newTask: "",
                tasks: []
            };
        }
        History.watch('todo.storage', $scope, 'Testings');
        this.undo = function () {
            History.undo('todo.storage', $scope);
        };
        this.redo = function () {
            History.redo('todo.storage', $scope);
        };
        this.addTask = function () {
            if(this.storage.todoObject.newTask.trim() !== "") {
                this.storage.todoObject.tasks.push({value: this.storage.todoObject.newTask.trim(), isImportant: false});
                this.storage.todoObject.newTask = "";
            } else {
                alert("Please write some task in text field.");
            }
        };
        this.toggleStartStage = function (index) {
            this.storage.todoObject.tasks[index].isImportant = !this.storage.todoObject.tasks[index].isImportant;
        };
        this.removeTask = function (index) {
            this.storage.todoObject.tasks.splice(index, 1);
        };
    }]);
    todoModule.directive("editable", function () {
        return {
            scope: {
                value: "=editable"
            },
            restrict: "A",
            template: '<span ng-hide="edit" ng-bind="value"></span><input ng-show="edit" ng-model="value">',
            link: function (scope, element) {
                var oldValue = scope.value;
                var changeEditStat = function (stat) {
                    scope.$apply(function () {
                        scope.edit = stat;
                    });
                    if (!stat && scope.value !== oldValue) {
                        console.log("Send request if you want to update on server.");
                    }
                };
                var inputElement = element.find("input")[0];
                element.on("click", function () {
                    changeEditStat(true);
                    inputElement.focus();
                });
                angular.element(inputElement).on("blur", function () {
                    changeEditStat(false);
                });
                element.on("keydown", function (event) {
                    if (event.keyCode === 13) {
                        changeEditStat(false);
                    }
                });
            }
        };
    });
})();