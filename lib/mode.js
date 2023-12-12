const { ROCrate } = require("ro-crate");
//const rules = require('./rules');
const fs = require("fs");
const path = require("path");
const yargsParser = require("yargs-parser");
const { cloneDeep, isUndefined   } = require("lodash");

/**
 *
 */
class Mode {

  static validate(mode, crate) {
    //const crate = inputCrate.clone();
    // THis is jsut (mostly) copied from the minimal validator that's in Crate-O 
    // It's just a hacky proof-of concept
      let validationResult = {};
      for (let entity of crate.entities()) {
        if (entity["@id"] !== 'ro-crate-metadata.json') {
          for (let entityType of entity['@type']) {
            const classDefinition = mode.classes[entityType];
            if (classDefinition) {
              for (let input of classDefinition.inputs) {
                if (input.required && (isUndefined(entity[input.name]) || entity[input.name][0] === '')) {
                  //TODO: check that the input value is valid
                  if (!validationResult[entity['@id']]) {
                    validationResult[entity['@id']] = {'name': entity['name'], props: {}};
                  }
                  validationResult[entity["@id"]].props[input.id] = {name: input.name, type: 'required'};
                }
              }
            }
          }
        }
      }
      return validationResult;
    }

   /**
   * @param {object} A a
   * @param {string} Path to a markdown format template that can be evaluated with string interpolation
   * @returns {string} markdown
   */
  static generateSpec(mode, templatePath, examplePath) {
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
        else if (mode.classes[t]) {
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

    rules.RootDataEntityProperties = '';

  
    const dataEntityRules = []
    for (let rde of mode.rootDataEntity) {
      dataEntityRules.push( 
      `-  MUST have at least the following types: ${s(
        rde.type
      )} with a conformsTo property with least the following values ${uriLinks(
        rde.conformsToUri
      )}`);
      rules.RootDataEntity = `The Root Data Entity:\n${dataEntityRules.join(' OR \n')}`
      console.log(rules.RootDataEntity)
      rules.RootDataEntityProperties += `## Root Data Entity ${rde.type.join(", ")}\n`
      rules.RootDataEntityProperties += makePropTable(rde.type) 
      rules.RootDataEntityProperties += '\n'
    }
    

    function makePropTable(types) {
      const props = {};
      for (let t of types) {
        for (let p of mode.classes[t].inputs) {
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
    
    

    // Make markdown that is a general summary of all classes (and other expected values)
    rules.allClasses = "## Requirements for all classes and values\n\n";
    for (let c of Object.keys(mode.classes)) {
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

module.exports = { Mode };
