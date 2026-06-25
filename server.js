require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
    },
  },
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const limiter = rateLimit({ windowMs: 60000, max: 20 });
const generateLimiter = rateLimit({ windowMs: 60000, max: 5 });

app.use("/api/", limiter);
app.use("/api/payments/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/generate", generateLimiter, require("./routes/generate"));
app.use("/api/payments", require("./routes/payments"));

app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => res.status(404).json({ error: "Route introuvable" }));
app.use((err, req, res, next) => res.status(500).json({ error: "Erreur serveur" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ SunoForge Backend démarré sur ${PORT}`));
