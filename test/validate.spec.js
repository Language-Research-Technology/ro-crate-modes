/* This is part of rocrate schema tools, a node library for implementing the RO-Crate data
packaging spec. Copyright (C) 2023 University of Queensland

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const assert = require("assert");

const fs = require("fs");
const Ajv = require("ajv/dist/2019")
ajv = new Ajv()
const schema = require("../src/ro-crate-editor-profile-schema.json");

describe("Simple tests", function () {
  it("Can check all the profiles", function () {
    var ok = true;
    for (let f of fs.readdirSync("./profiles").filter((f) => f.toLowerCase().endsWith(".json"))) {
      console.log("Checking", f)
      check = require(`../profiles/${f}`)
      const validate = ajv.compile(schema)
      const valid = validate(check)
      if (!valid) {
        console.log(validate.errors)
        ok = false
      }
    }
    assert(ok)
  });
});
