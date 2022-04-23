# favs-app
# DOCUMENTATION 
To create a new user u have to use the route `api/users/signup`
If u already have an user u can sign in using the route `api/users/signin`
To create a list of favs u need to be login and then use the route `api/favslists/create`
**this list is gonna be create in the signed user**
To add some favs to any list u only need to send the list's id that u want to add the fav, 
so u have to use the route `api/favs/create` 

don't forget run the server using the script `npm run dev!`