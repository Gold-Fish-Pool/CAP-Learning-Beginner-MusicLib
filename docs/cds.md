# CDS Hacks

#### 1. Initialize a new Project
`cds init`
    This project's folder structure was generated using this command

#### 2. Create Data files referring to the Schema
`cds add data`
    The CSV files in /db/data folder was created with this command, the rows were manually added

#### 3. Create .http file to test your APIs
`cds add http`
    The .http file in test/http is generated with this command

#### 4. Add DB support
 - `cds add hana` # to Add HANA DB, ideal to use in production
 - `cds add sqlite` # Ideal for local development

#### 5. To add Authorization
`cds add xsuaa`


#### 6. Various ways to Query
 - `REST Style` - GET, POST, PUT
 - `CRUS Style` - READ, CREATE, UPDATE

 more details [here](https://cap.cloud.sap/docs/node.js/core-services#rest-style-api)

