﻿/* global angular */
angular.module("HTLogin", ["gettext", "HTServices"])
    .controller("LoginCtrl", ["$scope", "AuthSource", "UserSource", function ($scope, AuthSource, UserSource) {
        $scope.view = "login";
        $scope.loading = false;

        $scope.submitBtnLbl = "Login";

        $scope.login = function () {
            $scope.errorMessage = "";
            $scope.view = "login";
        };

        $scope.loginSubmit = function () {
            $scope.errorMessage = "";
            $scope.loading = true;
            AuthSource.login({ email: $scope.email, password: $scope.password }).$promise
                .then(function () {
                    document.location.href = "/";
                }, function (reason) {
                    $scope.password = "";
                    $scope.loading = false;
                    if (reason.status === 401) {
                        $scope.errorMessage = "Invalid username/password.";
                    }
                    else {
                        $scope.errorMessage = "We are sorry, but an unexpected error occured.";
                    }
                });
        }

        $scope.register = function () {
            $scope.errorMessage = "";
            $scope.view = "register";
        }

        $scope.registerSubmit = function () {
            $scope.errorMessage = "";
            $scope.loading = true;
            var newUser = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            }

            UserSource.register(newUser).$promise
                .then(function () {
                    $scope.loginSubmit();
                }, function (reason) {
                    if (reason.status === 409) {
                        $scope.errorMessage = "Already an existing user with that email address."
                        $scope.loading = false;
                    }
                    else {
                        $scope.errorMessage = "We are sorry, but an unexpected error occured."
                        $scope.loading = false;
                    }
                });
        }

        $scope.forgot = function () {
            $scope.view = "forgot";
        }
        $scope.forgotSubmit = function () {
            $scope.errorMessage = null;
            $scope.loading = true;
            UserSource.sendResetPasswordEmail({ email: $scope.email }).$promise
                .then(function () {
                    $scope.errorMessage = 'We have sent you an email with instructions how to reset password';
                    $scope.loading = false;
                    $scope.view = 'login';
                }, function () {
                    $scope.loading = false;
                    $scope.errorMessage = "We are sorry, but an unexpected error occured.";
                });
        }
    }])