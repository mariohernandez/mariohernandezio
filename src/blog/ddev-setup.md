---
date: "2020-06-29"
title: "Building an automated DDEV-based Drupal environment"
tags: ['drupal', 'ddev', 'training']
featured: false
featuredImage: "/images/rocks.webp"
featuredImageAlt: "Rocks stack from big to small"
imageThumb: "/images/thumbs/rocks.webp"
featuredImageCredit: "Markus Spiske"
featuredImageCreditUrl: "https://unsplash.com/photos/IiEFmIXZWSw"
summary: "As a trainer, having an environment that is easy to setup to achieve consistency among all students is key for a successful training workshop."
---
A successful training experience begins before we step foot in the training room.  Or, in these days of distance learning, it begins before students login to your training platform.  The challenge is having an environment that is easy for students to setup and provides all the tooling required for the training. Configuring a native development environment is no easy task. Web development tools have gotten more complex with the years and it's a huge barrier for even experienced developers.  My goal in setting up this new environment was to have everything completely configured and automated so students only needed to run one command.  Very ambitious.

**WARNING**:  The codebase shared in this post is only intended for local development.  **DO NOT** use this project in a production website.


**About DDEV**:  The official name is <a target="_blank" href="https://ddev.readthedocs.io/en/stable/">DDEV-Local</a>. For simplicity I use DDEV in this tutorial.

<hr />

**Here are the tools and configuration requirements for this environment**:

* Docker
* DDEV
* Composer
* Drush
* Drupal 8 and contrib modules
* Pre-built Drupal entities (content types, paragraph types, views, view modes, taxonomy, image styles, and more)
* Custom Drupal 8 theme
* Twig debugging enabled by default and Drupal cache disabled by default
* NodeJS, NPM, and NVM
* Pattern Lab
* Gulp, ESLint, Sass Lint, BrowserSync, Autoprefixer, and many many more node dependencies

## Desired behavior
My main objective was to simplify the building and interaction with the environment, by:
* Only require Docker and DDEV to be installed on host computer
* Reducing the number of steps for building the environment to one command, `ddev start`
* Execute most if not all commands in the containers, not the host machine (Drush, Composer, Pattern Lab, etc.)
* Access Pattern Lab running in the web container, from the host machine

**Yes, it is crazy, but let's see how this turned out**

First things first.  As I said before, installing Docker and DDEV are the only two things students will need to install. There is no way around this.  Luckily there are a lot of resources to help you with this.  <a target="_blank" href="https://ddev.readthedocs.io/en/stable/#installation">The DDEV docs</a> is a great place to start.

## Setting up a Drupal site
Before we start, I'd like to clarify that this post focuses on outlining the process and steps for automating a local environment.  However, before we can automate, we need to build all the pieces.  If you just want to grab the final product <a href="https://github.com/mariohernandez/drupaltraining" target="_blank">here's the repo</a>, otherwise, read on.

As of Drupal 8.8.0, <a href="https://www.drupal.org/docs/develop/using-composer/starting-a-site-using-drupal-composer-project-templates" target="_blank">Composer project templates</a> are now available as part of Drupal core. These project templates are recommended for building new Drupal sites as they serve as a starting point for creating a Composer-managed Drupal site.

Two things we will be doing with our Drupal project:

1. Drupal dependencies and modules will not be commited to the git repo.  They will be downloaded with Composer when the project is being built.
1. Composer will not be installed in the host system, instead, we will use the composer version that comes with DDEV's web container.

### Let's start
1. Create a new directory for your project. The directory name should be lowercase and alpha-numeric characters only.  For this example I will name it **drupaltraining** and will create it in my **/Sites** directory.  Using your command line tool create the new directory
    ```bash
    mkdir drupaltraining
    ```

1. Now navigate into the newly created directory
    ```bash
    cd drupaltraining
    ```

