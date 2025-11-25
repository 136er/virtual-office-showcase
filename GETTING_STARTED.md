# 🚀 Getting Started - Simple Guide

Welcome! This guide will help you use this project in simple, easy steps.

## What is this project?

This is a website that shows how AI agents work together. It's like a virtual office with 5 smart AI workers.

## 📥 How to Get the Code

You have **two ways** to get the code:

### Option 1: Clone with Git (Recommended)

This is best if you want to make changes and keep them updated.

**Step 1:** Open your terminal (command line)

**Step 2:** Copy and paste this command:

```bash
git clone https://github.com/136er/virtual-office-showcase.git
```

**Step 3:** Go into the folder:

```bash
cd virtual-office-showcase
```

### Option 2: Download as ZIP

This is easier if you just want to look at the code.

**Step 1:** Go to the repository on GitHub:

- Visit: https://github.com/136er/virtual-office-showcase

**Step 2:** Click the green "Code" button

**Step 3:** Click "Download ZIP"

**Step 4:** Unzip the file on your computer

**Step 5:** Open the folder in your terminal

## 💻 How to Run the Website

Follow these simple steps in order:

### Step 1: Install Node.js

You need Node.js version 22 or newer.

- Download from: https://nodejs.org/
- Choose the version marked "LTS" (Long Term Support)
- Install it like any other program

### Step 2: Install pnpm

pnpm is a tool that helps install other tools. Open your terminal and run:

```bash
npm install -g pnpm
```

### Step 3: Install Project Dependencies

Dependencies are like ingredients for cooking - the project needs them to work.

In your terminal, inside the project folder, run:

```bash
pnpm install
```

This will take a few minutes. Wait for it to finish.

### Step 4: Start the Website

Now you can start the website on your computer:

```bash
pnpm dev
```

You'll see a message like:

```
Local: http://localhost:3000/
```

### Step 5: Open in Your Browser

- Open your web browser (Chrome, Firefox, Safari, etc.)
- Type `http://localhost:3000` in the address bar
- Press Enter

**Congratulations!** 🎉 The website is now running on your computer!

## 🛑 How to Stop the Website

When you're done, press `Ctrl + C` in your terminal to stop the server.

## 📁 What's Inside?

Here's what each folder does (in simple words):

- **client/** - The website you see (the "frontend")
  - **pages/** - Different pages of the website (Home, Demo, etc.)
  - **components/** - Reusable pieces like buttons and cards
- **server/** - The behind-the-scenes code (the "backend")

- **virtual_office.py** - The AI agents code (Python)

- **README.md** - Full project documentation

## 🎨 How to Make Changes

1. Open the project folder in a code editor (like VS Code)
2. Find the file you want to change
3. Make your changes
4. Save the file
5. The website will automatically update! (if `pnpm dev` is running)

### Where to Make Common Changes:

- **Change the homepage:** Edit `client/src/pages/Home.tsx`
- **Change the demo page:** Edit `client/src/pages/Demo.tsx`
- **Change colors/styles:** Edit files in `client/src/components/ui/`

## 🏗️ How to Build for Production

When you're ready to put your website online:

```bash
pnpm build
```

This creates a `dist` folder with files ready to deploy.

## ❓ Common Problems and Solutions

### Problem: "command not found: pnpm"

**Solution:** Install pnpm first with `npm install -g pnpm`

### Problem: "Port 3000 is already in use"

**Solution:** Either:

- Stop other programs using port 3000, OR
- The project will automatically use port 3001 instead

### Problem: "Cannot find module..."

**Solution:** Run `pnpm install` again

## 🆘 Need More Help?

- Read the full documentation: [README.md](README.md)
- Check the project on GitHub: https://github.com/136er/virtual-office-showcase
- Look at the code examples: Run the website and visit the "Code" page

## 🎯 What Can You Do Next?

1. **Try the Live Demo:** Click on "Live Demo" on the homepage
2. **See the Code Examples:** Visit the "Code" page
3. **Change something:** Try changing text in `Home.tsx` and see it update
4. **Learn more:** Read about each AI agent on the homepage

---

**Remember:** If something doesn't work, make sure you:

1. Installed Node.js (version 22+)
2. Ran `pnpm install`
3. Are inside the project folder in your terminal

Happy coding! 🚀
