INTRODUCTION

Provision of land information services (LIServices) in Nigeria is limited by manual processes and fragmented data management systems. As a result, land administration, surveying, and property management have been hampered by inefficiencies, inaccuracies, and delays. On the other hand, customers are increasingly becoming dissatisfied with the present situation and want better LIServices. Providers are now more conscious than ever of the need to improve the quality of products and services that they deliver to the society, which is becoming accustomed with the Internet and recognizes the advantages of technologies in submitting requests and processing LIServices. Thus, LIService providers are faced with the challenges of electronic-LIServices and for effective land administration (Akingbade, 2005).

Land administration is described as the process of determining, recording and disseminating information about the relationship between people and land, with the aim of ensuring social equity, economic growth, and environmental protection (ISO/TC211, 2012; Williamson et al., 2009).  Land administration includes management of spatial and legal data related to land and property ownership, land use, land conservation and land development. Land administration systems (LAS) are the basis for conceptualizing, enhancing and realizing people’s rights, restrictions and responsibilities in relation to land (Enemark, 2009).  LAS supports the four functions of land administration: land tenure, land value, land use and land development. It also supports land markets, sustainable development and good governance. 

Cadastre is at the core of LAS. Based on spatial (or textual) description of parcels, a cadastre is a legal records of interests in land, including the rights, restrictions and responsibilities associated with the land. Thus, cadastre describes people-to-land relationship such that the land object is amenable to valuation, proper use, development and environmental sustainability. The cadastre as the core of LAS, therefore, is developed to bring prosperity to all: land development benefits the owner; land valuation and land use add to good governance; and environment sustainability ensures the earth is a better place to live. 

LAS should be accessible, flexible and scalable. LAS should meet owners’ requirements of freehold, accessibility, ease of payment, free transfer and inheritance. Hence, the aim of this paper is to propose a one-stop solution of LIServices that meet users’ requirements. A prototype system named Land Information System and Services (LISAS) is developed with QGIS®, Leaflet®, and web development tools with data collected from the Office of State Surveyor General (OSSG) of Lagos State. It is a Web-based system with interactive mapping functionalities to support owners’ requirement for accessibility and ease of use. The prototype is tested for various users’ requirements. LISAS is proposed as an efficient, technology-based, customer-oriented and scalable land administration system in Lagos State OSSG.

ARCHITECTURE OF LISAS

The architecture describes the structure and interactions of the proposed system to provide one-stop solution for different categories of users, with the future possibility of extending it to all property investors, regardless of their location at any point in time. The Central Service Centre (CSC) is the first point of contact and one-stop shop for all users or customers. The system is designed such that ad hoc and regular users outside the OSSG would be able to contact the CSC for information, services and products through the internet, telephone, and email. These channels of communication are also proposed for government ministries, departments and agencies (MDA) outside the OSSG. 

Users’ Requirements

Users’ knowledge and understanding of available technology plays important role in the expression of their desires for land information products and services. As users’ knowledge of available technology increases, land information service providers will be faced with the challenge of expanding their services. Thus, land administration systems should be built on an adaptable and scalable architecture. To improve LIService delivery in the study area, institutional and organizational changes that will strengthen relationships and accountability between policy makers, LIService provider and customers are recommended.

Ownership: Name of owner, Address of owner, Gender, Marital status, Occupation, Inheritance

Spatially related information: Large scale cadastral maps (scale greater than 1:5000), Location, Survey plan of individual parcel, Layout and master plans, Size of parcels 

Legal and administrative: Adjudication reports, Parcel subdivision reports, Surveyor General's approval, Land allocation announcement, C of O confirmation  

Economic aspects and use: Assessed value, Fees, such as ground rent, Mortgage status, Leases / Sublease, Current use of parcel

The users’ requirements are grouped in six layers discussed below, with large scale cadastral maps being the base layer. 

Maps

These are large scale cadastral maps and survey plans with identified coordinates on a geometric grid to define the parcel location in space. A base map covering the state is also required in the proposed system. An approved survey plan will be entered into the system with a unique numeric identifier and information such as the name of the registered surveyor, date of approval and registration status in the deeds registry. 

Ownership
Land use act (LUA) describes land owner as occupier. Thus, ownership refers to right of occupation (legal and just claim with respect to the LUA) rather that right of possession. Ownership information will contain information about the occupier. From the users’ requirements survey, such information would include: name, occupation, gender, and marital status.

Documents
These are written instrument of ownership or obligation in form of a deed, mortgage or lease. All documents entered into the system would be given a unique numeric identifier and classified appropriately. Examples of such information are: file number, grantor and grantee, lessor and lessee, mortgagor and mortgagee, date of approval of C. of O. date of registration, survey plan number, payment information, (e.g. receipt number) and other registration particulars. 

Valuation
This is an appraisal of the value of a parcel and developments on the parcel at a given point in time. The category of the parcel (urban or rural), zip code and the date of assessment are important information for valuation. The valuation is necessary for assignment, mortgage, transfer of possession, sublease, etc. The LUA prohibits the alienation of statutory right of occupancy without the consent of the State Governor.

