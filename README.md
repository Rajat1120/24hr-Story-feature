# Stories App
Live - https://24hr-story-feature-gamma.vercel.app/

A React-based application for uploading, displaying, and viewing images as stories, similar to Instagram Stories. Users can upload images, view them in a horizontal scrollable list, and see them in a fullscreen overlay with a progress bar.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Components](#components)
6. [How It Works](#how-it-works)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)

## Features

- **Image Upload**: Upload images via a hidden file input triggered by a clickable button.
- **Local Storage**: Persist uploaded images in the browser's local storage.
- **Stories List**: Display uploaded images in a horizontal, scrollable list.
- **Fullscreen View**: View stories in a fullscreen overlay with automatic progression and keyboard navigation.
- **Progress Bar**: Visual indication of story duration in fullscreen mode.
- **Responsive Design**: Adapts to different screen sizes (mobile and desktop).
- **After 24 hours**: Old stories are deleted automatically from localStorage.

## Tech Stack

- **React**: Frontend library for building the UI.
- **Context API**: For state management across components.
- **Local Storage**: For persisting image data.
- **CSS**: Custom styles for layout, responsiveness, and animations.
- **FileReader API**: To convert uploaded images to base64 strings.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rajat1120/24hr-Story-feature.git
   cd stories-app
   ```

Install Dependencies:
bash
[npm install](https://x.com/i/grok?text=npm%20install)
or
bash
yarn install
Run the Application:
bash
[npm run dev](https://x.com/i/grok?text=npm%20start)
or
bash
[yarn run dev](https://x.com/i/grok?text=yarn%20start)
The app will start on http://localhost:5173/

## Usage

### Upload an Image:

- Click the "Add Circle" button to open the file picker.
- Select an image file (e.g., `.jpg`, `.png`).
- The image is saved to local storage and displayed in the stories list.

### View Stories:

- Click an image in the stories list to view it in fullscreen mode.
- The story progresses automatically every 3 seconds.
- Use arrow keys (`←` for previous, `→` for next) or `Esc` to close.

### Clear Storage (Optional):

- Open the browser's developer tools (F12).
- Go to the "Application" tab, select "Local Storage," and clear the `savedImages` key.

## Components

### `App`

- **Purpose**: Root component that provides context for state management.
- **State**: Manages the `images` array.
- **Context**: Shares `images` and `setImages` with child components.

### `StoryHeader`

- **Purpose**: Displays the "Add Circle" button and the stories list.
- **Features**: Loads images from local storage on mount and handles file uploads.

### `Stories`

- **Purpose**: Renders a scrollable list of `Story` components and manages fullscreen mode.
- **State**: Tracks the active story index (`activeIndex`).

### `Story`

- **Purpose**: Displays a single story image in the list.
- **Props**: `img` (image URL), `onClick` (handler to open fullscreen).

### `FullscreenStory`

- **Purpose**: Displays the active story in fullscreen mode with a progress bar.
- **Features**: Auto-progression (3 seconds), keyboard navigation, and progress animation.

## How It Works

### Image Upload Example

1. **User Action**: Clicks the "Add Circle" button.
2. **Process**:
   - The hidden `<input type="file">` is triggered via `fileInputRef`.
   - `saveImageToLocalStorage` reads the file using `FileReader`.
   - The image is converted to a base64 string and stored in `localStorage`.
   - The `images` state is updated, re-rendering the stories list.

### Fullscreen Story Progression

1. **User Action**: Clicks a story image.
2. **Process**:
   - `activeIndex` is set to the clicked story’s index.
   - `FullscreenStory` renders with a progress bar for each image.
   - A `setTimeout` advances to the next story every 3 seconds.
   - The progress bar animates using CSS keyframes.

## Screenshots

### Home page

<img width="1437" alt="Screenshot 2025-02-16 at 10 41 57 AM" src="https://github.com/user-attachments/assets/60335a34-3a7f-4099-8896-a93bd23de517" />

### Fullscreen Story

https://github.com/user-attachments/assets/196e8c14-a7a1-4b6c-9e2f-83dfa909ef2c

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
