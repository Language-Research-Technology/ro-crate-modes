const {Mode} = require('../index.js');
const {ROCrate} = require('ro-crate')
var assert = require("assert");
const fs = require("fs")



describe("Validate a Crate", function () {

    it("Can validate a Crate", async function () {
      const mode = require("../modes/language-data-commons.json");
      const crate =  new ROCrate(
        {array: true, link: true}
      );
      var result = await Mode.validate(mode, crate);
      assert.equal(Object.keys(result["./"].props).length, 7, "7 missing properties on root dataset")

    });




    




});
