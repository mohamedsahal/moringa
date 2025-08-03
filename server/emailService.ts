import nodemailer from 'nodemailer';

// SMTP configuration using the provided credentials
const transporter = nodemailer.createTransport({
  host: 'srv1101.sostectechno.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'info@moringa.co.ke',
    pass: 'Asd@366124'
  }
});

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const mailOptions = {
      from: 'info@moringa.co.ke',
      to: 'info@moringa.co.ke',
      subject: `New Contact Form Submission - ${formData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Service Interest:</strong> ${formData.service}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from the Moringa website contact form.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Service Interest: ${formData.service}

Message:
${formData.message}

---
This email was sent from the Moringa website contact form.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}