Before running 

    nodemon index.js

to start the server in VS Code please 

    1) Create the .env File

    it should contain

        port = 456  // 456 should be the port that you use in development

        dbconfig = {"connectionLimit": 10,"user": "root","password": "your passsword for root","host": "localhost","database": "database name that you use"}

    2) Install all the dependencies in the package-lock.json file using the command

        npm install

After the server successfully starts

Use the following endpoints to interact with the server



......................Authentication End points

login POST > localhost:3000/auth/login?username=meelan&password=pass

            * Please note that after login user gets invalidated after 500 minutes

logout DELETE > localhost:3000/api/logout

change passsword POST > localhost:3000/api/changepass?username=meelan&currpassword=pass&newpassword=pass

signup POST > localhost:3000/auth/signup?username=meelan&password=pass&type=admin

            Here type can be      a) admin   or   b)regular


......................User Action containing End points 

