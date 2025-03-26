# BMW Car Extras - Backend

>Return to contents [here](/README.md#contents)

## Configuration

1. The default environment configuration is saved in `appsettings.json` file (within the API project).
2. It is recommended that you use a custom configuration for local development. To do this, make a new file in the `BMW.API` folder, named `appsettings.Development.json`. This file is ignored by git, so you will not change default settings for other developers. All configurations set in the `appsettings.Development.json` file will override values from `appsettings.json`.
   An example configuration for `appsettings.Development.json` is provided below.

```json
{
  "ConnectionStrings": {
    "SqlDb": "<insert Db connection string>"
  }
}
```

3. Configuration for Azure hosted environments is saved `appsettings.Production.json` file. During deployment process tokens will be replaced by values defined in [/deployment/variables](../../.azure-pipelines\templates\deploy\variables)

### Set up Database

#### Using an externally hosted SQL Server on Azure


- The SQL database that you will set up will require a fixed IP address.

1. Login to your [Azure portal](https://portal.azure.com/#home)
1. Create a new [Resource Group](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)
   - Use an easily identifiable name, such as 'BMWExtrasDevResourceGroup'.
1. Create a new 'SQL Database' within the resource group.
   - Use an easily identifiable database name, such as 'BMWExtrasDevDatabase'.
   - For the SQL Server select 'Create New' to create a new server on which the SQL Database will run. Again, use an easily identifiable name for the server, such as 'BMWExtrasDevSQLServer' (note that the name must be unique across all of Azure), and select 'Use both SQL and Azure AD authentication' as your authentication method. Set yourself as the Azure AD admin, and be sure to remember the Server admin login and password as these will be needed later.
   - If you are prevented from creating a new SQL server resource as a result of violating the AZ-076 (minimum TLS version) policy, follow [these instructions](https://pwc.sharepoint.com/:w:/r/sites/GBL-IFS-gbl_cloud-security-operations/_layouts/15/doc.aspx?sourcedoc=%7B96070426-349d-43eb-ba18-53e7ec193628%7D&action=edit&cid=5ec4041e-96de-4925-b057-9d516db3c677).
   - You do not need an SQL elastic pool for the Database, and the workload environment is 'Development'.
   - Configure the database compute and storage options to be the smallest size you can. This is the 'Basic' service tier.
   - Backup storage redundancy can be set to 'Locally-redundant'.
   - Select the 'Networking' Tab
   - Enable 'Add current client IP address'
   - Select 'Review and Create' to create the SQL Server and SQL Database resources.


### Applying migrations to the Database

1. You will need to set the database connection string in the `appsettings.Development.json` file to allow the application to access the database.
2. From the `src/backend` folder, use the EF Migration tool to apply database structure with the following command:

```
  dotnet ef database update
```

- Note that running this command requires you to have [Microsoft Dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) installed, as well as the .NET Entity Framework tool, which can be installed with the command `dotnet tool install --global dotnet-ef`.


### Running the API

#### Using Visual Studio 
1. Open Visual Studio 
1. Open the solutions file `src/backend/BMWApi.sln`
1. Ensure that `BMWApi` is selected in the startup projects dropdown
1. Click run or press F5

#### Using other editors
1. Start the BMW.API project with the command `dotnet run` in the folder `src/backend/BMW.API`.
1. Navigate to:
   - `https://localhost:7266/swagger/v1/swagger.json` to see swagger documentation in json format

### Querying the API

Once you have the backend API up and running, you can explore its functionality using tools such as [Swagger](https://swagger.io/) and/or [Postman](https://www.postman.com/). (Note that most endpoints of the API will require you to be authenticated- logged in to the auth provider, and authorized- present in the application database).

#### Querying the API with Swagger

1. With the API running on your local machine, visit `https://localhost:7266/swagger/index.html` in your browser. This will open the automatically generated Swagger documentation for the API.
2. You can now make requests to the api, by selecting the endpoint you wish to query, then clicking 'Try it out' followed by 'Execute'.

#### Querying the API with Postman

1. With the API running on your local machine, open the Postman application.
2. In your personal workspace, open a new tab.
3. Select the HTTP request method (GET / POST / PUT / DELETE).
4. Enter the request url (e.g. `https://localhost:7266/v1/Identity/UserInfo`).
5. Click 'Send' to make the request.

### Running backend tests

1. To run all backend tests (including Unit Tests and Integration Tests), simply run the command `dotnet test` in the `src/backend` folder.