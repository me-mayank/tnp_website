# TPC Next.js

This is the Next.js version of the TPC (Training and Placement Cell) website for IET Lucknow.

## Getting Started

### 1. Install Dependencies

```bash
cd tpc-new
npm install
```

### 2. Copy Static Assets

Before running the project, you need to copy the static assets:

```bash
# From the root TPC directory, copy:
# - images/ folder to tpc-new/public/images/
# - files/ folder to tpc-new/public/files/
# - CNAME file to tpc-new/public/CNAME
```

Or manually:
- Copy `d:\TNP Website\TPC\images\` to `d:\TNP Website\TPC\tpc-new\public\images\`
- Copy `d:\TNP Website\TPC\files\` to `d:\TNP Website\TPC\tpc-new\public\files\`
- Copy `d:\TNP Website\TPC\CNAME` to `d:\TNP Website\TPC\tpc-new\public\CNAME`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production

```bash
npm run build
```

This will create a static export in the `out/` folder.

## Project Structure

```
tpc-new/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Header
│   ├── page.tsx           # Homepage
│   ├── downloads/         # Downloads page
│   ├── faq/              # FAQ page
│   ├── tpc/              # TPC pages (about, contact)
│   ├── insights/         # Insights pages
│   └── recruiters/       # Recruiter pages
├── components/            # Reusable React components
│   └── Header.tsx        # Navigation header
├── public/               # Static files
│   ├── images/          # Images
│   ├── files/           # PDF and document files
│   └── CNAME            # Custom domain file
├── styles/              
│   └── globals.css      # Global styles with Tailwind
├── tailwind.config.ts   # Tailwind configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies

```

## Key Features

- ✅ **Static Export**: Configured for static HTML export
- ✅ **Tailwind CSS**: All styling preserved using Tailwind
- ✅ **Responsive Design**: Mobile-first approach maintained
- ✅ **SEO Optimized**: Metadata and semantic HTML
- ✅ **TypeScript**: Type-safe development
- ✅ **Fast Performance**: Optimized builds with Next.js


