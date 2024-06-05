# Using Crate-O to Edit a Schema

For internal LDaCA use, the Crate-O platform also allows you to edit and add descriptions, attributes and connections of entities in a schema. The steps below explain this process, using the language-data-commons-vocabs repository as an example.

<br>

## Clone the Repository

- Make a clone of the [language-data-commons-vocabs](https://github.com/Language-Research-Technology/language-data-commons-vocabs) repository in a space in your directory that makes sense to access.
- See [Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) for further details.

<br>

## View the Schema in Crate-O

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

<br>

## Update an Entity Description

- In __About__ on the left-hand panel, go to _Mentions_; these are the classes and properties associated with the schema.
- Enter a keyword to find the entity you want to edit.
- Click on the entity.
- The _Comment_ section is the description of the given entity or class.
- Make edits to this and any other relevant sections.
- When finished with updates, select __Save__; this will make the changes to your cloned file.
- Commit your changes on the branch with a short description.
- Finally, push your changes.
