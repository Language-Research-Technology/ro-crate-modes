# Creating a New RO-Crate for Language Data Commons

New RO-Crates can be created in several ways, including:
- Directly in Crate-O
- Spreadsheet upload to Crate-O
- Manual form

<br>

## RO-Crate Creation in Crate-O

[TODO: add details]

<br>

## RO-Crate Creation through Spreadsheet Upload

An RO-Crate metadata spreadsheet template can be downloaded from [TODO: add this] and populated with your collection metadata for upload to Crate-O.

The spreadsheet has three standard tabs by default, but depending on your collection, you may need to add additional tabs.

Tab | Description
--- | ---
People | Contains metadata about the people within the collection.
Files | Contains metadata about the files in your collection. If the collection has multiple file formats, duplicate this tab and add the formats to the tab names, e.g. WAV_Files, EAF_Files, TXT_Files etc.
Objects | Contains metadata about the entities within the collection that could encompass one or more files.

> NOTE: ELAN (.eaf) files can have relative or absolute paths to the data they relate to. The preferences file is generally not needed for the collection and relates to the particular ELAN user only.

Each of these tabs have columns that require data to be input, as well as columns that are pre-populated with formulas that reference the sections you complete.

At a minimum, it’s best practice to include __@id__ and __@type__ columns in each of your spreadsheet tabs, as these appear in Crate-O for each of the entities. Items in the __@id__ columns should always be prefixed with #, for example, an __@id__ under People could be '#Anna'. __@type__ is an umbrella term that encompasses Classes, Properties, DefinedTerms and DefinedTermSets. For more detailed lists of these, see [Metadata for Language Data](https://ldaca.gitbook.io/metadata-for-language-data/).

To load your collection metadata into Crate-O for viewing and further editing:
- Navigate to [Crate-O](https://language-research-technology.github.io/crate-o/#/) in either [Google Chrome](https://google.com/chrome) or [Microsoft Edge](https://microsoft.com/edge).
- Click __Bulk Add__.
- Select your spreadsheet.
- Under __Mode__, ensure that you have _Language Data Commons top level Collection (corpus)_ selected.
- A pop-up will show the metadata that has been added, as well as any warnings associated with it.

<br>

## RO-Crate Creation through Manual Form

[TODO: add details]

<br>

# Load an Existing RO-Crate for Language Data Commons

If you already have an associated RO-Crate for your collection, follow these steps to view and edit this further.

- Navigate to [Crate-O](https://language-research-technology.github.io/crate-o/#/) in either [Google Chrome](https://google.com/chrome) or [Microsoft Edge](https://microsoft.com/edge).
- Select __Open Directory__.
- Navigate to the location of the _ro-crate-metadata.json_ file for your repository, then choose __Select__. This will open the repository in Crate-O, from where you can populate the metadata for your collection.
- Under __Mode__, ensure that you have _Language Data Commons top level Collection (corpus)_ selected.
- The message "This dataset does not have all the types required in the profile" at the top of a loaded directory indicates that there is important metadata missing. Click the blue Add missing metadata button, which will take you directly to that item and populate the data.