# Crate-O RO-Crate Editor Mode File

This repository is for the development of cross-application editor configurations, known as "Modes" that implement RO-Crate Profiles.

[RO-Crate] (Research-Object Crate) is linked-data based specification, based on JSON-LD syntax with an extensible Schema.org based vocabulary schema and @context, for packaging data with metadata. RO-Crates are useful in a variety of contexts, including for describing research datasets for re-use and archiving and for describing contextual information such as the relationships between people, organizations and events.

[RO-Crate Profiles] specify how to specialise the RO-Crate approach for a particular purpose or domain. They consist of (at least) a human-readable document, and optionally validation services. An RO-Crate Editor Mode File supplements an RO-Crate Profile with specific machine readable instructions. 

The configuration files contained in this repository, which we are calling "RO-Crate Modes" are intended to form the basis of a an approach for describing RO-Crate editor behaviour and as a basis for validation.

Initial versions of this work were based on the [Describo Profiles] (which vary between versions of Describo) used to configure the [Describo] family of RO-Crate editing tools - currently maintained by Marco La Rosa.


# About Schema.org Style Schemas

Schema.org uses a very simple approach to defining its own schema, which is explained in this page about [Schema.org style Schemas and RO-Crate Editor Profiles](./docs/soss-profiles.md)


# Future Roadmap

We will be discussing:

- How to improve the editing experience such as schema:CreateAction which link to multiple other entities, making them more complicated than simply linking to a schema:creator
- Generating schemas SHACL shapes or other schema languages such as OWL, in addition to the existing tooling for generating profiles from [example documents and Schema.org style ontologies](./docs/soss-pofiles.md). 
- Linking to RO-Crate Profile validation
- Other: Let us know about your suggestions by raising an issue.


# Governance 

This repository is maintained by the Language Data Commons of Australia (LDaCA). If there is interest we will set up a series of ad hoc standardisation consultation meetings to help steer the development of RO-Crate Editor profiles, along the lines of the RO-Crate community process which takes place outside of any formal orgnizational framework.


[RO-Crate]: https://www.researchobject.org/ro-crate/
[RO-Crate Profiles]: https://github.com/ResearchObject/ro-crate/blob/master/docs/1.2-DRAFT/profiles.md
[Describo]: https://describo.github.io/
[Describo Profiles]: https://github.com/describo/profiles/tree/master
