<h1 align="center">Source-code for our website <a href="https://flipper-xtre.me">flipper-xtre.me</a></h1>

<img src="https://user-images.githubusercontent.com/55334727/236639627-1c2d00f7-7169-449d-84bd-9d0bb8fd9c6c.png">

### Structure:

This project is structured into two folders:

1. [Public](https://github.com/ClaraCrazy/flipper-xtre.me/tree/main/public):

    The `public` folder is what you see when visiting the website. Its the compiled files for the webupdater & asset packs, and all the other things like HTML, CSS, JS.


2. [src](https://github.com/ClaraCrazy/flipper-xtre.me/tree/main/src):

    The `src` folder contains the raw source-code for the webupdater & asset pack page. This is intended for developers only.
   
### How does this all work?

Well, the core part is just HTML. Nothing fancy. Whats complicated is the webupdater & asset-packs page, as those use [Vue](https://github.com/vuejs/). In simple terms, Vue combines html and JS into a single file, allowing for a simpler build process of complex sites.

1. To compile the webupdater & asset-packs page, you run first need to install all dependencies:

    - For fedora:
        ```console
        dnf install tzdata npm
        ```
    - For Ubuntu:
        ```console
        apt install tzdata npm
        ```
    - For alpine:
        ```console
        apk install tzdata npm
        ```

2. To finally build, run these commands in the `frontend` directory:
    ```console
    npm i
    # If there is any vulnerabilities ALWAYS run "npm audit fix". Dont be lazy!
    quasar build -m spa
    ```

3. Then just copy the built files over into the `public` folder. Yes, thanks to their randomized naming scheme that is kind of annoying but its not too bad. Then just serve it with a simple http server for testing, and put behind apache2 / nginx for production.

    - Python http:
        ```console
        python -m http.server
        ```
