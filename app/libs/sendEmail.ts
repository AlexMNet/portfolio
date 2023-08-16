import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendAdminEmail = async (emailData: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { fullName, email, subject, message } = emailData;

  await sgMail.send({
    to: process.env.NEXTAUTH_ADMIN_EMAIL as string,
    from: process.env.NEXTAUTH_ADMIN_EMAIL as string,
    subject: subject,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">

        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

        <link rel="stylesheet" href="css/styles.css?v=1.0">

      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new mail from ${fullName}, their email is: ✉️${email} </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${message}</p>
              <br>
              </div>
              <img src="https://res.cloudinary.com/dtbtmmgxx/image/upload/c_scale,w_32,dpr_2.0/v1692226021/android-chrome-192x192_rr1vkd.png">
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Alex Maldonado<br>Software Engineer<br>alex@alexmaldonado.dev</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://www.alexmaldonado.dev/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                <a href="https://github.com/AlexMNet" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                <a href="https://instagram.com/alexmnet/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
                <a href="https://www.linkedin.com/in/alex-maldonado-550920205/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>

              </div>
              </div>
      </body>
      </html>`,
  });
};

export const sendClientEmail = async (emailData: {
  fullName: string;
  email: string;
}) => {
  const { fullName, email } = emailData;

  await sgMail.send({
    to: email,
    from: process.env.NEXTAUTH_ADMIN_EMAIL as string,
    subject: 'Thank you for reaching out...',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>Alex Maldonado Dev</title>
        <meta name="description" content="Alex Maldonado Dev">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>Hello ${fullName}! </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>Thank you for contacting me. I will be in touch as soon as possible!</p>
              <br>
              </div>
              <img src="https://res.cloudinary.com/dtbtmmgxx/image/upload/c_scale,w_32,dpr_2.0/v1692226021/android-chrome-192x192_rr1vkd.png">
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Alex Maldonado<br>Web Developer<br>alex@alexmaldonado.dev</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://www.alexmaldonado.dev/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                <a href="https://github.com/AlexMNet" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                <a href="https://instagram.com/alexmnet/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
                <a href="https://www.linkedin.com/in/alex-maldonado-550920205/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
                
              </div>
              </div>
      </body>
      </html>`,
  });
};
