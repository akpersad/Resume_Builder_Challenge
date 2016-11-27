(function() {
    angular
        .module("resume_uploader")
        .factory("DataService", DataService);

    function DataService() {
        var dataObj = {
            processFile: processFile()
            //TODO: Data Parse
        };
        return dataObj;
    }

    var fileInput = $('#files');
    var uploadButton = $('#upload');

    uploadButton.on('click', function() {
        if(!window.FileReader) {
            alert('Your browser is not supported')
        }
        var input = fileInput.get(0);

        // Create a reader object
        var reader = new FileReader();
        if(input.files.length) {
            var textFile = input.files[0];
            reader.readAsText(textFile);
            $(reader).on('load', processFile);
        } else {
            alert('Please upload a file before continuing')
        }
    });

    function processFile(e) {
        var file = e.target.result,
            results;
        if(file && file.length) {
            results = file.split("\n");
        }
        return results;
    }
})();