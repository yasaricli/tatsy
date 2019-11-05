# Development

We would love for you to contribute to **Tatsy** and help make it even better. 

**Tatsy** follows the Monorepo design managed by Lerna.

## Running from a Git checkout

you can run **tatsy** directly from a Git checkout using these steps:

1. **Clone from GitHub**

    ```sh
    $ git clone https://github.com/tsepeti/tatsy.git
    $ cd tatsy
    $ yarn
    ```
2. **Install Peer Dependencies**

    ```sh
    $ yarn install
    ```
    
3. **Bootstrap every package with yarn. (Need to execute when new package is included)**

    ```sh
    $ yarn lerna:bootstrap
    ```
    
4. **Link tatsy globally.**

    ```sh
    $ cd my-project
    $ yarn add ../tatsy/packages/tatsy
    ```
    
    
#### What about if you have problems that cannot be discussed in a public issue?

You can send an email to yasar.icli@tatilsepeti.com
