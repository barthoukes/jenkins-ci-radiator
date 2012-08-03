MilesBurton.radiate
    .controller('JenkinsCtrl', ['$scope', '$timeout', 'Build', function ($scope, $timeout, Build) {

    $scope.builds = [];
    $scope.states = ['success', 'building', 'failure', 'unstable', 'aborted', 'notbuilt', 'disabled', 'unknown'];

    $scope.processBuilds = function () {

        Build.query(function (newBuilds) {


            $.each(newBuilds, function () {

                ifNewBuildAdd($scope.builds, this);
                updateBuildIfChanged($scope.builds, this);

            });


            $.each($scope.builds, function () {
                ifBuildRemoveDelete(newBuilds, this);
            });

            $timeout($scope.processBuilds, 1000);

        });
    };

    var updateBuildIfChanged = function (builds, prospect) {

        var buildToUpdate;

        var isUpdated = $.grep(builds,
            function (existing, idx) {
                buildToUpdate = existing;
                if (!isSameBuild(existing, prospect)) {
                    return false;
                }
                if (isBuildUpdated(existing, prospect)) {
                    return true;
                } else {
                    return false;
                }

            }).length > 0;


        if (isUpdated) {
            updateBuild(buildToUpdate, prospect);
        }
    };


    var ifNewBuildAdd = function (builds, prospect) {

        var isExistingBuild = $.grep(builds,
            function (existing, idx) {
                return isSameBuild(existing, prospect);
            }).length > 0;

        if (!isExistingBuild) {
            $scope.builds.push(prospect);
        }

    };

    var ifBuildRemoveDelete = function (builds, prospect) {

        var isRemoved = $.grep(builds,
            function (existing, idx) {
                return isSameBuild(existing, prospect);
            }).length == 0;

        if (isRemoved) {
            $scope.builds.removeItem(prospect);
        }

    };


    var isBuildUpdated = function (existingBuild, newBuild) {
        return newBuild.timestamp > existingBuild.timestamp || newBuild.state != existingBuild.state;
    };

    var updateBuild = function (build, update) {

        build.causes = update.causes;
        build.changes = update.changes;
        build.duration = update.duration;
        build.estimate = update.estimate;
        build.state = update.state;
        build.timestamp = update.timestamp;
    };


    var isSameBuild = function (existingBuild, newBuild) {
        return existingBuild.name == newBuild.name;
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

    $scope.formatDate = function (millis) {

        return new Date(millis).radiateFormat();
    };


    $scope.processBuilds();

}]);