Taxes
The taxes such as property tax, capital gain tax, and stamp duties are normally based on the assessed value of the parcel (including the developments – property). The information will include: tax code or tax key numbers, exemption status (e.g. state property may be exempted), assessed value, postal address for tax bill and deadlines for annual property tax.

Bills and payment
This is an inbuilt control mechanism to check and record payments. The unit responsible for bills and payment will develop pricing policies, fix prices. The Bills and Payment is proposed to record and check all records relating payments. It will confirm payments and cross-checks the information in the Taxes database.

Specifications
Specifications are descriptions of what LISAS will accomplish and how it will perform the functions. These are functional specifications for internal one-stop solution to facilitate ease of use of land and property-related information, as part of the infrastructure’s inbuilt functions for transparency, customers care and a step into the future. Components of the specifications are described below. 

1. Web-based system with interactive mapping functionalities. 
2.Electronic submission and registration of documents to permit applicants and stakeholders to submit documents digitally. 
3. Realization of electronic delivery of LIServices
4. Support storage and management of maps, documents, digital and attributes data.
5. Allow simultaneous use by many users.
6. Network information, unauthorized use, levels of access permission, ID and passwords (authentication of users).
7. Industry standards, nominal client support requirements and ease of maintenance.
8. Ease and transparency of use with functions that could be used by non-expert users
9. Scalable and extensible, and easy to handle or use.

Modelling Cadastral Features 

The basis of every land administration system is the relationship between parcels and persons (Molen and Lemmen, 2004). The relationship as represented in Figure 2.3 can be rights or restrictions. The person may be a natural or non-natural person is referred to as an occupier, because the LUA prohibits outright ownership. The term parcel refers to a tract or plot of land; it is typically used in the context of land use or legal ownership (ESRI, 2004a). 

Cadastre 2014 Model
In 1994, the International Federation of Surveyors (FIG) tasked its Commission 7 Working Group 1 to “develop a vision for a modern cadastre 20 years into the future” christened Cadastre 2014. The concept of land objects was introduced and formally defined in Cadastre 2014: 

“Cadastre 2014 is a methodically arranged public inventory of data concerning all legal land objects in a certain country or district, based on a survey of their boundaries. Such legal land objects are systematically identified by means of some separate designation. They are defined either by private or by public law. The outlines of the property, the identifier together with descriptive data, may show for each separate land object the nature, size, value and legal rights or restrictions associated with the land object. In addition to this descriptive information defining the land objects, Cadastre 2014 contains the official records of rights on the legal land objects.” (Kaufmann and Steudler, 1998)

The working group agreed to six statements on the development of cadastre in the next twenty years. Statement three declared that “the Cadastral mapping will be dead! Long live modelling!” They explained that map models will be made available in different scales, which will be represented by different models. In 2012, after many years of consulting and working together, experts developed a conceptual model for land administration that “will be agreed to” by all stakeholders all over the world, and so the Land Administration Domain Model (LADM) was published. LADM is an object model that describes standards for conceptual modelling of land administration systems (LAS). 

LISAS Data Model
Models give a simplified description of complex entities or processes as in land administration. The model is simplified and built on the users’ requirements to derive new information from input data.

The core of the model is the parcel. It shows parcel, feature and object relationship. Object does not mean ‘spatial object’, but it is used with the meaning of ‘a thing’ or ‘an entity’. Object is an abstract class that is normally written in italics. Ownership supports all features of Object. Ownership implies right in this study, that is a right of occupancy in accordance with the LUA. 

Parcel is the only geographic feature in the model. A parcel must have valuation and taxes, and valuation and taxes are attached to the parcel, hence the Parcel-Valuation relation and Parcel-Taxes relations are one-to-one (1…1). A parcel can be on many survey plans and many parcels could be shown on many survey plans; thus, the relationship is many-to-many (*…*). The relationships are identified by a primary key. In simple and clear terms, a primary key is an auto-incrementing number in an object-oriented database that uniquely identifies each record. It is essential for retrieving, updating, or deleting a specific record.

The data model for LISAS fits the needs of the users. It is expandable, flexible and not-restricted to a particular type of software. 

MATERIALS AND METHOD

Dataset

A major dataset used in the creation of LISAS is parcel boundaries for an estate layout in AutoCAD .dwg format, collected from OSSG, Lagos State.  The layout contains 471 parcels.  

Building the System

To processed the data, the estate layout was converted to ESRI .shp file in ArcMap and then converted to GeoJSON file in MapShaper. We named the file otedola_estate.json. In addition to the geometry types and coordinates, attributes in each record include ID, ParcelID, OccupierID, Area, Land_Use, TaxID etc.

The system development was carried out using the processed data and relevant technologies for web map application development. For this study, web technologies used include HTML, CSS JavaScript and leaflet, which is a popular open-source JavaScript library used to create mapping applications on the web. The database was provided by IndexedDB, which is an object-oriented database built within the browser. IndexedDB is a low-level API for client-side storage of large amount of structured data. IndexedDB requires creation of an object store for a type of data and persist JavaScript objects to that store. Each object store can have a collection of indexes that makes it efficient to query and iterate across. Since, it is a low-level system, IndexedDB requires helper libraries such as Dexie.js to make it easy to design and build applications.

