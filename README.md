# Explore Lakshadweep

Explore Lakshadweep is a travel booking website designed to provide users with an immersive experience of the beautiful Lakshadweep islands. The website enables users to explore destinations, book travel packages, flights, and cruises, and discover the unique culture and geography of the islands.

## Features

- **Home Page**: Highlights the attractions and features of the Lakshadweep islands.
- **Booking Options**:
  - **Flights**: Search and book flights to and from Lakshadweep.
  - **Cruises**: Discover and book cruise journeys.
  - **Packages**: Explore curated travel packages tailored for individuals or groups.
- **User Management**:
  - User registration and login functionality.
  - Profile management with custom profile images.
- **Interactive Design**:
  - Image and video sliders showcasing the culture and geography.
  - Informative sections about activities like snorkeling, sunbathing, and kayaking.
- **Newsletter Subscription**: Allows users to subscribe to updates about the latest offers and news.
- **Contact Form**: Enables users to reach out for inquiries and support.

## Tech Stack

- **Frontend**:
  - HTML, CSS, and JavaScript.
  - Embedded JavaScript Templates (EJS) for rendering dynamic pages.
- **Backend**:
  - Node.js with Express.js.
  - MongoDB for data storage and management.
- **Dependencies**:
  - `mongoose`: MongoDB object modeling.
  - `express`: Web framework for Node.js.

## Folder Structure

- **`views/index.ejs`**: Defines the layout and design of the homepage, including navigation and interactive elements.
- **`models/userModel.js`**: Mongoose schema for user data, including profile, flight, cruise, and package bookings.
- **`routes/indexRoutes.js`**: Express routes for handling navigation to different pages like home, islands, packages, and about sections.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/explore-lakshadweep.git
   ```
2. Navigate to the project directory:
   ```bash
   cd explore-lakshadweep
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```
     MONGO_URI=your-mongodb-connection-string
     PORT=3000
     ```
5. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Access the website at `http://localhost:3000`.
2. Explore destinations, book flights or cruises, and subscribe to newsletters.
3. View your bookings and profile via the user dashboard.

## Contribution

Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
