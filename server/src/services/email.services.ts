import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
export const resend = new Resend(RESEND_API_KEY);

export const sendPremiumConfirmationEmail = async (
  userEmail: string,
  userName: string
) => {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Thanks for signing up for our premium plan!',
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">
          <p>Hi ${userName},</p>
          <p>Thanks for signing up for our premium plan! We're excited to have you onboard.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Error sending email:', err);
  }
};