1. Run the DDEV command below to setup a new Drupal project
    ```bash
    ddev config --project-type=drupal8 --docroot=web --create-docroot
    ```
    * This will create a `.ddev` directory with basic Drupal configuration.
    * It will also create `settings.php` and settings.ddev.php` files inside **web/sites/default**.
    * Finally, it creates a Drush directory.
    * Keep in mind, Drupal is not in place yet, this simply sets the environment for it.

1. Now start DDEV to create the containers.
    ```bash
    ddev start
    ```
    * After the project has been built, you will see a link to open Drupal in the browser.  For this project the link should be `https://drupaltraining.ddev.site` (ignore for now).  If you have not installed **mkcert** (`mkcert -install`), the link you see may use `http` instead of `https`.  That's fine, but I'd recommend always using https by installing `mkcert`.

1. Now we are going to create the codebase for Drupal by using the official <a target="_blank" href="https://www.drupal.org/docs/develop/using-composer/starting-a-site-using-drupal-composer-project-templates">Drupal community
Composer template</a>.
    ```bash
    ddev composer create "drupal/recommended-project:^8"
    ```
    _Respond **Yes** when asked if it's okay to override everything in the existing directory_.

    * This will setup the codebase for Drupal.  This could take a while depending on your connection.
    * `composer.json` will be updated so Drupal is added as a project's dependency.
    * New `settings.php` and `settings.ddev.php` files are created.
    * Using `ddev composer create` uses the version of composer that comes as part of the DDEV's web container.  This means composer is not required to be installed in the host's computer.
    * One thing I love about using the new composer template is the nice list of next steps you get after downloading Drupal's code base.  So useful!

1. Now let's grab some modules
    ```bash
    ddev composer require drupal/devel drupal/admin_toolbar drupal/paragraphs drupal/components drupal/viewsreference drupal/entity_reference_revisions drupal/twig_field_value
    ```
    * This will download the modules and update **composer.json** to set them as dependencies along with Drupal.  The modules and Drupal's codebase will not be commited to our repo.

1. Let's add Drush to the project
    ```bash
    ddev composer require drush/drush
    ```
    * Installing Drush as part of the project which will run in the web container will make it possible to run drush commands (`ddev drush <command>`), even if the host does not have drush installed.

1. Now launch Drupal in the browser to complete the installation
    ```bash
    ddev launch
    ```
    * This will launch Drupal's intall page. Drupal's url will be **https://drupaltraining.ddev.site**. Complete the installation by using the Standard profile.  Since the `settings.ddev.php` file already exists, the database configuration screen will be skipped from the installation.

1. Make a copy of `example.settings.local.php` into **web/sites/default**
    ```bash
    cp web/sites/example.settings.local.php web/sites/default/settings.local.php
    ```
    * This is recommended to override or add new configuration to your Drupal site.

1. Update `settings.php` to include `settings.local.php`.
    ```php
    if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
      include $app_root . '/' . $site_path . '/settings.local.php';
    }
    ```
    * I'd suggest adding the above code right after the `settings.ddev.php` include already in settings.php.  This will allow us to override configuration found in settings.ddev.php.


1. Let's change Drupal's default config directory.  Doing this will export any configuration outside the `web` directory in Drupal.  This is a good security measure.  Let's also ignore a couple of folders to avoid drupal errors.
    ```php
    if (empty($settings['config_sync_directory'])) {
      $settings['config_sync_directory'] = '../config/sync';
    }

    $settings['file_scan_ignore_directories'] = [
      'node_modules',
      'bower_components',
    ];
    ```
    * First block changes the default sync directory to `drupaltraining/config/sync`.  If you look inside settings.ddev.php you will see that this directory is inside `web`.  We want to store any configuration changes outside the web directory.
    * Second block sets up Drupal to ignore `node_modules` and `bower_components`.  Drupal may look for twig templates inside these directories and could cause Drupal to crash.  Ignoring these directories solves these issues.

1. Since we've made changes to DDEV's configuration, restart DDEV
    ```bash
    ddev restart
    ```

That's quite the process, isn't it?  The good news is this entire process will be eliminated when we finish automating the environment.

