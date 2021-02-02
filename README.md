# Jamming App

Jamming app availible at [vibetribe.surge.sh](http://vibetribe.surge.sh/) built in React.

## Building Process

1. Created a new React project (create-react-app).

2. Planned the project to include a user, playlist, and search results. Created redux stores to match accordingly. 

3. Built UI with responsive mobile design.

4. Implemented searching functionality through the Spotify's search API.

5. Used CSS grid to display individual tracks.

6. I wanted the album cover to look as if it were a record spinning when you played the track preview.

7. One issue was that the track previews were playing over eachother if the user clicked multiple play buttons one after another, so I had to implement a way to control having only one snippet play at a time. This ended up being the most challending part of the project.

8. Next, the objective was to give the user the ability to save their playlist to their spotify account.

9. I wanted to add a way to upload an existing playlist that the user had already created. This, again, was done through the Spotify API and was extended to the user through an account tab to access account and playlists information.

10. Users can now create and save a completely new playlist or load in an existing playlist, modify it, and save it to listen on their spotify app in seconds.
