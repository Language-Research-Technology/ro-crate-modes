const { ROCrate } = require("ro-crate");
//const rules = require('./rules');
//const {validateEntity} = require('./validator');
const fs = require("fs");
const path = require("path");
const { cloneDeep } = require("lodash");

/**
 *
 */
class Profile {
  /**
   *
   * @param {object} crate
   * @returns
   */
  static validate(crate) {
    //const crate = inputCrate.clone();
    return validateEntity(rules.Dataset, crate.rootDataset, crate);
  }

  static generateSpec(profile, templatePath, examplePath) {
    const rules = {objects: {}};
  
    const s = JSON.stringify;
    function norm(n) {
      return n.replace(/\W/g, "_");
    }
    function linkTypes(prop) {
      const types = [].concat(prop.type)
      const links = [];
      for (let t of types) {
        if ( t === "SelectObject") {
          for (let v of prop.values) {
            if (v["@id"]) {
              rules.objects[v["@id"]] = v;
              links.push(`<a href="#object-${norm(v["@id"])}">${v.name || v["rdfs:label"] || v["@id"]}</a>`);
            } else {
              links.push(v);
            }
          }
        }
        else if (profile.classes[t]) {
          links.push(`<a href="#type-${norm(t)}">${t}</a>`);
        } else {
          links.push(t);
        }
      }
      return links.join(", ");
    }
    function uriLinks(uris) {
      return s(
        uris.map((u) => {
          return { "@id": u };
        })
      );
    }

    rules.RootDataEntity = `The Root Data Entity:\n-  MUST have at least the following types: ${s(
      profile.rootDataset.type
    )}\n-  MUST have a conformsTo property with least the following values ${uriLinks(
      profile.conformsToUri
    )}`;

    function makePropTable(types) {
      const props = {};
      for (let t of types) {
        for (let p of profile.classes[t].inputs) {
          if (!props[p.name]) {
            props[p.name] = cloneDeep(p);
          }
          if (p.required) {
            props[p.name].required = true;
          } else {
            for (let val of p.type) {
              if (!props[p.name].type.includes(val)) {
                props[p.name].type.push(val);
              }
            }
          }
        }
      }

      let table =
        "<table>\n<tr><td><strong>Property</strong></td><td><strong>Required?</strong></td><td>Expected value range</strong></td><td><strong>Descriptions</strong></td></tr>\n";

      function formatRow(p, required) {
        return `<tr><td>${p}</td><td>${required}</td><td>${linkTypes(
          props[p]
        )}</td><td>${props[p].help}</td></tr>\n`;
      }

      for (let p of Object.keys(props)) {
        if (props[p].required) {
          table += formatRow(p, "MUST");
        }
      }
      for (let p of Object.keys(props)) {
        if (!props[p].required) {
          table += formatRow(p, "MAY");
        }
      }

      table += "</table>\n\n";
      return table;
    }

    rules.RootDataEntityProperties = makePropTable(profile.rootDataset.type);

    // Make markdown that is a general summary of all classes (and other expected values)
    rules.allClasses = "## Requirements for all classes and values\n\n";
    for (let c of Object.keys(profile.classes)) {
      rules.allClasses += `<a name='type-${norm(c)}'/>\n\n###  Type: ${c}\n\n`;
      rules[c] = `\n\n${makePropTable([c])}`;
      rules.allClasses += rules[c];
    }

    // TODO: This is onls working on SelectObject ATM
    for (let [id, o] of Object.entries(rules.objects)) {
      rules.allClasses += `<a name='object-${norm(id)}'/>\n\n###  ${o.type || "Value"} ${o.name || 0["rdfs:label"] || o["@id"]} \n\n${o.description || o['rdfs:comment'] || ""}\n\n`;
     
    }

    // load examples'
    const examples = {};
    for (const dir of fs.readdirSync(examplePath)) {
      const cratePath = path.join(examplePath, dir, "ro-crate-metadata.json");
      try {
        const json = JSON.parse(fs.readFileSync(cratePath, "utf8"));
        examples[dir] = new ROCrate(json, { array: true, link: true });
      } catch (error) {
        console.log(`ERROR: Cant'read ${cratePath}, ${error}`);
      }
    }

    function exampleEntities(exampleName, entityIds) {
      var result = "";

      if (entityIds && exampleName && examples[exampleName]) {
        entityIds = [].concat(entityIds);
        let part = "";
        for (const id of entityIds) {
          const entity = examples[exampleName].getEntity(id);
          if (entity) {
            part +=
              "```json\n" +
              JSON.stringify(entity.toJSON(), null, 2) +
              "\n```\n";
          }
        }
        if (part) {
          part += `[source](../example/${exampleName}/README.md)\n\n`;
          result += part;
        }
      } else {
        result =
          "```json\n" +
          JSON.stringify(examples[exampleName].toJSON(), null, 2) +
          "\n```\n";
      }

      return result;
    }

    const template = fs.readFileSync(templatePath);
    return new Function(
      "rules",
      "exampleEntities",
      "return `" + template + "`;"
    )(rules, exampleEntities);
  }
}

module.exports = { Profile };
