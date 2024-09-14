# cozy-rush-and-win

This is a really simple website for my [@CozyGamez](https://www.youtube.com/@CozyGamez) channel on YouTube.

## The idea

I don't know if it will work and I will persist in doing this over the time, but
the main idea is to give YouTube viewers a code, which they can input in the website.
If the code is correct, and it was not utilized by anyone, it will allow the user access to a game code to redeem
on a specific platform (Steam, Nintendo eShop...). That's it.

Will it work to grow my experimental (yeah, it's all automagic 🤫) YouTube channel? Who knows.

## Frontend

This websites is made in React (Typescript) with the help of [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)
Just run `nvm install && nvm use` to activate the correct Node version, then `cd web && npm start` to start the web server in dev mode.

## Backend

The backend is just a PHP file to which requests will be made in order to query the DB and get the game code. As said, really simple (needs a PHP server + MySQL DB to run it).
