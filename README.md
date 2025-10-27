# 🧁 Online Bakery Shop

A modern online bakery shop built with Next.js that allows customers to browse and order bakery items from multiple bakery locations. The system intelligently manages inventory across different bakery locations and delivers items from the nearest bakery based on customer location.

## 🚀 Features

- **Multi-Location Delivery**: Items are delivered from the nearest bakery based on customer's pincode
- **Item Management**: Complete CRUD operations for bakery items with image uploads
- **Bakery Management**: Manage multiple bakery locations with pincode-based delivery zones
- **RESTful API**: Well-structured API endpoints for items and bakeries
- **Database Integration**: PostgreSQL database with Drizzle ORM for efficient data management
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Modern UI**: Built with Next.js 16 and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas
- **Styling**: Tailwind CSS
- **File Upload**: Native Node.js file handling

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── items/             # Item API endpoints
│   │   │   ├── route.ts       # GET all items, POST new item
│   │   │   └── [id]/route.ts  # GET item by ID
│   │   └── bakeries/          # Bakery API endpoints
│   │       ├── route.ts       # GET all bakeries, POST new bakery
│   │       └── [id]/route.ts  # GET, DELETE bakery by ID
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── db/
│   │   ├── db.ts             # Database connection
│   │   └── schema.ts         # Database schemas
│   └── validators/
│       ├── itemSchema.ts      # Item validation schema
│       └── bakerySchema.ts    # Bakery validation schema
├── drizzle/                  # Database migrations
└── public/assets/            # Uploaded item images
```

## 🗄️ Database Schema

### Items Table
- `id`: Serial primary key
- `name`: Item name (varchar 100)
- `description`: Item description (text)
- `price`: Price in cents (integer)
- `image`: Image filename (text)
- `createdAt`, `updatedAt`: Timestamps

### Bakeries Table
- `id`: Serial primary key
- `name`: Bakery name (varchar 100)
- `pincode`: 6-digit delivery pincode (varchar 6, indexed)
- `createdAt`, `updatedAt`: Timestamps

### Users Table
- `id`: Serial primary key
- `fname`, `lname`: User names
- `email`: Unique email address
- `provider`, `externalId`: Authentication details
- `role`: User role (default: "customer")
- `image`: Profile image
- `createdAt`, `updatedAt`: Timestamps

## 🔌 API Endpoints

### Items API

#### GET `/api/items`
Retrieve all bakery items (public endpoint)
```json
[
  {
    "id": 1,
    "name": "Chocolate Croissant",
    "description": "Buttery croissant filled with rich chocolate",
    "price": 350,
    "image": "1761524614309.jpg",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST `/api/items`
Add a new bakery item (admin only - TODO: implement auth)
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `name`: Item name (min 4 characters)
  - `description`: Item description (min 8 characters)
  - `price`: Price in cents (number)
  - `image`: Item image file

#### GET `/api/items/[id]`
Get a specific item by ID

### Bakeries API

#### GET `/api/bakeries`
Retrieve all bakery locations (public endpoint)
```json
[
  {
    "id": 1,
    "name": "Downtown Bakery",
    "pincode": "110001",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST `/api/bakeries`
Add a new bakery location
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "name": "New Bakery Location",
  "pincode": "110002"
}
```

#### GET `/api/bakeries/[id]`
Get a specific bakery by ID

#### DELETE `/api/bakeries/[id]`
Delete a bakery location

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd online-bakery-shop
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/bakery_db"
```

4. **Set up the database**
```bash
# Generate database migrations
npm run db:gen

# Run migrations
npm run db:run
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:gen` - Generate database migrations
- `npm run db:run` - Run database migrations

## 🏗️ How It Works

1. **Item Management**: Bakery items are stored in the items table with images uploaded to `/public/assets/`
2. **Location-Based Delivery**: Bakeries are mapped to specific pincodes for efficient delivery routing
3. **Order Fulfillment**: When a customer places an order, the system identifies the nearest bakery based on their pincode
4. **Inventory Distribution**: Each bakery can stock different items based on local demand

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Inventory tracking per bakery
- [ ] Payment integration
- [ ] Real-time order tracking
- [ ] Customer reviews and ratings
- [ ] Admin dashboard for analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for fresh bakery deliveries
