# Technical Documentation

## Overview
This project is a front-end personal portfolio website developed to present academic background, technical skills, and completed projects in a structured and accessible format. The system is designed to provide a clean, easy-to-use interface for presenting projects and skills. The website runs primarily on the client side and uses third-party services and APIs to support dynamic features without requiring a custom backend. EmailJS is used to handle contact form submissions, while the GitHub API is used to display repositories and live GitHub statistics. The application is deployed publicly using Vercel and is accessible as a live web application.

### Scope

* Front-end only (HTML, CSS, JavaScript)
* No custom backend or database integration
* Uses EmailJS as an external service for sending emails
* Uses GitHub API for repositories and profile statistics
* Optimized for desktop and mobile browsers
* Deployed as a live portfolio website
## Architecture

### System Design and Components

The system follows a static front-end architecture composed of:

* **HTML**: Semantic structure of the website
* **CSS**: Layout, theming (light/dark mode), animations, and responsiveness
* **JavaScript**: UI interactivity, API handling, state management, and dynamic updates

* The layout is fully responsive using CSS Grid, Flexbox, and media queries.

### Folder Structure

```
202277080-Raneem-Alshahrani-assignment4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf
│   └── demo-video.mp4
└── .gitignore

```
This structure separates content, styling, logic, and documentation for better maintainability.

### Main Components

* Navigation Bar
* Hero Section
* Scroll Progress Bar
* Visitor Timer Section
* Visitor Name Personalization Section
* About Section
* Projects Section
* GitHub Repositories Section
* GitHub Statistics Cards
* Skills Section
* Contact Form
* Footer

Accessibility considerations include semantic HTML, ARIA attributes, and reduced-motion support.

### User Interaction Flow

* User actions (clicks, toggles, scrolling, navigation) trigger JavaScript event listeners

* Interface preferences (such as theme, font size, and visitor name) are saved using `localStorage`

* Session-specific timing information is saved using `sessionStorage`

* The system updates the UI dynamically without page reload

* GitHub data is fetched asynchronously and rendered dynamically

* Form data is sent securely to EmailJS to deliver messages to the portfolio owner via email

## Dynamic Content

The website includes interactive features where content updates dynamically based on user actions and API responses.

### Implemented Features

* **Project Filtering**
  - Users can filter projects by category (Web, Database, Requirements, AI)
  - The displayed project cards update instantly without page reload

* **Project Sorting**
  - Users can sort projects by:
    - Date (descending)
    - Name (alphabetical)
  - The order of project cards updates dynamically

* **GitHub Repository Rendering**
  - Repositories are fetched dynamically from the GitHub API
  - Repository cards are generated and inserted into the page using JavaScript
  - Repositories are sorted by most recently updated

* **GitHub Statistics**
  - Repository count, total stars, and follower count are fetched dynamically
  - Statistics are displayed in dedicated cards
  - Counters animate smoothly when values are loaded

* **Scroll Progress Bar**
  - A fixed progress bar updates as the user scrolls through the page
  - This gives continuous visual feedback about reading progress

* **Empty State Handling**
  - When no project matches the selected filter, a message is displayed:
    - "No projects found"

These features improve usability by allowing users to explore projects efficiently.

## Data Handling

The application demonstrates client-side data handling using JavaScript.

### Implemented Features

* **Local Storage**
  - Theme preference (light/dark mode) is saved
  - Font size preference is saved
  - Visitor name is stored for personalization
  - Preferences persist across page reloads


* **Session Storage**
  - Tracks how long a visitor has been on the site during a session
  
* **Form Validation**
  - The contact form validates:
    - Required fields
    - Email format using regular expressions
  - Invalid input triggers error messages

* **Email Sending (EmailJS)**
  - Form data is sent to EmailJS
  - Emails are delivered to the portfolio owner
  - Auto-reply is sent to the user

* **GitHub API Data**
  - Repository data is fetched from the GitHub REST API
  - User profile data is fetched to retrieve follower count
  - Repository descriptions are sanitised before rendering to reduce XSS risk

* **Error Handling**
  - If email sending fails, a message is displayed:
    - "Failed to send. Please try again."
  - If GitHub data cannot be loaded, an error message is displayed:
    - "Unable to load repositories. Please try again later."
    
## Animation and Transitions

The website includes smooth animations to improve user experience.

### Implemented Features

* **Scroll Reveal Animation**
  - Sections fade and slide into view when scrolling
  - Implemented using `IntersectionObserver`

* **Hover Effects**
  - Buttons, project cards, repository cards, stat cards, and links respond visually on hover

* **Form Feedback Animation**
  - Success and error messages appear with smooth transitions

* **Animated GitHub Counters**
  - GitHub statistic values animate from zero to their loaded values
  - Implemented using `requestAnimationFrame`

These animations enhance interactivity while maintaining performance and usability.

## Error Handling and User Feedback

The application provides clear feedback for user actions.

### Implemented Feedback

* **Form Validation Errors**
  - Empty fields → "Please fill in all fields"
  - Invalid email → "Please enter a valid email address"

* **Success Messages**
  - Displayed after successful form submission

* **Failure Messages**
  - Displayed if email sending fails
  - Displayed if GitHub repositories cannot be loaded

