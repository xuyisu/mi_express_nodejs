// app.js
const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)
const activityRoutes = require('./routes/activityRoutes')
app.use('/api/activitys', activityRoutes)
const cartRoutes = require('./routes/cartRoutes')
app.use('/cart', cartRoutes)
const categoryRoutes = require('./routes/categoryRoutes')
app.use('/category', categoryRoutes)
const orderRoutes = require('./routes/orderRoutes')
app.use('/order', orderRoutes)
const productRoutes = require('./routes/productRoutes')
app.use('/product', productRoutes)
const userAddressRoutes = require('./routes/userAddressRoutes')
app.use('/address', userAddressRoutes)


// 数据库同步（在实际应用中，通常不会在生产环境中这样做）
sequelize.sync({ force: false }) // force: true 会删除并重新创建表，仅在开发时使用
  .then(() => {
    console.log('Database & tables synchronized!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });