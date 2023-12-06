
# Schemas, Profiles and Modes

This diagram shows the relationship between the three main components used by Crate-O and other tools used by the Language Data Commons of Australia for specifying and validating RO-Crates.

![Image showing the relationship between Schemas, modes and profiles](./images/schema-mode-profile.svg)



# Schema.org Style Schemas (SoSSs) and their relationship to profiles and modes

Schema.org, which is the basic vocabulary for [RO-Crate] has
a light-touch approach to describing what it refers to as its *schema* (with a
small-s), which might also be thought of as an *ontology*. Schema.org is defined
as a set of Classes and Properties each of which has an online definition. For
example, the base class [Thing](https://schema.org/Thing) or it's subclass
[Person](https://schema.org/Person). Classes have properties such as
[birthDate](https://schema.org/birthDate). The Schema.org specifies which Properties can occur in the `domain` of which Classes and the `range` of Classes that are expected as values for a property.

While Schema.org has Class definitions for [Class](https://schema.org/Class) and [Property](https://schema.org/Property) it does not eat its own dogfood, rather it uses the equivalent Classes from the `rdf:` and `rdfs:` namespaces.

Here is the definition for Person:

```json
{
      "@id": "schema:Person",
      "@type": "rdfs:Class",
      "owl:equivalentClass": {
        "@id": "foaf:Person"
      },
      "rdfs:comment": "A person (alive, dead, undead, or fictional).",
      "rdfs:label": "Person",
      "rdfs:subClassOf": {
        "@id": "schema:Thing"
      },
      "schema:source": {
        "@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews"
      }
    }
```

The Class definition does not have any information about the occurrence of properties -- that is found in a Property definition:

```json
    {
      "@id": "schema:sibling",
      "@type": "rdf:Property",
      "rdfs:comment": "A sibling of the person.",
      "rdfs:label": "sibling",
      "schema:domainIncludes": {
        "@id": "schema:Person"
      },
      "schema:rangeIncludes": {
        "@id": "schema:Person"
      }
    }
```

A Schema.org Style Schema, which we are calling a 'SoSS' is a Flattened JSON-LD graph, just like an RO-Crate. Some members of the RO-Crate community are beginning to define its basic schema and profiles using the same approach.

To make an RO-Crate Mode File we transform the flat graph of a schema into something optimized for driving an editor or a validator -- it creates a list of Classes, and what properties each may have. 

![Image showing how the script `rocsoss` from RO-Crate Schema Tools is used to compile a base editor profile from the schema.org schema, with RO-Crate additions ](images/soss-to-profile.svg)

We (the tech-team members Language Data Commons of Australia, (LDaCA)) used this process to create the basic [RO-Crate Editor Profile](../profiles/base-profile.json) in this repository.

It is also possible to build a profile from a set of example RO-Crate documents using the rocsoss script -- this looks for the relationships between Classes and Properties in a set of examples and generated a Schema.org Style Schema (SoSS) that captures this, then generates a Mode File from that. The rules in the Mode File can be included in an RO-Crate profile using another script - automating the process of creating profile documentation.

![Image showing how the script `rocsoss` from RO-Crate Schema Tools is used to compile a domain specific profile ](images/example-to-profile.svg)


[RO-Crate]: https://www.researchobject.org/ro-crate/