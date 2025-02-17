/**
 PROJECT OVERVIEW: I will be building an exclusive clubhouse where members can write anonymous posts. Inside of the 
                   clubhouse, members can see who the author of the post is, but outside they can only see the story
                   and wonder who wrote it.
 PROJECT PURPOSE:  The will incorporate the lessons of authentication, databases, and SQL covered to combine into one project.
 PROJECT STEPS:    1)  Brainstorm around the database models that will be needed to accomplish this project. Requirements
                   include a fullname(first and last), username(email is fine for use), password and membership status.
                   Users need to be able to create message sthat have a title, a timestamp and some text. The database shoule
                   keep track of who created each message.
                   2)  Setup the database on PostgreSQL and generate or create the project skeleton, including the models
                   designed in Step 1.
                   3)  Will begin with a sign-up form to get the users into the database. Requirements include sanitization and validating the form fields, and securing the passwords with bcrypt. Also need to add a confirmPassword field to the sign-up form and thenn validate it using a custom validator.
                   4)  When users sign up, they should not be automatically given membership status. A page is required where members can "join the club" by entering a secret passcode. If the password is correct, then their membership status will need to be updated.
                   5)  Create a login-form using passport.js
 */
