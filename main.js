
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
*/