Database Design

We used the principles of database design and apply them to IndexedDB with Dexie.js as explained here. 

First, we identified parcel as the fundamental unit of data in the project. Each feature in the otedola_estate.json file represents one parcel. In database terms, all these parcel objects will be stored together in one collection. In IndexedDB, this collection is called an Object Store. This is similar to a "table" in a relational database. 
Every record (each parcel) in the database needs a unique identifier, called a primary key. This key is essential for retrieving, updating, or deleting a specific record. We have a couple of options from our data: properties.ID (a number from 0 to 470) or properties.ParcelID (e.g., "LA/EST/2025/001"). While we could use ParcelID, the best practice for IndexedDB is to use an auto-incrementing number. This option guarantees uniqueness: the database manages it, so we never have to worry about duplicate IDs. Also, it is simple: we need not to provide an ID when adding a new record. In addition, number-based keys are typically the fastest for internal database operations.

Next, we decided what information to store for each parcel. IndexedDB is a NoSQL (object-based) database, which is a major advantage here. Unlike a traditional SQL database where one has to create separate columns for ParcelID, Area, Land_Use, etc., the entire GeoJSON Feature object is stored as a single record. This means each record in the parcel object will contain the type, geometry (with all coordinates), and properties (with all attributes) for that parcel. This keeps our data structure simple and consistent.

Now, we identified fields for fast searching. The application has two key features that require finding data quickly: Search Box: for searching for a specific ParcelID, and Filter Dropdown: for filtering parcels based on Land_Use. To make these operations fast, we need to create an index on these properties. An index is like an alphabetized list in the back of a book; it allows the database to instantly find records matching a value without having to read through every single record one by one.

Finally, we translate our design decisions into the Dexie.js schema syntax with following line of code:

db.version(1).stores({
    parcels: '++id, properties.ParcelID, properties.Land_Use'
});

Testing the System
This testing satisfies user needs by focusing on the results of the user requirements survey and analysis, and observation of processes and situation analysis. Implementation guidelines and conditions were provided to support the creation of an efficient and effective one-stop solution system. 

RESULTS 

LISAS opens with an authentication login system. The system ensures that only users with parcel identification number can register and access the system. A user is prompted to login or register. If a user has not registered, he will not be able to login. A new user is required to register with his full name, ParcelID and password. After a successful registration, the new user is prompted to login with the provided ParcelID and password. After a successful log in, a dashboard is created for the user. The dashboard contains the User Profile (Name and registered parcel) and Parcel Status (land use, area in square meters and survey plan number). The dashboard has options to Logout or Go to Main Map. 

LISAS Functionalities
The main map has the following functionalities:
A pop-up list that pops up each time a user clicks on a parcel. The list contains details about the parcel.

A search button to search for parcel. It requires a user to input correct ParcelID. It throws an error message if the ParcelID is not correct. If it is correct, the system zooms in to the parcel and highlight it with red shape outline. 

The remaining functionalities are for the administrator at the CSC who has privilege to edit and download the map and the attribute table. The functionalities include:
1. Filter by Land Use: a drop-down button which filters Land Use into Residential, Commercial and Industrial;
2. Export map to PDF, which exports the resulting parcel map in PDF format;
3. Export table to CSV, which exports the parcel attributes in CSV table format;
4. Save updated GeoJSON data, which updates the edited parcel; and 
5. Edit the attribute table, which edits the attributes table.
   
LISAS Performance indicators

Performance indicators are variables to measure the changes in a process and function. The processes are usually internal activities of an organization to permit certain functions. The users of a function will expect some benefits, which may be measured to give an indication of performance. Thus, the need to develop performance indicators for internal efficiency of an infrastructure and external performance in terms of meeting customers’ satisfaction. LISAS operational performance indicators include:
1. accessible to all customers;
2. openness and clarity of cost of products and services;
3. payment possibilities / payment methods available;
4. time-taken to fill request form;
5. CSC accessibility and contact; and
6. delivery time for all activities related to statutory right of occupancy, e.g. C. of O., enquiries, C. of O. confirmations, alienation consents, etc.

Satisfaction of the customers would be indicated by: 
1. value after delivery;
2. ease of alienation of right of occupancy by assignment, mortgage, transfer, sublease subdivision; and
3. low incidence of boundary disagreement between occupiers;

CONCLUSION

This study proposes the Land Information System and Services (LISAS), a web-based mapping system that provides one-stop solution to problems of LIServices in the Office of the State Surveyor General (OSSG) of Lagos State. A prototype system named Land Information System and Services (LISAS) was developed with QGIS®, Leaflet®, and web development tools with data collected from the Office of State Surveyor General (OSSG) of Lagos State. It is a Web-based system with interactive mapping functionalities to support owners’ requirement for accessibility and ease of use. As an internet-based web mapping system, LISAS is accessible to the public who has interests in land. With a genuine ParcelID, a user can register to the system and have access to land information by searching for any parcel of land with the ParcelID. Thus, LISAS solves the problem of lack of accessibility to land information. 
