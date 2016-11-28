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
            var results_array = [];
            var string =  file.split("\n");
            string = string.filter(function(e) { return e !== "" });

            //Name
            string[0] = string[0].split("Name:")[1].slice(1,string[0].split("Name:")[1].length - 1);
            results_array.push(string.shift());

            //Phone
            string[0] = string[0].split("Phone:")[1].slice(1,string[0].split("Phone:")[1].length - 1);
            results_array.push(string.shift());

            //Email
            string[0] = string[0].split("Email:")[1].slice(1,string[0].split("Email:")[1].length);
            results_array.push(string.shift());

            //Objective
            var obj_array = [];
            while (string[0] !== "KEY SKILLS") {
                obj_array.push(string.shift());
            }
            results_array.push(obj_array);

            //Key Skills
            var key_array = [];
            while (string[0] !== "EMPLOYMENT HISTORY") {
                key_array.push(string.shift());
            }
            results_array.push(key_array);

            //Employment
            var empl_array = [];
            var formatted_array = [];
            while (string[0] !== "EDUCATION") {
                empl_array.push(string.shift());
            }
            empl_array.shift();
            var object = [];
            while (empl_array.length) {
            var checker = empl_array[0].search(/(Title:)/);
                if (!checker) {
                    object = [];
                    object.push(empl_array.shift());
                } else {
                    object.push(empl_array.shift());
                }

                if (!checker || !empl_array.length) {
                    formatted_array.push(object);
                }
            }

            formatted_array.splice(-1);

            for (var i = 0; i < formatted_array.length; i++) {
                for (var j = 0; j < 3; j++) {
                    formatted_array[i][j] = formatted_array[i][j].replace(/(.+?):/, "");
                }
            }
            // debugger;

            results_array.push(formatted_array);


            //Education
            var edu_array = [];
            while (string.length) {
                edu_array.push(string.shift());
            }
            edu_array.shift();

            for (var i = 0; i < edu_array.length; i++) {
                edu_array[i] = edu_array[i].replace(/(.+?):/, "");
            }

            results_array.push(edu_array);

            // debugger;
            return results_array;
        }
    }
})();