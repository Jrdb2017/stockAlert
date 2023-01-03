To run code you will need to install node and npm.

The steps below are if you want to setup an email, but I believe it should just error out in the console. I'm saving the data that would be sent to a file anyway

Here's a link to how I setup email for this project https://www.labnol.org/google-api-service-account-220405
in your console you will have to  run "node auth" on a path like stockalert\middleware\emailService\
you will get a link where you will need to authenticate with your email
then you will get a code in your url bar that you will need to add to token.js
then run "node token" on a path like stockalert\middleware\emailService\
should be good to go at this point but lmk if you need any help or have questions