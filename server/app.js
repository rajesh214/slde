const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS, images)

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/blog.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

// Contact form submission route
app.post('/send-email', (req, res) => {
    try{
        console.log("send mail", req.body.email)
        const { name, email, description } = req.body;
    
        // Configure Nodemailer to send email
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'rajes0697@gmail.com', // Admin email
                pass: 'Susilaamma214$'
            }
        });
    
        let mailOptions = {
            from: "rajes0697@gmail.com",
            to: 'rajes0697@gmail.com',
            subject: 'New Contact Request',
            text: `Name: ${"Rajesh"}\nEmail: ${"Email"}\nDescription: ${"description"}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error occured', error)
                return res.status(500).send('Error sending email.');
            }
            res.status(200).send('Email sent successfully!');
        });
    }catch(e)
    {
        res.status(500).send('Internal server error.'); 
    }
});  

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
