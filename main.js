/* Unpacking The Data: */

const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    let xhr = new XMLHttpRequest();


    xhr.open("GET", baseURL + type + "/");
    xhr.send();



    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function writeToDocument(type) {
    let el = document.getElementById("data");
    el.innerHTML = ""; /* each time the button is clicked it resets the innerHTML to an empty string and clears it each time rather than constantly appending onto the end and creating one big list */
    getData(type, function(data) {
        data = data.results;

        data.forEach(function(item) {     //so for each element in data we will run this function:
            el.innerHTML += "<p>" + item.name + "</p>";         /*item.name will display the name. '+=' appends each new name rather than overwriting it each time. putting it all in a paragraph then displays it better. */
        });
    });
}

/* films still not working because it doesn't have a name property 

In our last video, we started getting data printed on the screen.
Let's start unpacking it.
It's all stored in one big object, and we're going to have an array of objects for different people.
And each of those are going to be objects as well.
So we have a little bit of work to do when unpacking this data.
The first thing we need to do, then, is determine how to access it.
So this time, we're going to use a "console.dir".
"dir" stands for directory.
We're going to parse in our data.

function writeToDocument(type) {
    getData(type, function(data) {
        console.dir(data);
        document.getElementById("data").innerHTML = data;
    });
}
And this will allow us now to browse through the object and to see its format.
It's going to print it out and show the properties.
So we can see there that we have an array called "results".
And this contains an array of 10 items.
10 items, 10 different people in the arrangement from Luke Skywalker down to Obi-Wan Kenobi at the end.
We also have a URL called "next".
That's for pagination, so we just show 10 items at a time. When we click on the "next" button, it will show us the next 10 items, and so on and so forth.
So if we want to display this, then what we need to do is set our innerHTML to "data.results".
Okay, now if I refresh my page and click on people, I now have 10 objects being rendered.
So again, they're objects. It's doing what we expect, but they still need to be unpacked a bit further.
So what we're going to do instead of using "data.results" here is we're going to overwrite our existing data variable with "data.results".
It just makes our life a little bit easier.
Just take out the "console.dir". We don't need that. So we do "data = data.results".
Okay, so now that we have that, what we can do is a for each loop.
I'm going to say "data.forEach", so for each element in data.
It's going to run this function.
It's going to take the item.
And then I'm just going to take the same code that we used before.
So I'll just cut and paste the code that we have on line 23 here.
Paste that in.
And instead of "data.results", I'm going to say "item".
So let's run that again.
And now I'm getting an object again. This time, we're getting one individual object as opposed to 10.
This means that our for each loop is working; not quite correctly at the moment, but we'll address that in a minute.
So what we want to do is display the name.
Now that we have this unpacked into JSON format, we can just do "item.name".
Let's try that.
And we can see we have Obi-Wan Kenobi.
Now that's an issue because we know that the first person in the list is actually Luke Skywalker.
We've already seen that in the documentation and in the list that we looked at in the console.
But for the time-being, this is working. I can click on the other buttons. They all work, apart from films.
The reason is because films doesn't actually have a property called "name", but we'll address this in our next video.
So we can see then that the reason why only one item has been displayed is because every time I call the "document.getElementByID" innerHTML method, it's overwriting it.
I need to do a "+=".
So let's try that.
There we have it.
I now have all of the people displayed.
Now we could improve how that looks if I put in <p> tags surrounding the item name.
So we'll do an opening <p>, +, and then +, and a closing <p> here.
So if I do a refresh, click it, and that looks much better.
But as I click on the other buttons, you can see that all of the information has just been appended on to the page every time.
And with films, when we click on that, we have a lot of undefined objects here at the end.
So this is not what we want.
We want to just display 10 items at a time for clarity.
And we don't want it all mixed together like that.
So what we're going to do, then, is I'm going to create a variable called "el", short for element.
And I'm going to store our data ID in there.
So "var el = document.getElementByID("data"), just like we're doing below.
And then every time the button is clicked, I'm going to set the innerHTML of our element to an empty string.
So that will clear it every time the button is clicked.
I can just use "el" down here now as well.
Okay, so let's try that.
Much better.
That's displaying exactly as we'd like.
So we're having 10 items displayed at a time.
The films aren't working yet. we've explained why that is- because there isn't a name property for films.
But in our next video, we'll get films working as well.





/* Write to document/html:
type is the type that comes from the API, in this case could be people, films, vehicles or species.

const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    let xhr = new XMLHttpRequest();


    xhr.open("GET", baseURL + type + "/");
    xhr.send();



    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function writeToDocument(type) {
    getData(type, function(data) {
        document.getElementById("data").innerHTML = data;
    });
}

/*
In this unit, we're going to bring all of this back into the context of our HTML website.
We have our data printing to the console. Now what we need to do is render it to the document.
So I'm going to remove my call to getData and create a new function here called "writeToDocument".
And this is going to take one parameter called "type".
And when I say "type", I mean the type that comes from the API.
So that would be a film, people, starships, vehicles, species, so on.
So what I'm going to do now is to call our getData function.
And we need to modify that function slightly in a minute because we also want that to take in the type parameter.
So I'm going to call getData.
I'm going to parse in the type parameter.
And then the second argument is going to be our function.
And rather than calling an external function, I'm going to writean anonymous one this time that uses "document.getElementByID".
Remember, we did this before.
It's going to get the div which has the ID of data.
And it's going to set the innerhtml to the data that gets parsed into this function, which means I actually need to put it in here as well.
So now we can modify our getData function and parse in a type.
Now the first thing that I want to do as well is take out our base URL here and move it outside the function.
I'm going to create a constant and call that "baseURL" so that never changes.
And then I will assign the string that we have for that that we've been using so far.
And now inside our open method, instead of the string, what we can actually do is parse in "baseURL + type"
And this will append the base URL with the type that we're parsing in, so that could be people, films, vehicles, or species.
Okay, let's go back to our index.html.
And I'm going to create some buttons.
Now. there's going to be no styling for this. It's just purely a demonstration.
So I'm going to create some simple buttons for people, planets, species, starships, vehicles, films.
And each of these buttons will have an "onclick" event.
The "onclick" event is going to invoke the "writeToDocument" function that we just created.
And then we'll parse in a string which is pertinent to the relevant type.
So for this one, we'll say people first.
And I'll put "People" as the text that will appear on my button.
The second one will be planets.
So onclick = "writeToDocument".
And we'll send in 'planets' as our argument.
Then again, put "Planets" as the text that will appear on our button.
The next one will be species.
And we'll just jump ahead to when these are completed.
So just change that to films, and we are complete.
Very good.
So back in our JavaScript file, we do need to have a trailing "/" as well after the type, so we'll just put that on.
And once we're ready, we can run this code, and I need to run it from my index.html file.
Here are our buttons.
I just click on that.
Nothing happens, so let's inspect.
So I have a semicolon there where I shouldn't have. Let's just go back and correct that.
Yep, there on line 17 in the argument. Let's take that out.
We'll refresh our page.
And now we have adjacent object printing to the screen, which is great. That's exactly what we would want.
Of course, that data isn't terribly useful to us just yet because all it's telling us is that we have an object.
In our next video, we'll look at how to unpack the data from this object.



/* Print To Console

function getData(cb) {
    let xhr = new XMLHttpRequest();


    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
    xhr.send();



    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);

/*
What we could also do instead of actually writing the function inside the brackets for getData, is we could write a separate function.
So I'm going to create a new function called "printDataToConsole".
Again, that's going to take in "data" as an argument.
And as before, that's going to console.log the data.
Now inside the brackets, when I'm calling my getData function, I'm going to pass in the "printDataToConsole" function as an argument.
And notice I don't put the opening and closing brackets because I'm parsing in the actual function itself.
Okay, let's try that.
And on line 15, I have a colon instead of a semicolon. Let's just remove that.
Run it.
And there's our data once again.
So as you can see, callback functions are very useful.
They get around the problem of having to use timeouts.
They still allow us full control over our data because they're only invoked when we actually want them to be.
So in this unit, we've looked at how to speak to our API using JavaScript.
We've seen how to get our response text back as a string and how to turn it into JSON format.
We've looked at different readyStates and HTTP status codes.
And finally, we've seen how to use both timeouts and callback functions to get our data displaying when we want it to.


/* Callback Function 1:
function getData(cb) {
    let xhr = new XMLHttpRequest();


    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
    xhr.send();



    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

getData(function(data) {
    console.log(data);
});

So what is a callback function?
A good thing to remember in JavaScript is that everything is made of objects.
And a function is also an object.
Because of this, it can be passed as a parameter, or argument, to another function.
And at its simplest, that's what a callback is: a function that's passed as a parameter to another function and executed inside that function.
Callbacks are used a lot in JavaScript, especially in jQuery, which we'll come onto later.
You've already seen examples of callback functions, too, when we were learning Jasmine.
And we're going to write a callback function that will be called when our data variable contains response text.
But why not just use timeouts like we did in our last video?
Well, one of the problems with having to set timeouts in our code is that we'd have to tell our system to wait every time we wanted something to happen.
And it could take different amounts of time depending on different circumstances, such as network speed.
So let's take a look at a way we can get around that using a callback.
So I'm going to take away my data variable, and, instead, I'm going to create a new function called "getData".
Then I'm going to move all of the code that we use for our xhr request into that function.
So I'll highlight it and then press ctrl+shift+B, or command+shift+B on the Mac, just to beautify our code and get the indents right.
We can take out the "setTimeout" function here now too because we don't need it anymore.
So I'm going to use the parameter here, the argument, of "cb".
"cb" standing for callback, and this will be the function that we pass in.
When I then use cb on line 9 here, that's going to actually run the function that we pass in as a callback.
So for this to work, we need to invoke a getData method with a function.
So let me write one here inside the parentheses. This is an anonymous function.
And it's just going to say "console.log(data).
So I also need to pass data in as a parameter inside the braces here.
So when this runs, what it will do is pass itself in as a function.
That function will be executed here with this as the data argument.
So let's save this code now.
And I'm just going to run it, and we'll see what happens.
So as we can see, the data has been logged to the console, which is exactly what we would expect.
Now the reason we don't need to set a timeout here is because we are explicitly invoking our getData function.
We're checking to see if our readyState is 4 and the status is equal to 200.
And at that stage, we're then invoking our callback function that we passed through as an argument.
So what this basically means is that when our script gets to this point, it's going to run the function that we passed in to getData as an argument.
And this just gives us more control within our code base.



/* Timeout:
let xhr = new XMLHttpRequest();
let data;

xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
xhr.send();



xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
    };
}

setTimeout(function() {
    console.log(data);;
}, 500);

/*
We're going to have a look at the setTimeout function to make our code work.
But first, let's have a look at what's actually happening inside our onreadystatechange() function.
What I'm going to do is put another "console.log".
And inside the brackets, type "this.readyState".
And this will print out the ready state every time the function is invoked.
As we said, this function gets called more than once, so we should see more than one log to the console.
And this will happen every single time the function is called, not just when the readyState is equal to 4 and the status is equal to 200.
So let's refresh that.
And we can see there that we have a very interesting output.
Undefined is where we called our console.log(data).
But as we can see, that's getting called long before we have a readyState of 4, which means that the data isn't actually set until long after we've done our console.log down on line 18.
So what we could do is use a setTimeout function.
The setTimeout function takes two parameters.
The first is a callback function.
So we can actually write a function in here as our first argument.
And what we're just going to do is say "console.log(data)".
And the second argument is a parameter in milliseconds, the time in milliseconds that we want our program to wait for.
So what we'll do is give it a timeout of 500 milliseconds.
That should be plenty of time to allow our function to do its thing.
And as we can see there now, console.log is actually printing our data.
And that's because we're telling the console.log to wait, to hold off from being executed for 500 milliseconds.
This gives our "onreadystatechange" function plenty of time to reach a ready state of 4.
Now what that means really is that we can actually remove our setData function.
And we can go back to the previous code that we had here, which was "data = JSON.parse(this.responseText)".
I will also just remove that first console.log because we don't need that anymore.
We've seen what's happening. Just tidy up a little bit.
So now you can see that our data is actually being displayed after we set the timeout.
And that's how we can get our code to wait on execution.
In our next video, we're going to have a look at how we can make our own callback functions, which is another way around this problem that we're having.


/*

let xhr = new XMLHttpRequest();
let data;

xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
xhr.send();

function setData(jsonData) {
    data = jsonData;
}

xhr.onreadystatechange = function() {
    console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText));
    };
}

console.log(data);




/*
let xhr = new XMLHttpRequest();
let data;

xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
xhr.send();

function setData(jsonData) {
    data = jsonData;
}

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText));
    };
}

console.log(data);

/* The very first thing that we do on line 1 is to create a new instance of the XMLHttpRequest object.
Then we have the xhr.open() method, and the first argument that we parse in is "GET".
Since in this instance we want to retrieve data from the Star Wars API, then we're going to use the GET method.
The second argument is the URL that we want to retrieve.
We're making a request to the Star Wars API.
And then we do xhr.send() to send the request.

The main chunk of what's going on in this piece of code is in this onreadystatechange() function.
The xhr object maintains an internal state as it's completing various parts of our request operation.
And "readyState = 4" means that the operation has been completed.
Then we're looking at an HTTP status code.
The HTTP status code of 200 means "OK".
So the HTTP status code of 200 means "request succeeded, content delivered'.
That's what we're checking for in our function here.
So once everything is okay, we then use some JavaScript to getElementById() from the DOM and change its innerHTML to the response text that comes back from our xhr object.
 ------------------------------------------------------------------------------
let xhr = new XMLHttpRequest();

/*This XMLHttpRequest object is an inbuilt object that JavaScript provides to allow us to consume APIs and gives us the method to open connections, to send connections, and close them.*/
/*Now we want to create a new function: xhr.onreadystatechange().
And whenever the state changes of our xhr object, we want to run a check.
If the ready state is equal to 4 and the status is 200, then what we want to do is use JavaScript to do document.getElementByID() and retrieve our data div.
And then we're going to change the innerHTML to be equal to the response text that comes back from our xhr object.
*/

