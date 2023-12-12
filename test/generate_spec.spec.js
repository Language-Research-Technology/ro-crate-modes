const {Mode} = require('../index.js');
var assert = require("assert");
const fs = require("fs")


describe("generateSpec", function () {

    it("Generates a sensible spec", function () {
      const mode = require("../modes/software.json");

      const result = Mode.generateSpec(mode, "test_data/software-source-code/text/profile.md", "test_data/software-source-code/examples/");
        // NOTE regexes below have . in place of [ ]
        assert(result.match(`-  MUST have at least the following types: ."Dataset","SoftwareSourceCode","SoftwareApplication".`))
        assert(result.match(`with least the following values .{"@id":"https://w3id.org/ro/software/source-code"}.`))
        assert(result.match(/```json\n+/m))
        fs.writeFileSync("test-software-profile.md", result)

    });



    it("Can Deal with <select> in a mode file", function () {
      const mode = require("../modes/language-data-commons.json");
      // Not worrying about examples in this one
      const result = Mode.generateSpec(mode, "test_data/ldac-profile/profile/text/profile.md", "test_data/software-source-code/examples/");
        // NOTE regexes below have . in place of [ ]
        fs.writeFileSync("test-ldac-profile.md", result)

        assert(result.match(`-  MUST have at least the following types: ."Dataset","RepositoryCollection".`))
        assert(result.match(`with least the following values .*{"@id":"https://purl.archive.org/language-data-commons/profile#Collection"}.`))
       
        assert(result.match(/\<a name='object-txc_ElicitationTask'\/\>/))
        assert(result.match(/.*###  Value ElicitationTask/))
        assert(result.match(/The collection protocol includes a task-based prompt to participants.*/))


    });


    




});
