# RO-Crate Modes

This repository is for the development of cross-application editor configurations, known as "Modes", that implement RO-Crate Profiles.

[RO-Crate] (Research-Object Crate) is linked-data based specification, based on JSON-LD syntax with an extensible Schema.org based vocabulary schema and `@context`, for packaging data with metadata. RO-Crates are useful in a variety of contexts, including for describing research datasets for re-use and archiving, and for describing contextual information such as the relationships between people, organisations and events.

[RO-Crate Profiles] specify how to specialise the RO-Crate approach for a particular purpose or domain. They consist of (at least) a human-readable document, and optionally, validation services. An RO-Crate Mode File supplements an RO-Crate Profile with specific machine-readable instructions.

The configuration files contained in this repository, which we are calling "RO-Crate Modes", are intended to form the basis of an approach for describing RO-Crate editor behaviour and as a basis for validation.

Initial versions of this work were based on the [Describo Profiles] (which vary between versions of Describo) used to configure the [Describo] family of RO-Crate editing tools, currently maintained by Marco La Rosa.

# About Schema.org Style Schemas

Schema.org uses a very simple approach to defining its own schema, which is explained in this page about [Schema.org style Schemas and RO-Crate Editor Profiles](./docs/soss-profiles.md).

# Future Roadmap

We will be discussing:

- How to improve the editing experience, such as `schema:CreateAction`, which links to multiple other entities, making them more complicated than simply linking to a `schema:creator`.
- Generating schemas, SHACL shapes or other schema languages such as OWL, in addition to the existing tooling for generating profiles from [example documents and Schema.org style ontologies](./docs/soss-profiles.md).
- Linking to RO-Crate Profile validation.
- Other: Let us know about your suggestions by raising an issue.

# Governance

This repository is maintained by the Language Data Commons of Australia (LDaCA). If there is interest we will set up a series of ad hoc standardisation consultation meetings to help steer the development of RO-Crate Modes, along the lines of the RO-Crate community process which takes place outside of any formal organisational framework.

[RO-Crate]: https://www.researchobject.org/ro-crate/
[RO-Crate Profiles]: https://github.com/ResearchObject/ro-crate/blob/master/docs/1.2-DRAFT/profiles.md
[Describo]: https://describo.github.io/
[Describo Profiles]: https://github.com/describo/profiles/tree/master

# Setup

## PlantUML

Prerequisites:

- Ensure that [Python](https://www.python.org/downloads/) is downloaded and added to your device's path.

For anyone who wishes to edit PlantUML diagrams, such as in `.md` files, follow these steps: <br>

1. Install [plantuml](https://plantuml.com/starting)
2. Copy the pre-commit file from the githooks folder into `.git/hooks`
   - Navigate to the root of this repository: `cd (your directory path)/ro-crate-modes/`
   - (Linux/Mac): `cp githooks/pre-commit .git/hooks`
   - (Windows): `copy githooks/pre-commit .git/hooks`
3. To update images, run `plantuml docs/images/*.puml -tsvg`. Depending on your IDE, there may be a PlantUML extension/plugin available that allows for real-time previewing of PlantUML diagrams, which is helpful whilst editing `.puml` files.
