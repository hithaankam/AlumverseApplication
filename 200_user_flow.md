The Flow of Information
The User Interaction:
It all starts with your users—the Alumni, Students, and Administrators. They open the application on their web or Android smartphones.

The Frontend:
What they interact with is the React Native mobile app. This is the user interface with all the screens, buttons, and text fields. When a user performs an action, like tapping the "Search" button or submitting their profile details, the app gathers that information.

App to Backend Communication:
The React Native app then sends this information as a secure HTTP request over the internet to your backend. This communication happens through a REST API, which is like a standardized menu of commands that the app can use to ask the backend to do things.

The Backend (The Central Hub):
This request first arrives at the Backend API Gateway, which is built using Spring Boot. The gateway acts as the main entrance, validating the request and routing it to the correct internal microservice. For example:

A login request goes to the User Service.

An RSVP for a reunion goes to the Events Service.

A search for a former classmate goes to the Search Service.

These individual services, all part of the Spring Boot application, contain the business logic. They are the "brains" that process the request.

Accessing the Database:
To fulfill the request, the Spring Boot service needs to read or write data. It connects to the MongoDB database to do this. For instance, the User Service might fetch a profile from the MongoDB database, or the Events Service might save a new event registration into it. MongoDB acts as the system's permanent memory, storing all the data in a flexible document format.

Using External Specialists (Third-Party Services):
For certain specialized tasks, the backend doesn't handle the work itself. Instead, it makes calls to other expert services:

When an alumnus makes a donation, the backend communicates with a payment processor like Stripe to handle the transaction securely, without ever touching sensitive credit card details.

The Response Journey Back:
Once the backend service has finished its job (after talking to the database or other services), it packages up a response. This response travels back through the API Gateway, over the internet, and finally reaches the user's React Native app. The app then uses this data to update the screen, perhaps showing a "Login Successful" message or displaying the search results.

In short, the entire architecture is a clean and organized flow: a request travels from the user's mobile app to the powerful Spring Boot backend, which uses the MongoDB database and other specialized services to get its job done before sending a response back to the user's screen.


### User Account & Onboarding

This section now details the different ways users will join and manage their accounts.

* **Self-Service Registration (for Students & Management):** Current students and faculty can sign up on their own using their official college email address for instant and automatic verification.
* **Profile Claiming (for Alumni & Recruiters):** Alumni and recruiters from the initial database will "claim" their pre-loaded profiles. They'll enter their email, receive a secure link, and set their own password to activate their account.
* **Profile Management ("My Profile"):** A personal dashboard for all users to update their information[cite: 22]. This section will also include a feature that prompts graduating students to add a personal email to ensure a smooth transition from "Student" to "Alumni" status.
***

### Admin-Specific Features

These are features specifically for the administrator to manage the platform.

* **Bulk User Import:** A tool for the admin to upload the initial database of alumni and recruiters to pre-populate the platform.
* **Registration Approval Queue:** A dashboard where the admin can review and manually approve registration requests from new alumni or recruiters who were not in the initial database.

***

### Engagement & Networking

These features are focused on building community and interaction.

**Networking Hub:** A central space for alumni to connect and interact

***

### Career & Professional Development

These features provide tangible career and skill-building benefits.

**Job Portal:** A dedicated section for posting and finding job opportunities.
**Event Management:** A tool for creating and managing events like workshops and reunions[cite: 5, 22].

***

### Recognition & Gamification

These features are designed to encourage participation and celebrate success.

**Spotlight Stories:** Highlights alumni achievements through stories and podcasts
**Rewards, Incentives, and Badges:** A system to reward users for their engagement on the platform

***

### Institutional Support

This feature is focused on connecting alumni back to the institution.
**Secure Donations / Funding Drive:** A secure way for alumni to make financial contributions, with payments processed by **Google Pay**