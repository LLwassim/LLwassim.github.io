# Wassim LaCorchy - Software Engineer Portfolio

A modern, performant portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (Static Export)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx     # Home page (Projects)
│   │   └── experience/  # Experience page
│   ├── components/
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Hero, ProjectGrid, etc.
│   │   ├── ui/          # Reusable UI components
│   │   └── providers/   # Theme provider
│   ├── data/            # Project and experience data
│   ├── types/           # TypeScript types
│   ├── config/          # Site configuration
│   └── lib/             # Utility functions
├── public/
│   └── images/          # Static images
└── package.json
```

## 📝 Content Management

To update your portfolio content:

1. **Projects**: Edit `src/data/projects.ts`
2. **Experience**: Edit `src/data/experiences.ts`
3. **Site Info**: Edit `src/config/site.ts`

## 🚀 Deployment

### Build for GitHub Pages

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Deploy to GitHub Pages

1. Push changes to your repository
2. GitHub Actions will automatically build and deploy
3. Your site will be live at `https://llwassim.github.io`

## 🎨 Features

- ✨ Modern, clean design
- 🌙 Dark mode support
- 📱 Fully responsive
- ⚡ Fast page loads
- 🎯 SEO optimized
- ♿ Accessible (WCAG AA)
- 🖼️ Optimized images

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

**Wassim LaCorchy**

- GitHub: [@LLwassim](https://github.com/LLwassim)
- LinkedIn: [wassimlacorchy](https://www.linkedin.com/in/wassimlacorchy/)
- Email: wassimlacorchy@gmail.com
