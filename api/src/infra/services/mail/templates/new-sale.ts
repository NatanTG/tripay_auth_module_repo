export interface NewSaleTemplateParams {
  dashboardUrl: string;
  tour_name: string;
  tour_value: string;
  tour_date: string;
  customer_name: string;
}

export const newSaleTemplate = (
  dashboardUrl: NewSaleTemplateParams["dashboardUrl"], //TODO: make this URL dynamic based on the environment
  tour_name: NewSaleTemplateParams["tour_name"], //TODO: make this dynamic based on the tour name
  tour_value: NewSaleTemplateParams["tour_value"], //TODO: make this dynamic based on the tour value
  tour_date: NewSaleTemplateParams["tour_date"], //TODO: make this dynamic based on the tour date
  customer_name: NewSaleTemplateParams["customer_name"], //TODO: make this dynamic based on the customer name
): string => {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Venda - Tripay</title>
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
            .mobile-price { 
                font-size: 18px !important; 
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
                                Nova venda realizada! 🎉
                            </h2>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                                <tr>
                                    <td style="padding: 24px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">PASSEIO</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${tour_name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">VALOR</span>
                                                    <span class="mobile-price" style="color: #F51B31; font-size: 20px; font-weight: 600; display: block; margin-top: 4px; text-align: center;">${tour_value}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">DATA</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${tour_date}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span class="mobile-small-text" style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; text-align: center;">CLIENTE</span>
                                                    <span class="mobile-text" style="color: #1a1a1a; font-size: 16px; font-weight: 500; display: block; margin-top: 4px; text-align: center;">${customer_name}</span>
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
                                                    <a href="${dashboardUrl}" class="mobile-button" style="display: block; background-color: #F51B31; color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 6px; font-weight: 500; font-size: 16px; text-align: center; letter-spacing: 0.5px; min-width: 200px;">
                                                        VER DETALHES
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
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
