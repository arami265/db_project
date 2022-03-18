# db-project
This project is for a graduate level computer science project, in which we were tasked with creating a 'Home Services' website utilizing a relational database backend hosted on AWS Relational Database Service (RDS).

This project was overall a group effort. However, I am responsible for all code in this repository as the other group members took charge on the general relational database schema design, and collaborated with me on the frontend design and testing various queries and use cases.

<br>

## Web stack / design choices
With the main project requirement being the use of a relational database hosted on Amazon RDS, I made the following design choices in order to leverage the power of modern (at the time) web development libraries:

- Node JS, to leverage packages for powerful features with great customization and scaffolding
- Express, for scalable and dynamic routing between pages on the site
- Express Session, for utilizing cookies in verifying logged in users
- Object formatted data, for maximum compatibility with Node JS packages and more readable code
    - Sequelize package used for Object Relational Mapping (ORM), to seamlessly map our object-formatted data to SQL queries for creating, reading, updating, and deleting (CRUD) in both directions
    - This approach was taken to satisfy the relational database project requirements while utilizing Node JS with clean code
- Handlebars templating library, for flexible rendering of web pages under different conditions (user logged in or not, 0 or more items in lists, pagination, etc)
- Passport security library, for real-world authentication and authorization
- Crypto security library, for real-world salting and hashing of private user data for secure transmission and storage
- Bootstrap CSS, for styling and relative ease of implementation

The initial Heroku deployment and any local builds are not currently supported due to the AWS RDS server being shut down. However, you can create your own `config/keys.js` file and expose an `amazonURI` and `amazonPass` in order to test for yourself.

If I were to create such a project today, I would create more secure environment variables, and take the Angular approach in order to have multiple features such as templating and routing built into one framework.

<br>

## Examples
Below are some screenshots showing some features of the site:

![Screenshot 1](/docs/img/landing.png)

![Screenshot 2](/docs/img/new_profile.png)

![Screenshot 3](/docs/img/service_detail.png)

Here you can see a snippet from the database backend, showing that only the obfuscated credentials are transmitted and stored:

![Screenshot 4](/docs/img/hash.png)