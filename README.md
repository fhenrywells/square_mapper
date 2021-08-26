# Square Mapper


![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/44304380/130883209-029f6e95-c54a-4a8b-a522-9e381cb9aa0e.gif)



This project uses a react Frontend, Python backend, and MongoDB database to visualize an arbitrary amount of squares to be plotted on the U.S. An existing square's location
can be updated, with an additional list enumerating the ids of created squares. These squares can also be deleted using the delete form.

# Installation

Before running the backend, you must make sure to have the requirements installed in your virtual enviroment, though one has been provided for convenience. 
You must also make sure that the requirements for mongo DB are installed for your system. If you have brew installed, this can be done by running

```
brew tap mongodb/brew
brew install mongodb-community
```

# Running

This project can be run in two terminals, using the `run.sh` script at the top level to run the server backend and `npm start` at the root of the client folder.

If you would like the database contents to be preserved across multiple backend runs, you can pass `True` to the run script, as this is the only configurable part of the backend.


