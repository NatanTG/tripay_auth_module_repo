export interface PreRegisterTemplateParams {
  loginUrl: string;
  temporaryPassword: string;
  userName: string;
}

export const preRegisterTemplate = (
  loginUrl: PreRegisterTemplateParams["loginUrl"],
  temporaryPassword: PreRegisterTemplateParams["temporaryPassword"],
  userName: PreRegisterTemplateParams["userName"],
): string => {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pré-registro Concluído - Tripay</title>
    <style>
        @media only screen and (max-width: 600px) {
            .mobile-container { 
                width: 100% !important; 
                max-width: 100% !important; 
                margin: 10px !important;
            }
            .mobile-padding { 
                padding: 20px !important; 
            }
            .mobile-header-padding {
                padding: 20px 15px !important;
            }
            .mobile-logo { 
                max-width: 185px !important;
            }
            .mobile-title { 
                font-size: 24px !important; 
                line-height: 30px !important; 
                margin: 0 0 20px 0 !important;
            }
            .mobile-text { 
                font-size: 16px !important; 
                line-height: 22px !important; 
                margin: 0 0 16px 0 !important;
            }
            .mobile-small-text {
                font-size: 14px !important;
                line-height: 20px !important;
            }
            .mobile-button { 
                width: 100% !important; 
                padding: 16px 20px !important; 
                font-size: 16px !important;
                min-width: auto !important;
                display: block !important;
                box-sizing: border-box !important;
            }
            .mobile-button-container {
                width: 100% !important;
            }
            .mobile-icon { 
                font-size: 40px !important; 
            }
            .mobile-notice {
                padding: 16px 0 !important;
            }
            .mobile-footer {
                padding: 20px 15px !important;
            }
            .mobile-password-box {
                padding: 16px !important;
            }
        }
        
        @media only screen and (max-width: 480px) {
            .mobile-container {
                margin: 5px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-title {
                font-size: 22px !important;
                line-height: 28px !important;
            }
            .mobile-text {
                font-size: 15px !important;
            }
            .mobile-icon {
                font-size: 36px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 10px;">
                <table class="mobile-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; max-width: 600px; width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <tr>
                        <td class="mobile-header-padding" style="background-color: #ffffff; text-align: center; border-radius: 8px 8px 0 0;">
                            <img src="../../../../assets/img/logo.png" alt="Tripay" class="mobile-logo" style="height: 200px; width: auto; display: block; margin: 0 auto; max-width: 100%;" />
                        </td>
                    </tr>
                    <tr>
                        <td class="mobile-padding" style="padding: 20px 40px 40px 40px;">
                            <h2 class="mobile-title" style="color: #1a1a1a; font-size: 28px; font-weight: 300; margin: 0 0 20px 0; line-height: 1.2; text-align: center;">
                                Pré-registro Concluído! 🎉
                            </h2>
                            
                            <p class="mobile-text" style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                                Olá, ${userName}! Seu pré-registro foi realizado com sucesso. Estamos empolgados em tê-lo conosco na Tripay!
                            </p>
                            
                            <p class="mobile-text" style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                                Para completar seu onboarding e começar a usar nossa plataforma, você precisará fazer login utilizando suas credenciais.
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                                <tr>
                                    <td style="padding: 24px 0;">
                                        <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 500; margin: 0 0 16px 0; text-align: center;">
                                            Suas credenciais de acesso:
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 400; display: block; text-align: center;">
                                                        <strong>Email:</strong> Utilize o email com o qual você se registrou
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 16px 0;">
                                                    <table class="mobile-password-box" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; border: 2px solid #e5e7eb;">
                                                        <tr>
                                                            <td style="padding: 20px; text-align: center;">
                                                                <span style="color: #6b7280; font-size: 14px; font-weight: 500; display: block; margin-bottom: 8px;">SENHA TEMPORÁRIA</span>
                                                                <span style="color: #F51B31; font-size: 20px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 2px; display: block; word-break: break-all;">
                                                                    ${temporaryPassword}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0;">
                                <tr>
                                    <td align="center">
                                        <table class="mobile-button-container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: auto;">
                                            <tr>
                                                <td style="background-color: #F51B31; border-radius: 6px;">
                                                    <a href="${loginUrl}" class="mobile-button" style="display: block; background-color: #F51B31; color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 6px; font-weight: 500; font-size: 16px; text-align: center; letter-spacing: 0.5px; min-width: 200px;">
                                                        FAZER LOGIN
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border-top: 1px solid #f0f0f0;">
                                <tr>
                                    <td style="padding: 24px 0;">
                                        <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 500; margin: 0 0 16px 0; text-align: center;">
                                            Próximos passos do onboarding:
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 400; display: block; text-align: center;">• Altere sua senha temporária por uma senha segura</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 400; display: block; text-align: center;">• Complete seu perfil com suas informações pessoais</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 400; display: block; text-align: center;">• Configure suas preferências de notificação</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 400; display: block; text-align: center;">• Explore os recursos da plataforma</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p class="mobile-text mobile-small-text" style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0; text-align: center;">
                                <strong>Importante:</strong> Por segurança, recomendamos que você altere sua senha temporária imediatamente após o primeiro login.
                            </p>
                            
                            <p class="mobile-text mobile-small-text" style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0; text-align: center;">
                                Se você não conseguir clicar no botão, copie e cole este link no seu navegador:<br>
                                <span style="color: #F51B31; word-break: break-all;">${loginUrl}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="mobile-footer" style="padding: 24px; text-align: center; border-top: 1px solid #f0f0f0; border-radius: 0 0 8px 8px;">
                            <p class="mobile-text mobile-small-text" style="color: #9ca3af; font-size: 13px; margin: 0; line-height: 1.5;">
                                © ${currentYear} Tripay. Todos os direitos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};
