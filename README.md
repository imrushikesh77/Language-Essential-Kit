# Language Essential Kit

This project is a **Language Essential Kit** designed to assist travelers in learning essential phrases based on their native language, the place they are traveling to, and specific categories of phrases they would like to learn. The backend generates these phrases using the **Gemini API**, and the autocomplete feature for entering places is powered by the **Geoapify API**.

## Features

- **Multi-language Support**: Users can select their native language.
- **Destination-Based Phrases**: Enter the place you are traveling to, and the app will suggest essential phrases in that location's language.
- **Phrase Categories**: Choose categories of phrases (e.g., greetings, directions, shopping, etc.) and get at least 20 relevant essential phrases for each category.
- **Autocomplete for Places**: Backend-powered autocomplete suggestions when entering a place, using the Geoapify API.

## Project Structure

The project consists of two main directories:

- `frontend/`: Contains the HTML, CSS, and JavaScript files for the frontend, where users input their language, destination, and category of phrases.
- `backend/`: Contains the Node.js backend, which interacts with the Gemini API and serves the phrases to the frontend. It also uses the Geoapify API for the autocomplete feature.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  
- **Backend**:
  - Node.js
  - Express.js
  - Gemini API (for generating essential phrases)
  - Geoapify API (for place autocomplete)

## Setup Instructions

### Prerequisites

- **Node.js** (v12+)
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/imrushikesh77/Language-Essential-Kit.git
cd Language-Essential-Kit
```

### 2. Install dependencies

#### For the backend:

```bash
cd backend
npm install
```

### 3. API Keys Setup

- **Gemini API**: You need to sign up for the Gemini API to get the API key for generating essential phrases.
- **Geoapify API**: You also need a Geoapify API key for the autocomplete feature for places.

Add these API keys to your backend's `.env` file:

```bash
GEMINI_API_KEY=your-gemini-api-key
MAP_KEY=your-geoapify-api-key
MAP_URL=geoapify-api-url
```

### 4. Run the Application

#### Start the Backend:

```bash
cd backend
npm start
```

#### Open the Frontend:

Open the `index.html` file located in the `frontend/` directory in your web browser or open with live server.

## Usage

1. Open the `index.html` file in your browser.
2. Select your **native language**.
3. Enter the **place you are traveling to** (autocomplete suggestions will appear).
4. Choose a **category** of phrases you'd like to learn.
5. The app will generate at least **20 essential phrases** for you to use based on your input.
6. You can download it in PDF formate for offline usage.


## Contributing

Feel free to fork the project, create new features, or report any issues. Contributions are welcome!

## License

This project is licensed under the MIT License.