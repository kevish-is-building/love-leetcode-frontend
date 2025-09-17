# 🤝 Contributing to LoveLeetCode

Thank you for your interest in contributing to LoveLeetCode! We're excited to have you as part of our community. This guide will help you get started with contributing to our project.

## 🎃 Hacktoberfest 2025

We're participating in **Hacktoberfest 2025**! This is a great opportunity for both beginners and experienced developers to contribute to open source.

### What is Hacktoberfest?
Hacktoberfest is a month-long celebration of open source software run by DigitalOcean. During the month of October, anyone can contribute to open source projects and earn awesome swag!

### Hacktoberfest Rules 2025:
- **Quality over Quantity**: PRs must be meaningful and add value
- **No Spam**: Low-quality PRs (like adding your name to a contributors list) will be marked as spam
- **Four Quality PRs**: Complete 4 high-quality pull requests to earn rewards
- **Maintainer Approval**: PRs must be approved by maintainers
- **Timeline**: October 1-31, 2025

## 🚀 Quick Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- A GitHub account

### Development Setup

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/love-leetcode-frontend.git
   cd love-leetcode-frontend
   ```

2. **Set Up Remote**
   ```bash
   # Add the original repository as upstream
   git remote add upstream https://github.com/kevish-is-building/love-leetcode-frontend.git
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

5. **Run Tests** (if available)
   ```bash
   npm test
   ```

## 📋 How to Contribute

### Types of Contributions We Welcome

1. **🐛 Bug Fixes**
   - Fix existing bugs
   - Improve error handling
   - Performance optimizations

2. **✨ New Features**
   - Add new problem categories
   - Improve UI/UX
   - Add search functionality
   - Implement new algorithms

3. **📚 Documentation**
   - Improve README
   - Add code comments
   - Create tutorials
   - Write problem explanations

4. **🎨 Design Improvements**
   - Better responsive design
   - Accessibility improvements
   - Dark mode enhancements
   - Animation improvements

5. **🧪 Testing**
   - Add unit tests
   - Integration tests
   - E2E tests

### Step-by-Step Contribution Process

1. **Find an Issue**
   - Check our [Issues](https://github.com/kevish-is-building/love-leetcode-frontend/issues)
   - Look for labels: `good first issue`, `hacktoberfest`, `help wanted`
   - Comment on the issue to get it assigned

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Test your changes locally

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve issue description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin your-branch-name
   ```
   Then create a Pull Request on GitHub.

## 📝 Coding Guidelines

### Code Style
- Use **ES6+** syntax
- Use **functional components** with hooks
- Follow **camelCase** for variables and functions
- Use **PascalCase** for components
- Add **PropTypes** or **TypeScript** types
- Keep components **small and focused**

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

feat: add new problem solver component
fix: resolve mobile responsiveness issue
docs: update installation instructions
style: improve button component styling
refactor: optimize algorithm implementation
test: add unit tests for utility functions
```

### Code Example
```jsx
// ✅ Good
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProblemCard = ({ problem, onSolve }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSolve = async () => {
    setIsLoading(true);
    try {
      await onSolve(problem.id);
    } catch (error) {
      console.error('Error solving problem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="problem-card">
      <h3>{problem.title}</h3>
      <button onClick={handleSolve} disabled={isLoading}>
        {isLoading ? 'Solving...' : 'Solve'}
      </button>
    </div>
  );
};

ProblemCard.propTypes = {
  problem: PropTypes.object.isRequired,
  onSolve: PropTypes.func.isRequired,
};

export default ProblemCard;
```

## 🏷️ Issue Labels

- `good first issue` - Perfect for newcomers
- `hacktoberfest` - Hacktoberfest-friendly issues
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `help wanted` - Extra attention is needed
- `priority: high` - Should be addressed soon
- `difficulty: easy` - Good for beginners
- `difficulty: medium` - Requires some experience
- `difficulty: hard` - Requires significant experience

## 🔍 Pull Request Guidelines

### Before Submitting
- [ ] Test your changes locally
- [ ] Check for console errors
- [ ] Ensure responsive design works
- [ ] Update documentation if needed
- [ ] Add tests if applicable

### PR Template
When creating a PR, please include:

1. **Description**: What does this PR do?
2. **Issue**: Link to related issue
3. **Type of Change**: Bug fix, feature, docs, etc.
4. **Testing**: How was this tested?
5. **Screenshots**: For UI changes
6. **Checklist**: Complete the checklist

### PR Review Process
1. **Automated Checks**: CI/CD must pass
2. **Code Review**: Maintainer review
3. **Testing**: Manual testing if needed
4. **Approval**: At least one maintainer approval
5. **Merge**: Squash and merge

## 🎯 Hacktoberfest-Specific Guidelines

### What Makes a Quality PR?
- **Solves a Real Problem**: Addresses an actual issue
- **Adds Value**: Improves the project meaningfully
- **Well Documented**: Clear description and comments
- **Tested**: Works as intended
- **Follows Guidelines**: Adheres to our coding standards

### Examples of Quality Contributions
- Fixing a bug that affects user experience
- Adding a new feature that users have requested
- Improving accessibility
- Optimizing performance
- Adding comprehensive tests
- Improving documentation with examples

### What Will Be Marked as Spam
- Adding your name to a contributors list without other changes
- Making trivial changes (like fixing typos) just to increase PR count
- Copy-pasting code without understanding
- PRs that break existing functionality
- Low-effort changes that don't add value

## 🆘 Getting Help

### Where to Ask Questions
- **GitHub Discussions**: For general questions
- **Issues**: For bug reports and feature requests
- **Discord/Slack**: Real-time chat (if available)
- **Email**: For private concerns

### Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)

## 🏆 Recognition

Contributors will be recognized in:
- **README**: Contributors section
- **Website**: Contributors page
- **Social Media**: Shoutouts for significant contributions
- **Hacktoberfest**: Digital rewards and swag

## 📞 Contact

- **Project Maintainer**: [@kevish-is-building](https://github.com/kevish-is-building)
- **Email**: kevish.is.building@gmail.com
- **Twitter**: [@kevish_is_building](https://twitter.com/kevish_is_building)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Happy Coding! 🚀**

Thank you for contributing to LoveLeetCode. Together, we're building something amazing for the coding community! ❤️