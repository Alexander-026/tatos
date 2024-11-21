import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"
import transporter from "../../utils/emailTransporter"

const sendConfirmationEmail = async (reqConfirmMailerBody: {
  id: string
  myEmail: string
}): Promise<{ message: string }> => {
  const { id, myEmail } = reqConfirmMailerBody
  const user = await User.findById(id)
  if (!user) {
    throw ApiError.BadRequest(`Activator not found`)
  }
  const link = `${process.env.CLIENT_ORIGIN}/activated/${id}`

  user.emailStatus = "pending"
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: myEmail,
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
