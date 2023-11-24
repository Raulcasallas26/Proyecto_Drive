import nodemailer from 'nodemailer';
import { generarJWTreset } from '../Middlewares/validar-jwt.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const sendEmail = async (req, res) => {
    const { email, subject, body } = req.body;

    try {
        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,  
            secure: true,
            auth: { 
                user: process.env.FROM_EMAIL,
                pass: process.env.FROM_EMAIL_2FA, // Usa tu contraseña o una contraseña de aplicación si es necesario
            },
        });

        // Configurar los detalles del correo electrónico
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            text: body,
        };

        const token = await generarJWTreset(email)
        console.log("se genero el token para la recuperacion de contraseña" + token);
        // Enviar el correo electrónico
        const info = await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado:', info.response);
        res.status(200).json({ success: true, message: 'Correo electrónico enviado correctamente', token });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ success: false, message: 'Error al enviar el correo electrónico', error: error.message });
    }
};

export default sendEmail;
