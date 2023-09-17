const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // For password hashing

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

// Mock database storage
const users = [];

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password, userType } = req.body;
    
    if (userType !== 'user' && userType !== 'admin') {
        return res.status(400).json({ message: "Invalid user type" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, role: userType });
    res.status(201).json({ message: "Registration successful!" });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} login successful!`, role: user.role });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});