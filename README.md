# E-Shop: Modern E-commerce Platform

A full-featured e-commerce application built with Nuxt 3, Tailwind CSS, Shadcn UI, and Supabase.

![E-Shop Preview](https://placehold.co/800x400/e2e8f0/1e293b?text=E-Shop+Preview)

## Features

- 🛍️ Product browsing and filtering
- 🛒 Shopping cart for unauthorized users
- 👤 User authentication with Supabase
- 💳 Checkout process
- 🔍 Product search and categorization
- 📱 Responsive design for all devices
- 🌈 Modern UI with Tailwind CSS and Shadcn UI
- 📊 Supabase integration for data storage

## Tech Stack

- **Frontend**: [Nuxt 3](https://nuxt.com/) with TypeScript
- **UI Components**: [Shadcn UI](https://shadcn-vue.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Runtime**: [Bun](https://bun.sh/)

## Prerequisites

- Node.js 18 or higher
- Bun
- Supabase account and project

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/new-e-commerce.git
cd new-e-commerce
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

Create a `.env` file in the root directory with the following content:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
```

4. Set up your Supabase database:

Import the schema from `supabase/schema.sql` into your Supabase project.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Building for Production

Build the application for production:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Deployment Instructions

### Prerequisites
- A Supabase account and project
- A Vercel account

### Environment Setup
1. Create a `.env` file at the root of your project with the following variables:
```makefile
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### Deploying to Vercel
1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel
3. In the Vercel project settings, add the following environment variables:
   - `NUXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NUXT_PUBLIC_SUPABASE_KEY`: Your Supabase public (anon) key
4. Deploy your application

### Running Locally
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Internationalization
The application supports multiple languages:
- English
- Portuguese

Language files are located in the `i18n/locales/` directory.

## Project Structure

```
new-e-commerce/
├── .nuxt/               # Generated Nuxt files
├── assets/              # Static assets like CSS
├── components/          # Vue components
│   └── ui/              # Shadcn UI components
├── pages/               # Application pages
├── public/              # Public static files
├── server/              # Server-side code
│   └── utils/           # Server utilities
├── services/            # API services
├── stores/              # Pinia stores
├── supabase/            # Supabase configuration and schema
├── app.vue              # Main application component
├── nuxt.config.ts       # Nuxt configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Database Schema

The application uses a Supabase PostgreSQL database with the following tables:

- `products`: Store product information
- `categories`: Product categories
- `product_categories`: Many-to-many relationship between products and categories
- `orders`: Customer orders
- `order_items`: Items within orders
- `profiles`: Extended user profiles

See the complete schema in `supabase/schema.sql`.

## Extending the Application

### Adding New Components

Use the Shadcn UI CLI to add new components:

```bash
bunx shadcn-vue@latest add [component-name]
```

### Adding New Pages

Create new `.vue` files in the `pages` directory. Nuxt will automatically create routes based on the file structure.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Nuxt.js](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://shadcn-vue.com/)
- [Supabase](https://supabase.io/)
