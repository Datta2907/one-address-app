const express = require('express');
const connectdb = require('./utils/db');
const app = express();
require('dotenv').config();
connectdb();
//uncomment before deplyoment
// app.use((req, res, next) => {
//     res.setHeader(
//         "Access-Control-Allow-Origin",
//         "https://phone-comparor-web.onrender.com"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Expose-Headers", "*");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);
//     next();
// });
app.use(express.json());
app.use('/google-auth', require('./routes/google-route'));
app.use('/manual-auth', require('./routes/auth-route'));
//app.use('/user', require('./routes/user'));

// needed in heroku
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('frontend/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// }  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));