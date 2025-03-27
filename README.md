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
```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure the environment variables
4. Deploy

## Project Structure

```
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
