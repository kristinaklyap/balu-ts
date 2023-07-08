
# Balu Webshop

The project is a modern webshop developed using TypeScript and React (+ React Redux Toolkit) for the frontend, and a headless CMS called Strapi for the backend. Payments are supported by Stripe.

This repo contains only frontend part of the project.




## Author

[@kristinaklyap](https://www.github.com/kristinaklyap)


## Demo

https://balu.kristi.guru/


## Tech Stack

**Client:** TypeScript, React, Redux Toolkit, CSS Modules (SCSS)

**Server:** Strapi (NodeJS)

**Payments:** Stripe



## Tree


 ```
 🗂️src
    ├── assets
    ├── components
    │   ├── Banner
    │   ├── Cart
    │   ├── Container
    │   ├── ContentRepeater
    │   ├── Footer
    │   ├── Header
    │   ├── NotFound
    │   ├── ProductCard
    │   ├── SectionTitle
    │   ├── Slider
    │   └── Typography
    ├── helpers
    ├── hooks
    ├── models
    ├── pages
    │   ├── Home
    │   ├── Page
    │   ├── Product
    │   └── Products
    ├── store
    └── styles
        └── scss

 ```

## Development
start development:

    okteto up

stop development

    okteto down

## Build and Deployment
Automated with jenkins. Some secrets are needed during build.

### add secrets for jenkins

    source .env
    kubectl -n jenkins create secret generic balu-client-envs \
        --from-literal=REACT_APP_API_TOKEN=$REACT_APP_API_TOKEN \
        --from-literal=REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY

