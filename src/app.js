const express = require("express");
const cors = require("cors");

const ProductRoutes= require('./routes/product.routes')
const authRoutes = require('./routes/auth.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products',ProductRoutes);

module.exports = app;
