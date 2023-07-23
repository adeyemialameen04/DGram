# DGram

This project is a simple web application that allows users to upload and manage image and audio files using Firebase Storage. It is built with React and integrates with Firebase for authentication and storage.

## Features

- User authentication using Firebase Auth
- Upload and manage image files
- Upload and manage audio files
- Delete files
- Download files
- Real-time updates for uploaded files

## Demo

[View Demo](https://dgram-zeta.vercel.app)

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- Firebase account with Firestore and Storage set up

## Getting Started

1. Clone the repository:

```bash
https://github.com/adeyemialameen04/DGram.git
```

2. Install the dependencies:

```bash
cd DGram
npm install
```

3. Set up Firebase Config:

   - Create a Firebase project and obtain your Firebase Config from the Firebase Console.
   - Replace the Firebase Config in `src/config/firebase.js` with your own.

4. Start the development server:

```bash
npm run dev
```

The application should now be running on `http://localhost:5173/`.

## Usage

- Sign in with your Firebase account to access the application.
- Choose "Choose your file" to upload image or audio files.
- Uploaded files will be displayed on the main page.
- Use the buttons to delete or download files.

## Technologies Used

- React (Frontend)
- Firebase (Authentication and Storage)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
