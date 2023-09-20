# Differences from Describo Profiles

The RO-Crate editor profiles in this repository are based on the approach taken
in the [Describo] project, but there are some differences, mainly
simplifications.


## These profiles are used for *all* schemas -- there is no background 

In Describo there are two layers of vocabulary/schema -- there is a compiled,
built-in "schema"
[derived from the Schema.org Schema](https://github.com/describo/type-definitions)
(see
[Schema.org style Schemas and RO-Crate Editor Profiles explained](./soss-pofiles.md)
for more on this). Describo profiles are loaded on top of this background schema
and hence have some features such as `inherit` that say whether or not
properties from the underlying schema.


The Crate-O approach to profiles does not continue Describo's two layered
approach of having a built in compiled profile-like schema with separate user-loadable profiles. Instead, each profile is a self-contained specification of all the Classes and Properties needed for a particular RO-Crate profile.

For example, the base profile for Crate-O
is [compiled from the Schema.org profile](./docs/soss-pofiles.md), with the few extra classes and
properties that RO-Crate adds and is entirely self-contained. As with Describo,
users can switch profiles to add `foreign` classes and properties to the their
crates, depending on how the tool has been deployed.

The Crate-O team and associates are building tools to create these complete
profiles from Schema.org Style Schemas, example documents, and other schema
approaches such as those used in [Bioschemas] (see
[Schema.org style Schemas and RO-Crate Editor Profiles explained](./soss-pofiles.md)
for more on this)


[Bioschemas]: 

## Compound types are not "stringified" (collapsed to comma separated strings without normalizing the order)

Describo Profiles deal with RO-Crate entities that have multiple types by
concatenating them into a single string.

> ## Classes
> This section contains class definitions a user can use in their dataset description. The structure
> is similar to the hide and layouts sections above where the key is the stringified `@type` and it
provides the definition of what can and can't be described to the UI.
> <https://github.com/describo/profiles/blob/6e1745f24ef78290fce4db94c4ac6bf813f97f29/profile-docs/profile-structure.md?plain=1#L71>

In the current Describo implementation there is a limitation with the approach
in that the order of Types is in input data is significant so an item with
`"@type": ["Dataset", "RepositoryCollection"]` and
`"@type": ["RepositoryCollection", "Dataset"]` will be treated differently (The
obvious fix is to *sort* the types before casting the
array to a string).

In Crate-O our current thinking on multiple types is: we will allow the `inputs`
for a property to create an item with multiple types (this is not implemented
yet, but is planned). At the moment items with multiple types simply get all the
input options for each type in the current profile -- there are no plans as yet
to make special provision for a special set of inputs for a particular compound
type unless there is demand from profile designers who need this feature.

# Layouts are per profile not per Class

Describo has a feature known as `layouts` that group property inputs together
per class, which was developed following user feedback that the forms were
getting too long.

In Crate-O we simplified this feature so a profile has a single `input-groups`
section which groups properties thematically for all classes. This both reduces
the amount of configuration needed for a profile and ensures consistency in the
interface; a given property will always show up in the same place under the same
heading or tab (depending on how groups/layouts are implemented). There is also
a default set of input-groups with the most commonly used schema.org and RO-Crate properties
grouped by function (are the structure related? spatiotemporal? etc). This will
help ensure consistency across profiles and in most cases profile designers
will only need to specify input-groups for Properties that are specific to their
profile.

# Class inheritance works differently

In Crate-O each class has a property `hasSubClass` which lists ALL the
classes which descend from the class in question, and these are used when adding
or linking this can be pre-compiled in to the profile, either using automated
tooling or by hand to give fine-grained control over what classes properties can
take as values. Describo has a `subClassOf` property, apparently for the same purpose.

# Lookup configuration has been extended to name modules

Descibo profiles have a section for specifying lookup services, for example
using the [RoR] service to look up organizations so they can be included in an
RO-Crate identified by their RoR ID.

In Crate-O we have changed this slightly to add the name of a lookup service to
use (which is configured elsewhere in the tool)


[Bioschemas]: https://bioschemas.org/ 

[RoR]:https://ror.org/