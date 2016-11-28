(function() {
    angular
        .module("resume_uploader")
        .factory("DataService", DataService);

    function DataService() {
        var dataObj = {
            resumeActive: false,
            activate: activate,
            dataParse: dataParse
            //TODO: Data Parse
        };
        return dataObj;

        function activate(state) {
            dataObj.resumeActive = state
        }

        function dataParse(file) {
            return file.split("\n");
        }
    }
})();