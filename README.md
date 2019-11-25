# tap-search-rs
TapSearch takes in multiple paragraphs and give the top occurrences of a given word in those paragraphs
Try it out here - https://tap-search-rs.herokuapp.com/

### Instructions
- Paste in text with paragraphs separated by **2 lines** in the input form.
- Click on submit text
- Click on 'Get Document Indexes' to get the individual documents along with the generated document ids
- Click on 'Generate Inverted Index' to further perform the inverted indexing.
- Enter a document id and and click on 'Index Document' to find the corresponding document.
- Enter a search word to and click on the button to get the top 10 occurrences of the word in the documents.
- Click clear to clear the indexes and input.

### Sample input and output
##### Input: 
We now look at data transformation for nominal data. In particular, we study concept hierarchy generation for nominal attributes. Nominal attributes have a finite (but possibly large) number of distinct values, with no ordering among the values. Examples include geographic location, job category, and item type.


Manual definition of concept hierarchies can be a tedious and time-consuming task for a user or a domain expert. Fortunately, many hierarchies are implicit within the database schema and can be automatically defined at the schema definition level. The concept hierarchies can be used to transform the data into multiple levels of granularity. For example, data mining patterns regarding sales may be found relating to specific regions or countries, in addition to individual branch locations.


We study four methods for the generation of concept hierarchies for nominal data as follows.


This is a sample of a repeating repeating a text.

- Document to be indexed : docid_1
- Word to be searched: nominal

##### Output:
- docid_1: We now look at data transformation for nominal data. In particular, we study concept hierarchy generation for nominal attributes. Nominal attributes have a finite (but possibly large) number of distinct values, with no ordering among the values. Examples include geographic location, job category, and item type.

- Occurrences of "nominal"

3 times in docid_1: We now look at data transformation for nominal data. In particular, we study concept hierarchy generation for nominal attributes. Nominal attributes have a finite (but possibly large) number of distinct values, with no ordering among the values. Examples include geographic location, job category, and item type.

1 times in docid_3: We study four methods for the generation of concept hierarchies for nominal data as follows.
