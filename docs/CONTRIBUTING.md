# 🗺️ Knowledge Map: Contributing to lyn-housing-ai-app 🤝

## Overview
**Lyn Housing AI App** encourages contributions in various forms, including code, documentation, bug reports, feature suggestions, and UX/UI ideas. 

- Maintained by [@ndmh99](https://github.com/ndmh99).

---

## How to Contribute

### 1. Fork the Repository
- Click the **Fork** button at the top-right of [the main repo](https://github.com/ndmh99/lyn-housing-ai-app) to create your copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/lyn-housing-ai-app.git
cd lyn-housing-ai-app
```

### 3. Create a Feature Branch
- Follow naming conventions:
  - New features: `feature/your-descriptive-branch-name`
  - Bug fixes: `fix/issue-description`
```bash
git checkout -b feature/your-feature
```

### 4. Setup Your Development Environment

#### Backend Setup:
```bash
cd backend
python -m venv venv
# Activate virtual environment
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend Setup:
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Make Your Changes
- Ensure code clarity and documentation.
- Follow coding style guides:
  - For Python: [PEP8](https://www.python.org/dev/peps/pep-0008/)
  - For JavaScript: [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)
- Use meaningful commit messages (e.g., `feat: add AI listing route`, `fix: handle missing credential bug`).

### 6. Run Tests
- Add and execute tests relevant to your contributions (located in `tests/` directory).
- Ensure both backend and frontend builds pass and function together.

### 7. Push and Open a Pull Request
```bash
git push origin feature/your-feature
```
- Go to your fork on GitHub and click **Compare & pull request**.
- Include a clear description of changes, reference issues (e.g., `Closes #42`), and add screenshots for UI work if applicable.

---

## Code of Conduct
- Be respectful, collaborative, and open to feedback.
- Agree to maintain a welcoming and harassment-free environment for all participants.

---

## Contribution Tips
- Read the [README.md](./README.md) for project context before contributing.
- Open an [issue](https://github.com/ndmh99/lyn-housing-ai-app/issues) for major feature proposals before coding.
- Write or update tests for your contributions.
- Discuss major changes or refactors via issues or pull request comments.
- Use clear naming conventions and keep the codebase clean and DRY (Don't Repeat Yourself).

---

## Need Help?
- Open an [issue](https://github.com/ndmh99/lyn-housing-ai-app/issues) or ask questions in your Pull Request.  
- Your ideas and inquiries help improve the project!

---

**Thank you for contributing to building an intelligent, open future web app!** 🏡✨