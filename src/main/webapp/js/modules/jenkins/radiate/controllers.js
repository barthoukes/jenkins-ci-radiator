MilesBurton.radiate
    .controller('JenkinsCtrl', ['$scope', '$timeout', 'Build', function ($scope, $timeout, Build) {

    $scope.builds = [];
    $scope.states = ['success', 'building', 'failure', 'unstable', 'aborted', 'notbuilt', 'disabled', 'unknown'];

    var updateExistingBuilds = function (existingBuilds, updatedBuilds) {

        $(existingBuilds).each(function (idx, existingBuild) {

            updateExistingBuild(updatedBuilds, existingBuild);
        });
    };

    var updateExistingBuild = function (builds, existingBuild) {

        var updatedBuilds = $.grep(builds, function (newBuild) {
            return isBuildUpdated(existingBuild, newBuild);
        });

        if (updatedBuilds.length > 0) {

            updateBuild(existingBuild, updatedBuilds[0]);
        }
    };

    var isBuildUpdated = function (existingBuild, newBuild) {
        return newBuild.name == existingBuild.name && newBuild.timestamp > existingBuild.timestamp;
    };

    var updateBuild = function (build, update) {

        build.causes = update.causes;
        build.changes = update.changes;
        build.duration = update.duration;
        build.estimate = update.estimate;
        build.state = update.state;
        build.timestamp = update.timestamp;
    };


    var addNewBuilds = function (existingBuilds, newBuilds) {

        $.grep(newBuilds, function (newBuild, idx) {

            ifNewAddBuild($scope.builds, newBuild);
        });
    };

    var ifNewAddBuild = function (builds, newBuild) {

        var existingBuilds = $.grep(builds, function (oldBuild) {

            return isSameBuild(newBuild, oldBuild);
        });

        if (existingBuilds.length == 0) {

            builds.push(newBuild);
        }
    };


    var isSameBuild = function (existingBuild, newBuild) {
        return existingBuild.name == newBuild.name;
    };

    $scope.fetchBuilds = function () {

        Build.query(function (newBuilds) {

            updateExistingBuilds($scope.builds, newBuilds);

            addNewBuilds($scope.builds, newBuilds);

            $timeout($scope.fetchBuilds, 1000);

        });
    };


    $scope.getImageForState = function (state) {

        if (['success', 'building'].containsItem(state)) {
            return 'ball-blue.png';
        }

        if (['failure', 'ynknown'].containsItem(state)) {
            return 'ball-red.png';
        }

        if (['unstable', 'aborted'].containsItem(state)) {
            return 'ball-yellow.png';
        }

        return 'ball-grey.png';
    };

    $scope.getImageForHealth = function (healthScore) {

        if (healthScore < 25) {
            return "stormy";
        }

        if (healthScore >= 25 && healthScore < 50) {
            return "cloudy-dark";
        }

        if (healthScore >= 50 && healthScore < 85) {
            return "cloudy";
        }

        if (healthScore >= 85 && healthScore < 99) {
            return "partly-cloudy";
        }

        if (healthScore > 99) {
            return "sunny";
        }
    };

    $scope.formatDate = function(millis) {

        return new Date(millis).radiateFormat();
    };





    $scope.fetchBuilds();

}]);