## Drupal 8 custom theme
The project's theme is called `training_theme`.  This is a node-based theme, and will be built with <a href="https://github.com/mediacurrent/theme_generator_8" target="_blank">Mediacurrent's theme generator</a>, which will provide:
* A best-practices Drupal 8 theme
* Pattern Lab integration
* Automated Front-End workflow
* Component-based-ready environment
* Production-ready theme

The final DDEV project will include the new Drupal 8 theme so there is no need to create it now, but if you want to see how the Theme Generator works, [Watch the video tutorial](https://mariohernandez.io/blog/mediacurrent-theme-generator) I recorded.

## Automating our environment
Now that Drupal has been setup let's begin the automation process.

### Dockerfile
A web Docker container comes with Node and NPM installed.  This will work in most cases, but the Drupal theme may use a version of node not currently available in the container.  In addition, the web container does not include Node Version Manager (<a target="_blank" href="https://github.com/nvm-sh/nvm">NVM</a>), to manage multiple node versions.  If the tools we need are not available in the web or db images/containers, there are ways to modify them to include the required tools. One of those ways is an add-on <Dockerfile target="_blank" href="https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/">Dockerfile</a> in your project's **.ddev/web-build** or **.ddev/db-build**, depending which container you are trying to modify.

Inside **.ddev/web-build** create a file called **Dockerfile** (case sensitive), and in it, add the following code:
```bash
ARG BASE_IMAGE
FROM $BASE_IMAGE
ENV NVM_DIR=/usr/local/nvm
ENV NODE_DEFAULT_VERSION=v14.2.0
RUN curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh -o install_nvm.sh
RUN mkdir -p $NVM_DIR && bash install_nvm.sh
RUN echo "source $NVM_DIR/nvm.sh" >>/etc/profile
RUN bash -ic "nvm install $NODE_DEFAULT_VERSION && nvm use $NODE_DEFAULT_VERSION"
RUN chmod -R ugo+w $NVM_DIR
```
The code above sets an environment variable for default node version (v14.2.0), which is the node version the theme uses at the time of this setup.  It installs and configures NVM, and makes NVM executable by updating the container's bash profile.  A Dockerfile runs while the image or container is being built to alter any default configuration with the code found in the Dockerfile.

### Custom DDEV commands
The Drupal 8 theme for this project uses Node for most of its tasks.  To compile CSS, JavaScript, and Twig we need to run commands such as `npm install`, `npm run build`, `npm run watch`, and others.  Our goal is to be able to run these commands in the web container, not the host computer.  Doing this eliminates the need for students to install any node-related tools which can get really complicated.  While we could achieve this by asking students to first SSH into the web container (`ddev ssh`), then navigate into **/web/themes/custom/training_theme/**, then run the commands, I want to make it even easier for them.  I want them to be able to run the commands from any directory within the project and to not have to ssh into the web container.  To achieve this we need to create a couple of custom commands.

Custom commands can be created to run in containers as well as the host machine.  Since we want to run these commands in the web container, we are going to create the commands inside **.ddev/commands/web/**.  Custom commands are bash script files.

#### NVM custom command
* Inside **.ddev/commands/web/** create a new file called **nvm**
* Add the following code in the file:
```bash
#!/bin/bash
## Description: Run any nvm command.
## Usage: nvm [flags] [args]
## Example: "nvm use or nvm install"
source /etc/profile && cd /var/www/html/web/themes/custom/training_theme && nvm $@
```
* Since this is a bash script, `#!/bin/bash` is required as the first line in the file.
* A description of the script is a good practice to explain what the script does.
* Pay close attention to `## Usage: nvm [flgas] [args]`.  This is what makes the commands work.  The [flags] and [args] are ways to pass arguments to the command.  For example, `nvm` on its own won't do much, but `use` or `install` can be passed as parameters to complete the commands `nvm use` or `nvm install`. Being able to run these commands will allow us to install new versions of Node later on if needed.
* Next we are adding examples of potential commands that can be run.
* Finally, you see the code or actual commands. `source /etc/profile` is basically resetting the container's bash profile so NVM can run.  Then we navigate into the `training_theme` directory within the container where the nvm commands will be executed.  So technically in the script above we are running 3 commands in one.  Using `&&` in between each command lets us combine or concatenate them.  The `$@` after nvm represent the flags or arguments we can pass (i.e. _use_ or _install_).

**Running the new commands**: Every custom command needs to be executed by adding `ddev` before the command. For example: `ddev nvm use`. Using ddev infront of the command instructs the system to run the commands in the containers, rather than the host computer.

#### NPM custom commands
We will also create a custom script to run NPM commands.  This will be similar to the NVM script.  This new script will be executed as `ddev npm install` or `ddev npm run build`, etc.  The npm commands will allow us to install node dependencies by the theme as well as execute tasks like compiling code, linting code, compressing assets, and more.

* Create a new file inside **.ddev/commands/web** and call it **npm**
* Add the following code in the file:
```bash
#!/bin/bash
## Description: Run npm commands inside theme.
## Usage: npm [flags] [args]
## Example: "npm install or npm rebuild node-sass or npm run build or npm run watch"
cd /var/www/html/web/themes/custom/training_theme && npm $@
```
* Most of the code here is similar to the previous script, except instead of **nvm** we will run **npm**.
* Notice we are again navigating into the theme directory before running the command.  This make is possible for the custom commands we are creating to be ran from any directory within our project while still being executed inside the **training_theme** directory in the container.

#### Drush custom command
Let's create one last custom command to run drush commands within the DDEV containers
* Create a new file inside **.ddev/commands/web** and call it **drush**
* Add the following code in the file:
```bash
#!/bin/bash
## Description: Run drush inside the web container
## Usage: drush [flags] [args]
## Example: "ddev drush uli" or "ddev drush sql-cli" or "ddev drush --version"
drush $@
```
* This will allow us to run drush commands in the container but using `ddev drush <command>` (i.e. `ddev drush cr`, `ddev drush updb -y`, etc.).


So that's it for custom commands.  By having custom commands for nvm and npm, we can now successfully run any theming related tasks.

## Automating Drupal's setup
We want to streamline the drupal installation process.  In addition, we want to be able to import a custom database file to have access to all the infrastructure needed during training.  This includes content types, paragraph types, views, view modes, image styles, and more.  Enter <a target="_blank" href="https://ddev.readthedocs.io/en/stable/users/extending-commands/">DDEV hooks</a>.

### DDEV Hooks
Hooks are a great way to perform tasks before or after DDEV starts.  There are tasks that need to happen in specific sequence and hooks allow us to do just that.  So what's the differnce between custom commands and hooks?  Technically hooks can be considered custom commands, but the difference is that they are executed automatically before or after DDEV starts, whereas custom commands are ran on demand at any time.  DDEV needs to be running if custom commands are intended to run in containers. Back to hooks, Let's build a **post-start** hook.

Hooks can be ran as **pre-start**, **post-start**, and **after-db-import**.  Also, hooks can be executed inside containers and/or the host machine.  In our case all the tasks we outlined above will be ran after DDEV starts and most of them in Docker's containers.

* Open **.ddev/config.yaml** and add the following code at the bottom of the file.  There may already be a **hooks** section in your file.  Be sure indentation in the file is correct.
```yaml
  hooks:
      post-start:
        - composer: install
        - exec: /var/www/html/db/import-db.sh
        - exec: drush updb -y
        - exec: drush cim -y
        - exec-host: cp -rf web/sites/example.development.services.yml web/sites/development.services.yml
        - exec-host: cp -rf web/assets/images/* web/sites/default/files/images/
        - exec: drush cr
        - exec-host: ddev launch /user
```
* **post-start:** indicates tasks declared will run after DDEV container's have started.  We want the web and db containers available before running any of the tasks.
* `composer: install` will download all dependencies found in `composer.json` (Drupal core, modules, drush and others).
* `exec: /var/www/html/db/import-db.sh` is a custom script which imports a custom database file (provided in this project).  We will go over this script shortly.  Importing a custom database builds the Drupal site without having to install Drupal as long as Drupal's codebase exists.
* `exec: drush cim -y`, `exec: drush updb -y`, and `exec: drush cr`, are basic drush commands.
* `exec-host: cp -rf web/sites/example.development.services.yml web/sites/development.services.yml` will create a new `development.services.yml`. This is needed because when Drupal is setup, `development.services.yml` is overridden and since we are using custom configuration in that file to enable twig debugging, we need to restore the configuration by replacing the file with a copy of our own.
* `exec-host: cp -rf web/assets/images/* web/sites/default/files/images/` copies a collection of images used in the demo content added to the site.
* Finally, `exec-host: ddev launch /user` will open a fully configured Drupal website in the browser.

**Login to Drupal**:  Username: `admin`, password: `admin`

### Import database script
Now let's write the script to import the database we are using in the hook above.

* In your project's root, create a new directory called **db**
* In the new directory create a new file called `import-db.sh` and add the following code:
```bash
#!/bin/bash
# Use a table that should exist in your database.
if ! mysql -e 'SELECT * FROM node__field_hero;' db 2>/dev/null; then
  echo 'Importing the database'
  # Provide path to custom database.
  gzip -dc /var/www/html/db/drupaltraining.sql.gz | mysql db
fi
```
* This is again another bash script which performs a database import but only if the database is empty or clean.  We do this by checking if one of the tables we expect in the database exists (`node__field_hero`).  If it does, the database is not imported, but if it doesn't it will import the database.  This table can be any table you know it should exist.

* Notice the script calls for a database file named `drupaltraining.sql.gz`.  This means the database file shold exist inside the **db** directory alongside the `import-db.sh` script.  This database file was created/exported after Drupal was configured with all training required infrastructure and settings.

* Make the script executable
```bash
chmod +x db/import-db.sh
```
* This will ensure the script can be executed by DDEV, otherwise we would get a **permission denied** error.

This does it for automation.  The next few tasks are things that improve the development environment.  Some of these tasks are optional.


## Exposing Pattern Lab's port in host computer
Since our goal is to not have to install any Front-End tools in the host computer, running Pattern Lab has to be done in the web container.  The problem is we can't open Pattern Lab in the host's browser if Pattern Lab is running in the container.  For this to work we need to expose the port in which Pattern Lab runs to the host machine.  In this environment, that port is 3000 (this port number may vary).  We identify this port by running `npm run watch` inside the `training_theme` directory.  This will provide a series of links to access Pattern Lab in the browser.

Under the hood, DDEV uses docker-compose to define and run the multiple containers that make up the local environment for a project. docker-compose supports defining multiple compose files to facilitate sharing Compose configurations between files and projects, and DDEV is designed to leverage this ability.

### Creating a new docker-compose.*.yaml
A docker-compose file allows to do many things including exposing ports from the containers to the host computer.

On a typical Pattern lab project if you run `npm start` you will see Pattern Lab running on `http://localhost:3000`. In this environment the equivalent command is `ddev npm run watch`. Since this environment is running Pattern Lab in the web container, the only way to access Pattern Lab in the browser is by having access to the container's port 3000. Exposing the port via the `http` or `https` protocols makes it possible to access Pattern Lab's UI page from the host machine.

1. Inside **.ddev/**, create a new file called **docker-compose.patternlab.yaml**
1. In the new file add the following code:
    ```yaml
    # Override the web container's standard HTTP_EXPOSE and HTTPS_EXPOSE
    # to access patternlab on https://drupaltraining.ddev.site:3000, or http://drupaltraining.ddev.site:3001.
    version: '3.6'
    services:
      web:
        # ports are a list of exposed *container* ports
        ports:
          - "3000"
        environment:
          - HTTP_EXPOSE=${DDEV_ROUTER_HTTP_PORT}:80,${DDEV_MAILHOG_PORT}:8025,3001:3000
          - HTTPS_EXPOSE=${DDEV_ROUTER_HTTPS_PORT}:80,${DDEV_MAILHOG_HTTPS_PORT}:8025,3000:3000
    ```
    * The name of the file is completely optional.  It makes sense to use a name that is related to the action, app, or service you are trying to implement.  In this example the name **docker-compose.patternlab.yaml** made sense.
    * How did we arrive at the content above for this file?  DDEV comes with two files that can be used as templates for new configuration, one of those files is called **.ddev-docker-compose-base.yaml**.  You can find all the code we added above in this file.

1. Restart DDEV to allow for the new changes to take effect:
    ```bash
    ddev restart
    ```
    * The basics of the code above is modifying the web container's port 3000.  We are exposing this port through the `http` and `https` protocols on the host machine.

1. For the above to work Pattern Lab needs to be running in the container:
    ```bash
    ddev npm run watch
    ```

**Viewing Pattern Lab in the host machine**
* https://drupaltraining.ddev.site:3000 or
* http://drupaltraining.ddev.site:3001

## Using NFS (optional)
Last but not least, enabling NFS in DDEV can help with performance of your application.  NFS (Network File System) is a classic, mature Unix technique to mount a filesystem from one device to another. It provides significantly improved webserver performance on macOS and Windows. This is completely optional and in most cases you may not even need to do this.  The steps below are for macOS only.  <a target="_blank" href="https://ddev.readthedocs.io/en/stable/users/performance/#using-nfs-to-mount-the-project-into-the-web-container">Learn more about NFS</a> and how to enable it in other Operating Systems like Windows.

* In your command line run
```bash
id
```
* Make note of `uid` (user id) and `gid` (group id).
* Open `etc/exports` in your code editor, and add the following code, preferably at the top of the file:
```bash
/System/Volumes/Data/Users/xxxx/Sites/Docker -alldirs -mapall=502:20 localhost
```
* Replace `xxxx` with your username. The full path shown above is required if you are using macOS Catalina.
* Replace `Sites/Docker` (This is my personal project's directory), with the directory name where your DDEV projects are created.  Most people would mount the entire user's home directory, but I think only mounting the directory where your projects live is good enough (`/Sites/Docker/`).
* Replace `502` and `20` with the values you got when you ran the `id` command above.

* Update DDEV's config.yml to enable NFS
```yaml
nfs_mount_enabled: true
```

* Restart DDEV
```bash
ddev restart
```
You should notice an improvement in performance in your Drupal website.

## In closing
I realize there is a lot here, but I am pretty happy with how this turned out.  Thanks to all the work in this article, when one of the students wants to setup their training environment, all the have to do is run `ddev start`.  I think that's pretty sweet! 🙌  Happy DDEVing!

<hr />

### Giving credit
Before I started on this journey, I knew very little about DDEV.  Thanks to the amazing help from <a href="https://www.drupal.org/u/rfay" target="_blank">Randy Fray</a> from Drud.com and <a target="_blank" href="https://www.drupal.org/u/ultimike">Michael Anello</a> from DrupalEasy.com, I have learned a lot in the past weeks and wanted to share with other community members.  You can find both, Randy and Michael on <a target="_blank" href="https://drupal.slack.com/#/">Drupal's DDEV Slack Channel</a>.  They are extremely helpful and responsive.

### Resources
* <a href="https://github.com/mariohernandez/drupaltraining" target="_blank">Final product repo</a>
* <a href="https://www.drupal.org/docs/develop/using-composer/starting-a-site-using-drupal-composer-project-templates" target="_blank">Drupal composer project template</a>
* <a target="_blank" href="https://ddev.readthedocs.io/en/stable/#installation">DDEV docs</a>
* <a href="https://www.drupaleasy.com/blogs/ultimike/2018/11/new-book-local-web-development-ddev-explained" target="_blank">Local Web Development with DDEV Explained</a> (Book)