/*
xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
};

Now that we have this listener waiting to see for xhr's state to change, I need to open a connection.
So I do xhr.open().
I parse in the GET() method, which is what we want to use.
And then I parse in the URL, which in this case is "http://www.swapi.co/api/".


xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");

And now I use xhr.send().
So when the state changes, we'll check to see if the ready state is 4. We'll discuss what these states and statuses mean in the next video.
But basically, we can say that it means that if everything went well, then we're going to get a div ID of "data", and put the response text in it.


xhr.send();

Let's go back to our index.html and run it.
When we do, we can see that we have this JSON object that's been put inside our div.
So that's working as we expected.

Why doesn't our "console.log(data)" work?
Well there's a very good reason for this which is that the "onreadystatechange" function only sets the data variable to contain the response text when the ready state equals 4 and the status equals 200.
Our function has been called five times by the time that our data variable is set, whereas our "console.log" is only ever called once.
And that will be right after we've run "xhr.send".
So this means that when we run "console.log(data)", it doesn't have anything in there yet.
Data is not set until after "console.log" has been called, which is why we're getting a response of undefined.
Now if I were to move my "console.log" data into line 10, just after where we set the variable, then it works fine.
Let's just go and confirm that.
Refresh our page and, as we can see, we have our response text.
The problem with this is it means that all of the work we need to do with data would have to be done inside the "xhr.onreadystatechange" function, which could make things really messy and complicated because all of the code for our application could potentially end up inside this function.
So how do we get the data out of here?
Well one thing that we could do is create a separate function.
And we can parse our data to that function.
So I'm just going to delete my "console.log" here.
And then I'm going to create a new function, which is called "setData".
I use my parentheses here and open a curly brace.
And then I'll say that "data =".
We'll call it JSON data, so I need to actually parse that into the function.
So "jsonData".
And that's the name of the variable that I will pass in to the parentheses of the function here.
So now then what I just need to do is call my function "setData".
And I need to put "JSON.parse" and then "this.responseText" inside the brackets for "JSON.parse".
So I'll just put that in there.
So this will be sending through a JSON parsed object into our setData function.
Now if I "console.log" my data, put a semicolon, save the file, and refresh the page, then now we can see that we get our JSON object, which we can expand just as we did before.
This is also called deserializing our JSON.
But we have the same problem.
If I move "console.log(data)" to the bottom of the file, it goes back to being undefined again.
So that means that everything for our function could now end up in the setData function.
We've just moved the problem away by one step.
JavaScript has a number of ways of dealing with this: timeouts and callbacks.
In our next video, we'll have a look at how a timeout works.
*/