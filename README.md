# ordering-system

##Hungry Hacker Challenge

This weekend there will be a giant food festival in Pioneer Square, and your culinary friend (Master Chef Emeril) would like to cash in. The problem is he's lacking the tech to take orders and doesn't have the time to find a solution.

That's where you come in! As an engineer and entrepreneur at heart, you offer to create him an ordering system for a mere 20% of the profits.

He says it's a deal! Game on!

##Time is Money
 
The more time you spend on the project, the more unsavory the deal with Emeril becomes. Of course you _could_ spend as much time as you want on the project, but, for your own benefit, you decide that this project should take:

**Approximately 2 Hours**

##Github Portfolio

You consider that after building the make-shift ordering system for Emeril, the code that you produce would be a nice addition to your already _awesome_ Github portfolio.

##Software Development Tools

You have so many programming tools that it's hard to keep track of them all. Off the top of your head, you consider the following:

###Required

- [node and npm](https://nodejs.org/en/) (runtime environment + package manager)
- [mongodb](https://www.mongodb.org/downloads#production) (database server)

###Optional

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (version control + Windows cURL)
- [sublime](https://www.sublimetext.com/), [atom](https://atom.io/), [webstorm](https://www.jetbrains.com/webstorm/) (editors)
- [json formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) (JSON formatter in browser)
- [curl](https://curl.haxx.se/download.html) (HTTP request tests for Mac/Linux)
- [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) (HTTP request tests in browser)
- [mongobooster](http://mongobooster.com/downloads) (MongoDB client)

##Bootstrapping

As a resourceful engineer, you have a few tricks up your sleeve. You find a [Node Todo App](https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular) that can be used as the foundation for Emeril's ordering app.

###Install with Remote MongoDB

Yay! The tutorial seems to have a [github page](https://github.com/scotch-io/node-todo) which provides instructions to quickly install some code .

1. Clone the repository, `git clone git@github.com:scotch-io/node-todo`
2. Install the application, `npm install`
3. Start the server, `node server.js`
4. View in browser at, `http://localhost:8080`

Eureka! It works! I think I will ask Emeril for a raise...

###Install with Local MongoDB

Oops! Better use my own database instead of a stranger's database... That would have been awkward...

1. Open `/node-todo/config/database.js`
2. Delete line 2, `remoteUrl :...`
3. Shutdown the server by closing the terminal/process
4. Start the server, `node server.js`
5. View in browser at, `http://localhost:8080`

###API Documentation

After enjoying instant success, you take a quick peak at the [docs](https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular) and find the API descriptions.

| HTTP Verb     | URL                  | Description          |
| ------------- | -------------------- | -------------------- |
| GET           | /api/todos           | Get all of the todos |
| POST          | /api/todos           | Create a single todo |
| DELETE        | /api/todos/:todo_id  | Delete a single todo |

###Optional API Testing

By using the web browser to `GET`, `POST`, and `DELETE` Todos, you know that you have successfully tested all the APIs. 

As you interact with the website, to gain a deeper understanding of what the website is doing, you:
 
1. Open Google Chrome's developer console, switch to the network tab, and watch HTTP requests being made
2. Click on specific HTTP requests and copy them as cURL commands
3. Open the meanstacktutorials database on your local computer (e.g. in MongoBooster) and look at the data

####POST Todo Example

```sh
curl 'http://localhost:8080/api/todos' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' --data-binary '{"text":"Todo1"}' --compressed
curl 'http://localhost:8080/api/todos' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' --data-binary '{"text":"Todo2"}' --compressed
curl 'http://localhost:8080/api/todos' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' --data-binary '{"text":"Todo3"}' --compressed
```

####GET Todo Example

```sh
curl 'http://localhost:8080/api/todos' -H 'Accept: application/json, text/plain, */*' -H 'Cache-Control: max-age=0' --compressed
```

####DELETE Todo Example

```sh
curl 'http://localhost:8080/api/todos/56eab17afa87fa434d982886' -X DELETE -H 'Accept: application/json, text/plain, */*' --compressed
curl 'http://localhost:8080/api/todos/56eab17afa87fa434d982887' -X DELETE -H 'Accept: application/json, text/plain, */*' --compressed
```

####MongoDB Todo Record Example

```js
// colleciton: todos
{
    "_id" : ObjectId("56eab719fa87fa434d982888"),
    "text" : "Todo3",
    "__v" : 0
}
```

##Challenge

Wow! Who knew that bootstrapping code could be so challenging?! Luckily, after spending 15 to 30 minutes installing everything, you feel like you have almost wrapped this project up. Emeril is going to be impressed!

However, you are a busy person and may not get to finish everything you started, so you decide it is time to prioritize.

###First Phase -- Runtime Environment

Getting a working Node app almost qualifies as a milestone. However, you, of course, must make sure there is no more references to `todo` in your code. Instead, `food` will replace `todo`. This way Emeril will never have to know your sly but efficient programming tricks.

| HTTP Verb     | URL                  | Description                            |
| ------------- | -------------------- | -------------------------------------- |
| GET           | /api/food            | Get all of the food items in the order |
| POST          | /api/food            | Create a single food item              |
| DELETE        | /api/food/:food_id   | Delete a single food item              |

###Second Phase -- Database

While `todo` items only store a _description_, `food` items need to store a _food name_ and a _price_.

###Third Phase -- Order Total API

Since your `food` items now have price, you can help Emeril by creating an API to calculate the order cost. When `api/total` is called, the following processes should occur:

1. All food items are retrieved from the database
2. The prices should be summed to a subtotal (in the Node server code)
3. 7.5% tax should be applied to the subtotal to produce total (also in the Node server code)
4. `api/total` will finally respond to the HTTP request with the total price of all the food items in the database

| HTTP Verb     | URL                  | Description                                         |
| ------------- | -------------------- | --------------------------------------------------- |
| GET           | /api/food            | Get all of the food items in the order              |
| POST          | /api/food            | Create a single food item                           |
| DELETE        | /api/food/:food_id   | Delete a single food item                           |
| GET           | /api/total           | Total the price of all food items (use 7.5% for tax)|

###Fourth Phase -- User Interface

localhost:8080 will be an Angular.js web application with an interface that can interact with all available APIs. The interface can be very basic as long as it is functional.

###Bonus Phase

This is an intentionally ambiguous phase open for creativity and/or style. Add your own flair to the project. This phase can only help your score and will mainly be used to learn about your coding preferences. _Don't spend too much time on it!_

If you choose to do this phase, create a description of what you chose to do and why you chose to do it. Add the description to a text document in the root directory of your project. Name the text document `bonus.txt`.

##Submission

1. **bonus.txt:** If you chose to complete the Bonus Phase, your git repository directory should include `bonus.txt` at the root of the project directory.
2. **Github:** Upload the repository that you downloaded and worked on (i.e. originally named `node-todo`) to _your_ Github. 
3. **Github Link:** E-mail your repository (i.e. your Github link) to your point of contact, and then you are done.

**Kudos, and Happy Coding!**
