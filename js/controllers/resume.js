(function() {
    angular
        .module("resume_uploader")
        .controller("resumeCtrl", ResumeController);

    ResumeController.$inject = ['DataService'];

    function ResumeController(DataService) {
        this.DataService = DataService;
        this.upload = upload;

        var fileInput = $('#files');

        function upload() {
            console.log("hello");
            changeIt(true);
        }

        function changeIt(state) {
            DataService.activate(state);
        }

        $('#upload').on('click', function() {
            if(!window.FileReader) {
                alert('Your browser is not supported')
            }
            var input = fileInput.get(0);

            // Create a reader object
            var reader = new FileReader();
            // debugger;
            if(input.files.length) {
                if(input.files[0].type === "text/plain") {
                    var textFile = input.files[0];
                    reader.readAsText(textFile);
                    $(reader).on('load', processFile);
                } else {
                    changeIt(false);
                    alert('Please upload a .txt file')
                }
            } else {
                changeIt(false);
                alert('Please upload a file before continuing')
            }
        });

        function processFile(e) {
            var file = e.target.result,
                results;
            if(file && file.length) {
                var div = document.getElementById('TextArea');
                results = DataService.dataParse(file);
                for(var i = 0; i < results.length; i++) {
                    div.innerHTML += results[i] + "<br>";
                }
            }
        }
    }
})();