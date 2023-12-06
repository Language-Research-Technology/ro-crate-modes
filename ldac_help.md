# General Information

Crate-O is a browser-based editor for [Research Object Crates (RO-Crate)](https://www.researchobject.org/ro-crate). RO-Crate is a flexible, developer-friendly approach to linked-data description and packaging. 

Crate-O is designed to:
- describe files on a user’s computer and to add contextual information about those files,
- skip the files and describe abstract contextual entities such as in a Cultural Collection or an encyclopaedia, or
- annotate existing resources elsewhere on the web.

Crate-O works only with [Google Chrome](https://google.com/chrome) and [Microsoft Edge](https://microsoft.com/edge) at this stage as it describes files on the user's computer, and saves RO-Crate metadata there. We will be releasing versions that work with online resources directly which will be compatible with other browsers (see the [Roadmap](https://github.com/Language-Research-Technology/crate-o#roadmap--backlog)).

While the current version of Crate-O is designed for editing self-contained RO-Crates (and works fine with crates containing tens of thousands of entities), our roadmap includes editing fragments of larger linked-data resources, and integration with Arkisto repositories such as the Oni repository, data API and search portal.

Crate-O is currently developed by the [Language Data Commons of Australia (LDaCA)](https://www.ldaca.edu.au/), under the guidance of Peter Sefton as technical lead. If the tool is adopted in other contexts (we are in talks with a few groups about this) then we aim to establish a steering committee/reference group to help guide development.

# Crate-O Use Cases

Crate-O can be used to:
- Describe data collections
- Add and edit the metadata fields of a data collection
- Submit a collection to the LDaCA Portal
- Edit a schema

## Main Start Page Options

From the main toolbar, the following options are available:

File Option | Description
--- | ---
Open Directory | Select a directory/folder to describe your research.
Load Files | Loads files from the selected directory into this RO-Crate.
Bulk Add | Select a spreadsheet from a different directory to assist you with metadata description. This will append to your existing RO-Crate if there is already one created.
Save | Save the state of this page into your RO-Crate. This will create an _ro-crate-metadata.json_ file or append data into an existing _ro-crate-metadata.json_.
Close | Closes without saving.
Mode | Select a predefined mode or load one from your computer.

## RO-Crate Collection Hierarchy

The diagram below shows the hierarchical relationship between collections, objects and files in a corpus, together with the metadata that these relationships are organised by.

![Self-contained corpus crate with all resources](image.png)

The metadata is organised by the various kinds of entities recognised in the ontology documented at schema.org at least partly based on the RDF framework.

Entity | Definition
--- | ---
Class | (rdfs: Class) Used to classify resources. An instance of an rdfs: Class is defined using the predicate rdf: type. Classes in Language Data Commons include CollectionEvent, CollectionProtocol, DataDepositLicense, DataLicense and DataReuseLicense.
Property | (rdfs: Property) are used to add attributes to classes. Similar to how we define classes, we can define instances of properties to add attributes to statements.
DefinedTerm | A 'word, name, acronym, phrase, etc. with a formal definition' and they are 'often used in the context of category or subject classification.' DefinedTerms allow us a) to have accurate definitions of the values we want to give to properties and b) to group such definitions in DefinedTermSets which can function as controlled vocabularies.

For more details on these entities and their related metadata, see [Metadata for Language Data](https://ldaca.gitbook.io/metadata-for-language-data/).

## Creating a New RO-Crate for Language Data Commons

New RO-Crates can be created in several ways, including:
- Directly in Crate-O
- Spreadsheet upload to Crate-O
- Manual form

### RO-Crate Creation in Crate-O

[TODO: add details]

### RO-Crate Creation through Spreadsheet Upload

An RO-Crate metadata spreadsheet template can be downloaded from [TODO: add this] and populated with your collection metadata for upload to Crate-O.

The spreadsheet has three standard tabs by default, but depending on your collection, you may need to add additional tabs.

Tab | Description
--- | ---
People | Contains metadata about the people within the collection.
Files | Contains metadata about the files in your collection. If the collection has multiple file formats, duplicate this tab and add the formats to the tab names, e.g. WAV_Files, EAF_Files, TXT_Files etc.
Objects | Contains metadata about the entities within the collection that could encompass one or more files.

> NOTE: ELAN (.eaf) files can have relative or absolute paths to the data they relate to. The preferences file is generally not needed for the collection and relates to the particular ELAN user only.

Each of these tabs have columns that require data to be input, as well as columns that are pre-populated with formulas that reference the sections you complete.

At a minimum, it’s best practice to include __@id__ and __@type__ columns in each of your spreadsheet tabs, as these appear in Crate-O for each of the entities. Items in the __@id__ columns should always be prefixed with #, for example, an __@id__ under People could be ‘#Anna’. __@type__ is an umbrella term that encompasses Classes, Properties, DefinedTerms and DefinedTermSets. For more detailed lists of these, see [Metadata for Language Data](https://ldaca.gitbook.io/metadata-for-language-data/).

To load your collection metadata into Crate-O for viewing and further editing:
- Navigate to [Crate-O](https://language-research-technology.github.io/crate-o/#/) in either [Google Chrome](https://google.com/chrome) or [Microsoft Edge](https://microsoft.com/edge).
- Click __Bulk Add__.
- Select your spreadsheet.
- Under __Mode__, ensure that you have _Language Data Commons top level Collection (corpus)_ selected.
- A pop-up will show the metadata that has been added, as well as any warnings associated with it.

### RO-Crate Creation through Manual Form

[TODO: add details]

## Load an Existing RO-Crate for Language Data Commons

If you already have an associated RO-Crate for your collection, follow these steps to view and edit this further.

- Navigate to [Crate-O](https://language-research-technology.github.io/crate-o/#/) in either [Google Chrome](https://google.com/chrome) or [Microsoft Edge](https://microsoft.com/edge).
- Select __Open Directory__.
- Navigate to the location of the _ro-crate-metadata.json_ file for your repository, then choose __Select__. This will open the repository in Crate-O, from where you can populate the metadata for your collection.
- Under __Mode__, ensure that you have _Language Data Commons top level Collection (corpus)_ selected.
- The message "This dataset does not have all the types required in the profile" at the top of a loaded directory indicates that there is important metadata missing. Click the blue Add missing metadata button, which will take you directly to that item and populate the data.

## General Navigation

- __Selected Directory__ shows the directory or folder you currently have open.
- Below __Selected Directory__, you will see a home icon followed by a file path that indicates where you are located in the collection levels. This will change as you navigate to different sublevels.
- Depending on the metadata group, different types of metadata will be available:

Metadata Group | Description
--- | ---
About | The core metadata for this RO-Crate and its subject matter.
Related People, Orgs & Works | The context for the creation of this RO-Crate; who made it, funded it etc.
Structure | How the parts of this RO-Crate relate, such as collection and object relationships.
Provenance | Detailed description of how entities were created, by whom and with which tools.
Space & Time | Where and when the data was collected; the times and places it mentions or describes.
Software & Hardware | For computer programs and execution environments that could be used to create data, have created data, or are being packaged and described.
Others | [TODO: needs description]

There are several compulsory metadata fields required for each collection. To view these, go to [TODO: add link].

On the left-hand panel, there are some further options related to navigating and creating metadata entities:
- __Create New Entity__: [TODO: Needs description].
- __Links from__: When located in a sub-group, select to view the parent group(s).
- __All Entities__: Select to view all metadata associated with your collection.
- __Unlinked Entities__: Select to view all metadata that currently is not linked to any properties.

## Using Crate-O to Edit a Schema

For internal LDaCA use, the Crate-O platform also allows you to edit and add descriptions, attributes and connections of entities in a schema. The steps below explain this process, using the language-data-commons-vocabs repository as an example.

### Clone the Repository

- Make a clone of the [language-data-commons-vocabs](https://github.com/Language-Research-Technology/language-data-commons-vocabs) repository in a space in your directory that makes sense to access.
- See [Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) for further details.

### View the Schema in Crate-O

- Navigate to the current working branch or create a new branch for your updates.
Example if using GitHub Desktop:
    - Current Repository: _language-data-commons-vocabs_
    - Current Branch: _great-metadata-migration_
- Select __Fetch Origin__ to ensure you have the latest updates to the branch.
- Navigate to [Crate-O](https://language-research-technology.github.io/crate-o/#/) in either [Google Chrome](https://google.com/chrome) or [Microsoft Edge](https://microsoft.com/edge).
- Select __Open Directory__.
- Navigate to the location of the cloned _ro-crate-metadata.json_ file for your schema, then choose __Select__.
- This will open the schema and display as _Language Data Commons Schema Terms_.
- Check that the mode is set to _Schema profile_ and change it if not.
- You can now navigate to the sections you want to view and/or update.

> NOTE: DefinedTerms are LDaCA-specific metadata items that link to an existing open-source schema, but don't necessarily have to have the same standard name and description if those don't apply to the LDaCA use case.

### Update an Entity Description

- In __About__ on the left-hand panel, go to _Mentions_; these are the classes and properties associated with the schema.
- Enter a keyword to find the entity you want to edit.
- Click on the entity.
- The _Comment_ section is the description of the given entity or class.
- Make edits to this and any other relevant sections.
- When finished with updates, select __Save__; this will make the changes to your cloned file.
- Commit your changes on the branch with a short description.
- Finally, push your changes.
