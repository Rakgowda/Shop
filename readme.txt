-- /src:
 The main folder that holds all your source code.
-- /config:
 Contains configuration files, such as database configurations, environment variables, or third-party service configurations.
-- /controllers:
 Contains controller files that handle incoming requests, call appropriate services, and return responses.
-- /models:
 Contains database models or schema definitions using an ORM or database library.
-- /routes:
 Contains route files that define the API endpoints and map them to controller functions.
-- /middlewares:
 Contains custom middleware functions that can be applied to routes for handling authentication, request validation, logging, etc.
-- /services:
 Contains service files that encapsulate the business logic and interact with databases or other external services.
-- /utils:
 Contains utility files or helper functions that can be reused across the application.
index.js: The entry point file of your Node.js application where you set up the server and connect various components.