const {Profile} = require('../index.js');
var assert = require("assert");
const fs = require("fs")


describe("generateSpec", function () {

    it("Generates a sensible spec", function () {
      const result = Profile.generateSpec("profiles/software-profile.json", "test_data/software-source-code/text/profile.md", "test_data/software-source-code/examples/");
        // NOTE regexes below have . in place of [ ]
        assert(result.match(`-  MUST have at least the following types: ."Dataset","SoftwareSourceCode","SoftwareApplication".`))
        assert(result.match(`-  MUST have a conformsTo propery with least the following values .{"@id":"https://purl.archive.org/language-data-commons/profile#Software"}.`))
        assert(result.match(/```json\n+/m))

        fs.writeFileSync("test-profile.md", result)

    });



});
