# Crate-O RO-Crate Editor Profiles

This repository is for the developement of cross-application editor configurations for RO-Crate Profiles.

[RO-Crate] (Research-Object Crate) is linked-data based specification, based on JSON-LD syntax with an extensible Schema.org based vocabulary schema and @context, for packaging data with metadata. RO-Crates are useful in avariety of contexts, including for describing research datasets for re-use and archiving and for describing contextual information such as the relationships between people, organizations and events.

[RO-Crate Profiles] specify how to specialise the RO-Crate approach for a particular purpose or domain. They consist of (at least) a document, and optionally validation services. An RO-Crate Editor Profile supplements an RO-Crate Profile with specific intstructions. 

The configuration files contained in this repository, which we are calling "RO-Crate Editor Profiles" are intended to form the basis of a new standard for describing RO-Crate editor behaviour and are based on the [Describo Profiles] (which vary between versions of Describo] used to configure the [Describo] family of RO-Crate editing tools - maintainted by Marco La Rosa.


# Initial differences from Describo profiles

The starting point for this project was when the [LDaCA] team needed to extend the Describo-profiles we had been working with in our RO-Crate editor tool Crate-O. This required us to make breaking changes - see this page [about the differences](docs/describo-diffs.md).

# About Schema.org Style Schemas

Schema.org uses a very simple approach to defining its own schema (see
[Schema.org style Schemas and RO-Crate Editor Profiles explained](./docs/soss-pofiles.md)
for more on this), which is in the process of being adopted/adapted for RO-Crate, at the Language Data Commons of Australia we have created some tooling that

# Future Roadmap

We will be discussing:

- How to better handle entities with compound/multiple @types
- How to improve the editing experience such as schema:CreateAction which link to multiple other entities, making them more complicated than simply linking to a schema:creator
- Generating schemas SHACL shapes or other schema languages such as OWL.
- Linking to RO-Crate Profile validation
- Let us know by raising an issue.


# Governance 

This repository is maintained by the Language Data Commons of Australia ([LDaCA] project). If there is interest we will set up a series of ad hoc standardisation consultation meetings to help steer the development of RO-Crate Editor profiles, along the lines of the RO-Crate community process which takes place outside of any formal orgnizational framework.


[RO-Crate]: https://www.researchobject.org/ro-crate/
[RO-Crate Profiiles]: https://github.com/ResearchObject/ro-crate/blob/master/docs/1.2-DRAFT/profiles.md
[Describo]: https://describo.github.io/
[Describo Profiles]: https://github.com/describo/profiles/tree/master
