import ApiError from "../../exceptions/apiError"
import { v4 as uuid } from "uuid"
import User from "../../models/user.model"
import transporter from "../../utils/emailTransporter"

const sendConfirmationEmail = async (reqConfirmMailerBody: {
  email: string
}): Promise<{ message: string }> => {
  const { email } = reqConfirmMailerBody
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest(`Activator not found`)
  }
  const activationId = uuid()
  const link = `${process.env.CLIENT_ORIGIN}/activated/${activationId}`

  user.emailStatus = "pending"
  user.activationId = activationId
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Confirm Your Email Address",
    text: "",
    html: `
          <div>
             <h1>Confirm Your Email</h1>
              <a href="${link}">Confirm</a>
          </div>
        `,
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error)
        reject(ApiError.BadRequest("Error sending message"))
      } else {
        try {
          await user.save() // Сохраняем обновленный статус пользователя
          console.log("Email sent: " + info.response)
          resolve({ message: "Confirmation email sent successfully." })
        } catch (saveError) {
          console.error("Error saving user:", saveError)
          reject(ApiError.BadRequest("Error saving user data"))
        }
      }
    })
  })
}

export default sendConfirmationEmail
