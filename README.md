# BlogSpace - Modern Blog Platform

A modern, responsive blog platform built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean black and white design with dark/light theme support and server-side rendering for optimal performance.

🌐 **Live Demo**: [https://blog-space-one-dun.vercel.app/](https://blog-space-one-dun.vercel.app/)

## ✨ Features

- **Modern UI Design**: Clean, responsive interface with glassmorphism effects
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Server-Side Rendering**: Fast loading with Next.js App Router
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Server-side data fetching for better search engine visibility
- **Error Handling**: Comprehensive error boundaries and loading states
- **Caching**: Optimized data fetching with Next.js built-in caching

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (Mock REST API)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blogspace
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Pages

### Homepage (`/`)

- Welcome message with modern hero section
- Features overview with icons
- Call-to-action to browse posts
- **Rendering**: Static Site Generation (SSG)

### Posts Listing (`/posts`)

- Grid layout of blog post cards
- Author information and post previews
- Responsive design with loading states
- **Rendering**: Server-Side Rendering (SSR)

### Post Detail (`/posts/[id]`)

- Full post content with author details
- Comments section with user avatars
- Breadcrumb navigation
- **Rendering**: Dynamic Server-Side Rendering

## 🎨 Design Features

- **Color Scheme**: Elegant black and white palette
- **Typography**: Inter font for optimal readability
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Animations**: Smooth transitions and hover effects
- **Icons**: Custom SVG icons throughout the interface
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🔧 API Integration

The application fetches data from JSONPlaceholder API:

- **Posts**: `/posts` - Blog post content
- **Users**: `/users` - Author information
- **Comments**: `/comments?postId={id}` - Post comments

### API Functions (`lib/api.ts`)

```typescript
fetchPosts(); // Get all posts
fetchUsers(); // Get all users
fetchPost(id); // Get single post
fetchUser(id); // Get single user
fetchComments(postId); // Get post comments
```

## 🌙 Theme System

The application includes a custom theme system with:

- **Theme Context**: React Context for global theme state
- **Persistent Storage**: Theme preference saved to localStorage
- **CSS Variables**: Dynamic theme switching with Tailwind CSS
- **Theme Toggle**: Animated sun/moon icon in header

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🚀 Deployment

The application is deployed on Vercel. To deploy your own instance:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on every push

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```
