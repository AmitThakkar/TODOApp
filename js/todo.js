/**
 * Created by Amit Thakkar on 19/8/14.
 */

(function () {
    var todoModule = angular.module("todoDemo", ['ngStorage']);
    todoModule.controller("TODOController", ['$localStorage', function ($localStorage) {
        this.storage = $localStorage;
        if(!this.storage.todoObject) {
            this.storage.todoObject = {
                newTask: "",
                tasks: []
            };
        }
        this.addTask = function () {
            this.storage.todoObject.tasks.push({value: this.storage.todoObject.newTask, isImportant: false});
            this.storage.todoObject.newTask = "";
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
            templateUrl: "./partials/editableTemplate.html",
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