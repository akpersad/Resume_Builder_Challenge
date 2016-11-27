(function() {
    angular
        .module("resume_uploader")
        .controller("resumeCtrl", ResumeController);

    ResumeController.$inject =['DataService'];

    function ResumeController(DataService) {
        this.DataService = DataService;
        this.text = DataService.processFile;
        debugger;
    }


})();