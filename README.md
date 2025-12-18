<div align="center">
<H1> DeStill </H1>
</div>
<H2>Let's Dive into the app!</H2>

De-Still is an AI-powered decision structuring prototype designed to help users cut through mental clutter and identify what matters most right now. Instead of generating long advice or generic responses, De-Still focuses on producing one clear priority and one concrete next action from messy, unstructured inputs.

<h3><b>Why De-Still Exists:</b></h3>

People often have too many thoughts, tasks, and constraints competing for attention. The problem is not a lack of information, but a lack of clarity. De-Still is built to reduce cognitive overload by forcing structured prioritization rather than expanding the problem space.

<h3><b></b>What De-Still Does:</b></h3>

<unol>De-Still accepts free-form text and optional context from the user and applies structured reasoning with constraints to distill the input into:

<li>One primary priority</li>

<li>One actionable next step</li>

<li>A short, focused justification explaining why this action matters now</li>

<li>The system is intentionally designed to avoid long explanations and instead push the user toward clarity and execution.</li></unol>

<h3><B></B>How It Works (High-Level):</h3></B>

User input is processed through a decision engine that applies structured prompts and system-level constraints using the Google Gemini API. The AI output is then filtered and presented in a minimal interface that emphasizes decisiveness over verbosity.

The current implementation is a frontend-only prototype optimized for rapid experimentation and iteration.

<h3><b></b>Tech Stack:</h3></b>

<li>Frontend: React, TypeScript, Vite</li>
<li>AI Model: Google Gemini API</li>
<li>Architecture: Client-side prototype with environment-based API configuration</li>


<b><em>Local Setup Instructions:</em></b>

To run De-Still locally, clone the repository and install the required dependencies using npm. Create a file named .env.local in the project root and add your own Google Gemini API key using the variable name VITE_GOOGLE_API_KEY. After setting up the environment variable, start the development server using npm run dev.

<h3></b>Environment Variables and Security:</h3></b>

API keys are not included in this repository. Each user is expected to supply their own key via a local environment file. This approach is suitable for prototyping and local experimentation. For production use, API calls should be moved to a backend service to prevent exposing credentials in the browser.

<h3><b>Quota and Usage Notes:</b></h3>

This project uses Gemini free-tier quotas. Heavy or repeated usage may trigger rate limits or temporary failures. The application includes basic error handling to account for quota exhaustion and transient API errors.

<h4><b>Current Status:</b></h4>

De-Still is a functional prototype intended to demonstrate decision structuring, AI integration, and frontend architecture. It is not yet optimized for production deployment.

<h3><b>Future Improvements:</b></h3>

Planned enhancements include moving AI calls to a secure backend, adding request caching to reduce API usage, improving prompt robustness, and expanding decision explainability without increasing verbosity

