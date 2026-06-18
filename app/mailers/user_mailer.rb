class UserMailer < ApplicationMailer
    default from: 'thimothi1999@gmail.com'
    def welcome_email(email,code)
        @code = code
        @email = email
        mail(to: @email, subject: 'Welcome to Our Application')
    end

    def invite_email(email, invited_user)
         @email = email
        mail(to: @email, subject: "#{invited_user.first_name || invited_user.email.split("@")[0]} invited to work with them")
    end 
end
