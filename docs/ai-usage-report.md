# AI Usage Report

---

## Overview
This project is a front-end personal portfolio website developed to showcase academic background, technical skills, and projects. It runs entirely on the client side using HTML, CSS, and JavaScript, with EmailJS for contact handling and the GitHub API for dynamic data.

The system is lightweight, responsive, and requires no backend or build tools. It is also deployed as a live web application for public access.

---

## AI Tools Used

**ChatGPT**:
- Helped explain JavaScript concepts and API usage  
- Assisted with debugging logic and UI issues  
- Helped refine feature descriptions and documentation wording


**Claude AI**:
- Performed code review (CSS & JS)  
- Suggested performance optimisations  
- Helped debug GitHub API display issue  
- Assisted in improving code structure and documentation   

---

## Effective Use of AI

### 1. Code Review
AI identified redundant CSS rules and inefficient JavaScript logic, improving code quality, readability, and maintainability.

### 2. Performance Optimisation
Suggested improvements such as using `defer` for scripts, lazy loading images, and reducing unnecessary DOM operations, and keeping code more efficient and organized.

### 3. Debugging
Helped diagnose a visibility issue in the GitHub section caused by interaction between animations and dynamically loaded content.

### 4. API Integration
Provided guidance on using the GitHub API, handling asynchronous data, sorting repositories, and managing errors. This was later extended to support live GitHub statistics such as repository count, total stars, and follower count.

### 5. Security Improvement
Introduced sanitisation of dynamically injected API data to reduce the risk of XSS when using `innerHTML`.

### 6. Feature Enhancement
AI assisted in refining additional features such as the scroll progress bar and improving the logic behind dynamic UI updates, including animated counters for GitHub statistics.

---

## Learning Outcomes

### HTML Concepts Learned:
- Semantic structure and accessibility (ARIA)
- Responsive layout design
- Structuring sections for both usability and maintainability

### CSS Concepts Learned:
- CSS variables and theming  
- Avoiding redundant rules  
- Managing specificity and reducing misuse of `!important`  
- Styling dynamic UI elements such as stat cards and progress indicators

### JavaScript Concepts Learned:
- API fetching and async handling  
- localStorage vs sessionStorage  
- DOM optimisation (caching elements)  
- IntersectionObserver behavior 
- State-based UI updates   
- Event-driven UI interactions (scroll tracking, dynamic updates)
- Combining multiple API responses in one feature

---

## Benefits & Challenges

### Benefits
- Faster debugging and problem-solving  
- Improved code quality and performance  
- Better understanding of real-world issues  
- Stronger confidence in writing cleaner and more maintainable JavaScript

### Challenge 1:
GitHub repositories were not visible due to a conflict between animations and dynamically loaded content.

### Challenge 2:
CSS conflicts caused by improper styling decisions, leading to inconsistent UI behavior.

### Challenge 3:
Project filtering and sorting logic interfered with each other, requiring better state management to ensure correct results.

### Challenge 4:
Form validation required handling multiple edge cases (empty fields, invalid email, async submission feedback).

### Challenge 5:
Implementing live GitHub statistics required combining data from repository and user profile API responses while keeping the UI clear and responsive.

### Challenge 6:
Adding a scroll progress bar required calculating scroll position correctly across different viewport sizes without affecting page performance.

---

## Responsible Use & Modifications

- All AI outputs were reviewed and tested  
- Code was modified to fit project requirements  
- No full features were copied directly without understanding    
- Understanding was prioritised over copying  
- AI suggestions were treated as support and not accepted blindly

---

## Innovation

- Integrated live GitHub data dynamically  
- Added GitHub statistics (repositories, stars, followers) with animated counters
- Combined filtering and sorting logic in one system  
- Added visitor personalization using localStorage  
- Implemented session-based visitor timer  
- Added scroll progress tracking for improved user experience
- Applied performance and security improvements   
- Deployed the project as a live portfolio website

---

## Conclusion

AI was used as a support tool for debugging, optimisation, and learning. It improved development efficiency without replacing understanding or originality. The final project reflects independent implementation enhanced by AI-assisted refinement.