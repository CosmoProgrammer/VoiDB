# VoiDB

VoiDB is a NoSQL NodeJS library that aims to replace SQL services such as MySQL and PostgreSQL in some use cases. This project was created to quickly provide a lightweight solution to data storage for smaller projects and is not meant to be used on large-scale applications.
The project saves all the data given to it in JSON files. It comes with a language similar to SQL that can be used to easily retrieve, add and manipulate data to the database.

## Installation

Currently not available for direct installation as a module; development is ongoing. 

## Usage

The following repo comes with a file named testerCode.txt. The program tester.js, run with node, will automatically run the code in testerCode.txt.

VoiDB is a simple language that is written in a more human and readable format. The syntax is simple to use, and the details are given below. Note that the language comes with words such as 'called' that are optional and are removed automatically while processing anyway. They are merely there to improve the readability of the language. 

### Creating a new database
```
create new database "TestingAfterYears";
```

### Setting active database
```
use "TestingAfterYears";
```
Please note that setting a new active database updates internal storage. Therefore, one must run this command first, and then run the following commands separately in a new run.

### Creating a new table
```
create new table "students" with columns "[{'name':'string'}, {'username':'string primarykey'}, {'pword':'password'}]" and values "[['Anirudh M', 'F2024A7PS0020H', 'testing1234'], ['Harshul Aggarwal', 'F2024A7PS0010', 'roommateperks'], ['Kaustubh Ghate', 'F2024B1PS1071', 'bastarddidntfreezecampus']]" and defaultvalues "[['Anirudh M', 'F2024A7PS0020H', 'testing1234']]";
```
Note that defaultvalues are optional. We can use the default command to revert the table to the default values.
```
default "students";
```
Also, note that passwords are automatically hashed and salted by the system. Therefore, a special command is needed in order to validate user credentials.
```
validate username "username" "F2024B1PS1071" password "pword" "bastarddidntfreezecampus" table "students";
```

### Displaying table data
```
select table "students" columns "['pword','name', 'username']" where "name === 'Anirudh M' || username === 'F2024B1PS1071'" order by "username desc";
```
Of course, order by and where are both optional clauses. Note that you don't need to put column names in quotes in the where and order by clauses.
Also note that instead of select, one can also use the keyword 'read'.

### Truncating and Deleting
```
truncate "students";
delete "students";
delete database "TestingAfterYears";
```
Truncate removes all values in the table, and delete deletes the entire table

### Inserting into Table
```
insert "[['Aditya Sundar, 'F2024B1PS0100H', 'havingfuninlife']]" into "students" columns "*";
```

Detailed tutorials and documentation will be made available soon.


## License

MIT License

Copyright (c) 2021 VoiDB

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
