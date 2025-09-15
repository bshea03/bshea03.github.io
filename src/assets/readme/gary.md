# Gary

Gary the Gyarados is a Discord bot built for a private server. He is largely
experimental and is constantly evolving with new features I add in an attempt
to expand my Python knowledge.

As of right now, many of his features likely would not make sense in the context
of any other servers, though if you still would like to use any of them, feel
free to do so. Please, however, do not re-host Gary elsewhere before asking me.

---

## 📌 General Commands

- `%help [string (optional)]`  
  Displays the help menu. If an argument is provided, shows help for a specific category.  
  Valid arguments: `quotes`, `gameinfo`, `sprites`, `imgur`, `last.fm`.

- `%userinfo [user (optional)]`  
  Displays information on the given user, or the command caller if none is provided.

- `%echo [string]`  
  Repeats the text inputted by the user.

- `%bigtext [string]`  
  Repeats the inputted string in large text.

- `%vote`  
  Initiates a vote using 👍, 👎, and 🤔 reactions.

- `%roll [# sides (optional)]`  
  Rolls a random number (default is 6-sided).

- `%flip`  
  Returns _Heads_ or _Tails_.

- `%oracle`  
  Magic 8-Ball response.

- `%ud [word or phrase (optional)]`  
  Returns an Urban Dictionary definition. If no word is supplied, fetches a random one.

## 🎵 Last.fm/Spotify Commands

- `%artist [artist name]` — Displays information about the artist.
- `%top_albums [artist name]` — Top five albums by the artist.
- `%top_tracks [artist name]` — Top five tracks by the artist.
- `%album [album name] - [artist name]` — Album info and tracklist.
- `%track [track name] - [artist name]` — Playable Spotify link to the track.

## 🎮 Game Info Commands

- `%gameinfo` — Displays all stored account names / friend codes of the user.
- `%get [platform]` — Shows the user’s info for the given platform.
- `%set [platform] [arg]` — Adds new info for the user on the given platform.

**Valid Platforms:** `psn`, `xblive`, `steam`, `switch`, `3ds`

> ⚠️ Nintendo Switch and 3DS codes must follow the format: `XXXX-XXXX-XXXX`

## 🖼️ Imgur Commands

- `%baned` — Random "baned" image.
- `%location` or `%loc` — Location card from Pokémon FR/LG.
- `%charizard` or `%zard` — Random Charizard image.
- `%gliscor` or `%glisc`, `%scor` — Random Gliscor image.
- `%escavalier` or `%esca` — Random Escavalier image.
- `%serperior` or `%serp`, `%snek` — Random Serperior image.

> 💡 To have an Imgur album added, contact the bot maintainer.

## 💬 Quote Commands

- `%quote [id (optional)]` — Displays a specific quote, or a random one if no ID is given.
- `%add [user] [quote]` — _(Admin only)_ Add a new quote.
- `%delete [id]` — _(Admin only)_ Delete a quote by ID.
- `%ids` — Sends the user a DM with all quotes + IDs.
- `%quotes [user]` — Displays all quotes by the given user.

## 🕹️ Sprite Commands

- `%pmd [pokedex #]` — Displays the PMD icon of the Pokémon.
- `%[pokemon game] [pokemon]` — Shows the Pokémon’s sprite from the specified game.  
  **Valid games:** `rb`, `yellow`, `gold`, `silver`, `crystal`, `rse`, `frlg`, `dppt`, `hgss`, `bw`, `xy`, `sm`.

- `%[user]` — Displays the Pokémon associated with that user.

> 💡 If you’d like a custom Pokémon linked to your username, contact the bot maintainer.