* **Empty State**
  - "No projects found" when filters return no results

These messages ensure the user always understands what is happening.

## Installation

### Prerequisites

* A modern web browser (Chrome, Firefox, Edge, Safari)
* Optional: VS Code with Live Server extension for local development
* Internet connection for EmailJS and GitHub API features

### Setup Instructions

1. Download or clone the repository.
2. Ensure all project folders remain in the same directory structure.

```
202277080-Raneem-Alshahrani-assignment4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf
│   └── demo-video.mp4
└── .gitignore

```

3. Open `index.html` directly in a browser **or**
4. Use the Live Server extension in VS Code for local development.

No additional build tools or package installation are required.

## Configuration

* No environment variables required
* Theme, font size, and visitor name preferences are automatically saved in the browser
* EmailJS requires a valid Service ID, Template ID, and Public Key
* GitHub data depends on the availability of the GitHub public API

## Usage

### How to Use the Website

* Navigate using the top navigation bar
* Scroll to view different sections
* Use buttons in the navigation bar to:
  * Toggle Light/Dark Mode
  * Increase/Decrease Font Size
  * Open Mobile Menu (on small screens)

### Common Workflows

* **Viewing Projects**: Scroll to the Projects section
* **Filtering Projects**: Select a project category from the filter dropdown
* **Sorting Projects**: Use "Sort by Date" or "Sort by Name"
* **Viewing GitHub Data**: Scroll to the GitHub section to see repositories and live statistics
* **Changing Theme**: Click the moon/sun icon
* **Adjusting Font Size**: Click the A+/A- button
* **Using Personalization**: Enter a visitor name and save it
* **Tracking Progress**: Observe the progress bar while scrolling
* **Mobile Navigation**: Click ☰ on mobile view
* **Contacting**: Fill out the contact form to send an email
* **Example User Interaction**:
  - Select "AI" in the project filter → Only AI projects are displayed
  - Select a category with no results → "No projects found" message appears

  - Click "Sort by Date" → Projects reorder from newest to oldest
  - Click "Sort by Name" → Projects reorder alphabetically
    
  - Scroll through the page → Progress bar updates in real time
  - Visit the GitHub section → Repository cards and GitHub statistics load dynamically

  - Submit the contact form with missing fields → Error message is shown
  - Submit with valid input → Success message appears and email is sent
  
## API Reference

This project uses a third-party API service (EmailJS) for sending emails.

### GitHub API Integration

* Fetches public repositories for the portfolio owner
* Fetches GitHub user profile data for follower count
* Supports:
  - Repository rendering
  - Sorting by latest update
  - Total star calculation
  - Follower count display

Example:

```js
fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`)
fetch(`https://api.github.com/users/${GH_USER}`)
```

### EmailJS Integration

* Sends contact form data via JavaScript
* No backend server required
* Handles:
  - Email delivery
  - Auto-reply functionality

Example:

```js
emailjs.send(serviceID, templateID, {
  from_name,
  from_email,
  subject,
  message
});
```

### Internal JavaScript Functions (Examples)

* `applyTheme(theme)` – switches between light and dark modes
* `applyFont(px)` – updates font size and stores preference
* `openMenu()` / `closeMenu()` – controls mobile menu visibility
* `filterProjects()` – filters and sorts visible project cards
* `animateCounter(el, target)` – animates GitHub statistics
* `IntersectionObserver` – triggers scroll-based animations

# Deployment

### Live Application
* The project is deployed publicly using Vercel
* Live URL: https://raneem-dev.vercel.app/

### Deployment Notes

* Static assets are served directly
* No backend deployment is required
* Deployment makes the portfolio publicly accessible for review and presentation

## Troubleshooting

### Common Issues

* **Issue**: GitHub repositories do not load
  **Solution**: Check internet connection or GitHub API availability

* **Issue**: GitHub statistics show dashes instead of numbers
* **Solution**: Verify the GitHub API requests succeeded and the username is correct

* **Issue**: Dark icons not visible in dark mode  
  **Solution**: Apply the `dark-invert` CSS class to black icons

* **Issue**: Mobile menu does not close  
  **Solution**: Ensure the `.hidden` class is applied correctly and JavaScript event listeners are active

* **Issue**: Theme or font size resets on refresh  
  **Solution**: Verify `localStorage` access is not blocked by the browser

* **Issue**: Email not sending  
  **Solution**: Verify EmailJS Service ID, Template ID, and Public Key

* **Issue**: Project filter not working  
  **Solution**: Ensure JavaScript is loaded and no console errors exist

## Contributing

### Contribution Guidelines

This project is currently a personal academic portfolio and not open for external contributions.

### Development Setup

* Modify HTML for content updates
* Update CSS variables for design changes
* Extend JavaScript for new UI features

## References

* Zybook course material  
* W3Schools  
* YouTube tutorials  

## Conclusion

This portfolio website demonstrates a structured front-end architecture, dynamic content handling, API integration, user interaction, and integration with external services (EmailJS), deployment. It showcases modern JavaScript techniques, responsive design, state management, and user-centered feedback mechanisms in a professional and publicly accessible web application.