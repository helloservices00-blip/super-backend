import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

// --------------------
// CORS
// --------------------
const corsOptions = {
  origin: "https://super-admin-frontend-eo6z.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

// --------------------
// In-memory stores
// --------------------
const users = [];      // {id, name, email, passwordHash, role}
const products = [];   // {id, name, price, vendorId, description}
const orders = [];     // {id, userId, products: [{productId, qty}], total}
const vendors = [];    // {id, name, description}

// --------------------
// Auth Middleware
// --------------------
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// --------------------
// REGISTER
// --------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    if (users.find((u) => u.email === email))
      return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, passwordHash, role };
    users.push(newUser);
    res.json({ message: "Registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// LOGIN
// --------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// PRODUCTS
// --------------------
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/:id", (req, res) => {
  const p = products.find((prod) => prod.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
});
app.post("/api/products", authMiddleware, (req, res) => {
  const { name, price, vendorId, description } = req.body;
  const newProduct = { id: products.length + 1, name, price, vendorId, description };
  products.push(newProduct);
  res.json(newProduct);
});
app.put("/api/products/:id", authMiddleware, (req, res) => {
  const p = products.find((prod) => prod.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ message: "Product not found" });
  Object.assign(p, req.body);
  res.json(p);
});
app.delete("/api/products/:id", authMiddleware, (req, res) => {
  const index = products.findIndex((prod) => prod.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

// --------------------
// ORDERS
// --------------------
app.post("/api/orders", authMiddleware, (req, res) => {
  const { products: orderProducts } = req.body;
  if (!orderProducts || !orderProducts.length)
    return res.status(400).json({ message: "No products in order" });

  const total = orderProducts.reduce((sum, item) => {
    const prod = products.find((p) => p.id === item.productId);
    return sum + (prod?.price || 0) * item.qty;
  }, 0);

  const newOrder = { id: orders.length + 1, userId: req.user.id, products: orderProducts, total };
  orders.push(newOrder);
  res.json(newOrder);
});

app.get("/api/orders", authMiddleware, (req, res) => {
  const userOrders = orders.filter((o) => o.userId === req.user.id);
  res.json(userOrders);
});

// --------------------
// VENDORS
// --------------------
app.get("/api/vendors", (req, res) => res.json(vendors));
app.get("/api/vendors/:id", (req, res) => {
  const v = vendors.find((v) => v.id === parseInt(req.params.id));
  if (!v) return res.status(404).json({ message: "Vendor not found" });
  res.json(v);
});
app.post("/api/vendors", authMiddleware, (req, res) => {
  const { name, description } = req.body;
  const newVendor = { id: vendors.length + 1, name, description };
  vendors.push(newVendor);
  res.json(newVendor);
});
app.put("/api/vendors/:id", authMiddleware, (req, res) => {
  const v = vendors.find((v) => v.id === parseInt(req.params.id));
  if (!v) return res.status(404).json({ message: "Vendor not found" });
  Object.assign(v, req.body);
  res.json(v);
});
app.delete("/api/vendors/:id", authMiddleware, (req, res) => {
  const index = vendors.findIndex((v) => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Vendor not found" });
  vendors.splice(index, 1);
  res.json({ message: "Vendor deleted" });
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
