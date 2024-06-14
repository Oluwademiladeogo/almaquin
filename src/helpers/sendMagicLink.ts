import nodemailer from "nodemailer";

export const sendMagicLink = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending magic link:", error);
    return { success: false, status: 500, message: "Error sending magic link" };
  }
};
