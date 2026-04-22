Project EventSphere

This is an event management website I built using React and Node.js.

The main goal was to create something that looks modern, feels smooth, and actually works in a real scenario — especially the recruitment flow and data handling.

What it does
Users can fill out a recruitment form
Form data is sent to the backend
Backend stores everything directly in Google Sheets
There’s also a gallery section with hover effects and previews
Tech used

Frontend:

React (Vite)
Tailwind CSS
Framer Motion

Backend:

Node.js
Express
Google Sheets API
Features
Recruitment form
Validations included
Tracks completion
Sends clean structured data
Google Sheets integration

Instead of using a database, I used Google Sheets as a backend store.
Makes it easy to view and manage submissions.

Gallery section
Responsive grid layout
On hover → card expands and shows 3 preview images
On mobile → previews show below (since hover doesn’t work)

Project structure
project-eventsphere/
  client/   -> frontend
  server/   -> backend

