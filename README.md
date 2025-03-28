<<<<<<< Updated upstream
=======
<<<<<<< HEAD
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
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Backend/Database**: [Supabase](https://supabase.io/)
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

=======
>>>>>>> Stashed changes
# E-Commerce Platform

A modern e-commerce application built with Nuxt 3, Tailwind CSS, and Supabase.

## Technologies

- **Frontend**: [Nuxt 3](https://nuxt.com/) with Vue.js
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Form Handling**: [VeeValidate](https://vee-validate.logaretm.com/v4/) with [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Runtime**: [Bun](https://bun.sh/)
- **Testing**: Jest
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Node.js](https://nodejs.org/) (recommended v16+)
- [Supabase](https://supabase.com/) account and project setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/e-commerce.git
   cd e-commerce
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     NUXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NUXT_PUBLIC_SUPABASE_KEY=your-supabase-anon-key
     ```

### Development

Start the development server:
<<<<<<< Updated upstream
=======
>>>>>>> 7350e96b6bfb77334f465f61f3d6b59dd8395f65
>>>>>>> Stashed changes
```bash
bun run dev
```

<<<<<<< Updated upstream
The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production
=======
<<<<<<< HEAD
## Building for Production

Build the application for production:
=======
The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production
>>>>>>> 7350e96b6bfb77334f465f61f3d6b59dd8395f65
>>>>>>> Stashed changes

```bash
bun run build
```

<<<<<<< Updated upstream
### Preview Production Build
=======
<<<<<<< HEAD
Preview the production build locally:
=======
### Preview Production Build
>>>>>>> 7350e96b6bfb77334f465f61f3d6b59dd8395f65
>>>>>>> Stashed changes

```bash
bun run preview
```

## Deployment

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
The application is configured for deployment on Vercel. Just connect your GitHub repository to Vercel and it will automatically deploy your application.

Make sure to set the environment variables in the Vercel dashboard.
=======
>>>>>>> Stashed changes
This project is configured for deployment on [Vercel](https://vercel.com).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure the environment variables
4. Deploy
<<<<<<< Updated upstream
=======
>>>>>>> 7350e96b6bfb77334f465f61f3d6b59dd8395f65
>>>>>>> Stashed changes

## Project Structure

```
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
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
=======
>>>>>>> Stashed changes
e-commerce/
├── .nuxt/          # Nuxt build files
├── .output/        # Production build output
├── assets/         # Static assets
├── components/     # Vue components
│   └── ui/         # Shadcn UI components
├── layouts/        # Page layouts
├── lib/            # Utility functions
├── pages/          # Application pages and routes
├── public/         # Public static files
├── stores/         # Pinia stores
├── supabase/       # Supabase configuration
├── types/          # TypeScript types
├── app.vue         # App entry
├── nuxt.config.ts  # Nuxt configuration
└── tailwind.config.ts # Tailwind configuration
```

## Contributing   

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
<<<<<<< Updated upstream
=======
>>>>>>> 7350e96b6bfb77334f465f61f3d6b59dd8395f65
>>>>>>> Stashed changes
