# Celebi Discord Bot

Celebi is a Pokémon-themed Discord bot featuring minigames, achievements, and server utilities. This document details all available commands and the rules for each built-in minigame.

---

## Table of Contents

- [General Commands](#general-commands)
- [Minigames](#minigames)
  - [Milcery Marbles](#milcery-marbles)
  - [Tiny or Heavy](#tiny-or-heavy)
  - [Tall or Short](#tall-or-short)
- [Book & Library Features](#book--library-features)
- [Admin Commands](#admin-commands)
- [Achievements](#achievements)
- [Notes](#notes)
- [Credits](#credits)

---

## General Commands

- **`c.say <channel_id> <message>`** — Send a message to a specified channel (mods only).
- **`c.edit <msg_id> <new_content>`** — Edit a message in a specified channel (mods only).
- **`c.romiswrong`**, **`c.wrong`**, **`c.ebi`**, **`c.seedot`** — Send themed gifs/images.
- **`c.ping`** — Check Celebi's latency.
- **`c.help`**, **`c.info`** — Show help, bot info, and invite link.
- **`c.avatar [@user]`** — Show a user's avatar.
- **`c.prefix [new_prefix]`** — Show or set the bot prefix (mods only).

---

## Minigames

### Milcery Marbles

In Milcery Marbles, you roll five marbles (each valued from 1–6) per round and must keep at least one marble with each roll, up to three rolls total. To record a valid score you’re required to secure one heart (1) and one star (3); your final score is then the sum of any additional marbles you’ve kept, excluding those two mandatory ones, while failing to keep either automatically yields a zero. Special sets—such as rolling all 2s, 4s, 5s, or 6s—can unlock bonus achievements, and in War mode play is restricted to members of your current team (or moderators) with scores tracked on a dedicated leaderboard.

**Commands:**

- **`c.mm start`**, **`c.mm war`** — Start normal or war games (in DMs).
- **`c.mm leaderboard`**, **`c.mm war leaderboard`** — View leaderboards.
- **`c.mm stats`**, **`c.mm medals`**, **`c.mm streaks`** — View personal stats.
- **`c.mm help`** — Show help and rules.

**Rules:**

- Roll 5 marbles (values 1–6) per round.
- Keep at least one marble per roll; up to 3 rolls total.
- Must keep one 1 (heart) and one 3 (star) to qualify.
- Score = sum of kept marbles, excluding first 1 and 3.
- Missing either = score of 0.
- Special sets (e.g., all 2s) may grant achievements.
- War mode is team-restricted and leaderboard-tracked.

**Strategy Tips:**

- Secure a 1 and 3 early.
- Prioritize high numbers after qualifying.
- Watch for bonus sets.

---

### Tiny or Heavy

In Tiny or Heavy, you’re shown a Pokémon’s weight and must guess whether the next Pokémon will be lighter or heavier by reacting with the appropriate emoji. Each correct reaction extends your streak, while a single wrong answer ends it. In Hard mode, obscure Pokémon and tighter weight differences ramp up the challenge for seasoned players.

**Commands:**

- **`c.toh`**, **`c.toh hard`** — Start normal or hard mode.
- **`c.toh stats`**, **`c.toh medals`**, **`c.toh streaks`** — View personal stats.
- **`c.toh leaderboard`** — View top scorers.
- **`c.toh help`** — Show help and rules.

**Rules:**

- Guess if the next Pokémon is lighter or heavier.
- React with emoji to answer.
- Correct = streak continues; incorrect = streak ends.
- Hard mode uses obscure Pokémon and closer weights.

**Strategy Tips:**

- Learn Pokémon weights.
- Be cautious in hard mode—differences are subtle.

---

### Tall or Short

Tall or Short works effectively the same as Tiny or Heavy, the only difference being that instead of guessing whether the next Pokémon is heavier or lighter, you're guessing whether the next Pokémon is taller or shorter.

**Commands:**

- **`c.tos`** — Start a game (may alias **`c.toh`** during events).
- **`c.tos leaderboard`** — View leaderboard.
- **`c.tos help`** — Show help and rules.

---

## Book & Library Features

Celebi features a library of books that can be accessed through the following commands. Not all books are useful or accessible, but some may hold important secrets for war participants.

- **`c.books`**, **`c.books <letter>`** — View books by count or letter.
- **`c.books select <title>`**, **`c.books random`**, **`c.books search <keyword>`** — Read or search books.
- **`c.librarylitany`** — Special event quiz.

> Reading books may unlock roles, achievements, or puzzles.

---

## Admin Commands

- **`c.set_mm [ice/grass/water]`**, **`c.end_mm`** — Manage Milcery Marbles war team access.
- **`c.set_fairy_score_mm <score> <games>`**, **`c.games_played_mm`** — Set and view fairy score goals.
- **`c.send_daily_leaderboard_mm`**, **`c.send_weekly_leaderboard_mm`** — Send leaderboards and grant medals.
- **`c.clear_daily_mm`**, **`c.clear_weekly_mm`** — Clear leaderboard data.
- **`c.remove_player_mm <user_id>`** — Remove a player.
- **`c.prefix [new_prefix]`** — Set bot prefix.

---

## Achievements

- Earned via high streaks, perfect games, special sets, and event participation.
- Some grant Discord roles or recognition.
- Use **`c.mm medals`**, **`c.toh medals`**, or **`c.tos medals`** to view yours.

---

## Notes

- Most minigames are started via DM with Celebi.
- Some features are mod- or role-restricted.
- Use **`help`** subcommands or DM the bot owner for assistance.

---

_For bug reports or suggestions, contact the maintainers or open an issue on the project repository._
