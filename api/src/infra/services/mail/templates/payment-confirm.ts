export interface PaymentConfirmTemplateParams {
  dashboardUrl: string;
  customerName: string;
  tourName: string;
  tourDate: string;
  tourTime: string;
  participants: string;
  amountPaid: string;
  bookingCode: string;
  meetingPoint: string;
  contactPhone: string;
  whatsappNumber: string;
}

export const paymentConfirmTemplate = (
  customerName: PaymentConfirmTemplateParams["customerName"], //TODO: make this dynamic based on the customer name
  tourName: PaymentConfirmTemplateParams["tourName"], //TODO: make this dynamic based on the tour name
  tourDate: PaymentConfirmTemplateParams["tourDate"], //TODO: make this dynamic based on the tour date
  tourTime: PaymentConfirmTemplateParams["tourTime"], //TODO: make this dynamic based on the tour time
  participants: PaymentConfirmTemplateParams["participants"], //TODO: make this dynamic based on the number of participants
  amountPaid: PaymentConfirmTemplateParams["amountPaid"], //TODO: make this dynamic based on the amount paid
  bookingCode: PaymentConfirmTemplateParams["bookingCode"], //TODO: make this dynamic based on the booking code
  meetingPoint: PaymentConfirmTemplateParams["meetingPoint"], //TODO: make this dynamic based on the meeting point
  contactPhone: PaymentConfirmTemplateParams["contactPhone"], //TODO: make this dynamic based on the contact phone
  whatsappNumber: PaymentConfirmTemplateParams["whatsappNumber"], //TODO: make this dynamic based on the WhatsApp number
): string => {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagamento Confirmado - Tripay</title>
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
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 0 0 24px 0;">
                                        <span class="mobile-icon" style="color: #16a34a; font-size: 48px;">✓</span>
                                    </td>
                                </tr>
                            </table>

                            <h2 class="mobile-title" style="color: #1a1a1a; font-size: 28px; font-weight: 300; margin: 0 0 20px 0; line-height: 1.2; text-align: center;">
                                Pagamento confirmado com sucesso! 🎉
                            </h2>
                            
                            <p class="mobile-text" style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
                                Olá ${customerName}! Seu pagamento foi processado e sua reserva está confirmada. Confira os detalhes abaixo:
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                                <tr>
                                    <td style="padding: 24px 0;">
                                        <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 500; margin: 0 0 16px 0; text-align: center;">
                                            Detalhes da Reserva
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">PASSEIO</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${tourName}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">DATA</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${tourDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">HORÁRIO</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${tourTime}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">PARTICIPANTES</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${participants}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">VALOR PAGO</span>
                                                    <span class="mobile-text" style="color: #F51B31; font-size: 20px; font-weight: 600; display: block; margin-top: 4px; text-align: center;">${amountPaid}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">CÓDIGO DA RESERVA</span>
                                                    <span class="mobile-text" style="color: #F51B31; font-size: 16px; font-weight: 600; display: block; margin-top: 4px; text-align: center;">${bookingCode}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                                <tr>
                                    <td class="mobile-notice" style="padding: 20px 0; text-align: center;">
                                        <h3 style="color: #1e40af; font-size: 16px; font-weight: 500; margin: 0 0 12px 0; text-align: center;">
                                            📋 Instruções Importantes
                                        </h3>
                                        <p class="mobile-text mobile-small-text" style="color: #1e40af; font-size: 14px; margin: 0; line-height: 1.6; text-align: center;">
                                            • Chegue ao local de encontro 15 minutos antes do horário<br>
                                            • Traga um documento de identificação com foto<br>
                                            • Use roupas confortáveis e adequadas para a atividade<br>
                                            • Em caso de dúvidas, entre em contato conosco
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border-top: 1px solid #f0f0f0;">
                                <tr>
                                    <td class="mobile-notice" style="padding: 20px 0; text-align: center;">
                                        <h3 style="color: #1a1a1a; font-size: 16px; font-weight: 500; margin: 0 0 12px 0; text-align: center;">
                                            📞 Informações de Contato
                                        </h3>
                                        <p class="mobile-text mobile-small-text" style="color: #4a4a4a; font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
                                            <strong>Local de Encontro:</strong> ${meetingPoint}<br>
                                            <strong>Telefone:</strong> ${contactPhone}<br>
                                            <strong>WhatsApp:</strong> ${whatsappNumber}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p class="mobile-text mobile-small-text" style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0; text-align: center;">
                                Guarde este e-mail como comprovante da sua reserva.<br>
                                Estamos ansiosos para recebê-lo!
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
