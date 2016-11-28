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
                results = DataService.dataParse(file);

                //Name
                var name = document.getElementById('name');
                name.innerHTML += results[0];

                //Contact
                var contact = document.getElementById('contact');
                contact.innerHTML += results[1] + "<br>" + results[2];

                //Objective
                var objective = document.getElementById('objective');
                objective.innerHTML += "<i>OBJECTIVE:</i>" + " " + results[3][1] + "<hr>";

                //Key Skills
                var skills = document.getElementById('key_skills');
                skills.innerHTML += "<b><h3>Professional Skills</h3></b>";
                for (var i = 1; i < results[4].length; i++){
                    skills.innerHTML += results[4][i] + "<br>";
                }

                //Employment
                var placeholder = document.getElementById('placeholder');
                var employment = document.getElementById('employment');
                var title = document.getElementById('title');
                var date = document.getElementById('date');
                var tasks = document.getElementById('tasks');
                employment.innerHTML += "<hr><b><h3>Employment</h3></b>";
                $('#title1').append(results[5][0][0]).append('<br>').append(results[5][0][1]);
                $('#title2').append('<br>').append(results[5][1][0]).append('<br>').append(results[5][1][1]);
                $('#date1').append(results[5][0][2]);
                $('#date2').append(results[5][1][2]);
                for(var j = 3; j < results[5][1].length; j++) {
                    $('#tasks1').append(document.createElement('div')).append(results[5][0][j]);
                    $('#tasks2').append(document.createElement('div')).append(results[5][1][j]);
                }


                //Education
                var education = document.getElementById('education');
                education.innerHTML += '<hr><b><h3>Education</h3></b>';
                education.innerHTML += "<h4>" + results[6][1] + "</h4>";
                education.innerHTML += results[6][0] + "in " + results[6][3] + "<br>";
                education.innerHTML += "Minor: " + results[6][4] + "<br>";
                education.innerHTML += "GPA: " + results[6][0];

            }
        }
    }
})();