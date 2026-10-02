# Rosita Waters public website

React/Vite storefront. Products, public content, and tenant branding are loaded
from `Client-Backend`; customer orders are submitted to its public order API.
The backend maps the browser `Origin` hostname to a registered tenant. Do not
add private integration keys to this Vite app.

Set `VITE_API_URL` to the backend origin (without a trailing `/api`) in
`.env.local` or the frontend host's build settings. The API helper adds `/api`
to storefront requests. The backend must allow this website's origin and list
its hostname for the corresponding tenant.

Run locally with `npm install` and `npm run dev`; create a production bundle
with `npm run build`.
# Rosita-Waters
