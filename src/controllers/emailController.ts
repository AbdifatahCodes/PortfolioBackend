import { format } from 'date-fns';
import { Request, Response } from 'express';
import { sendEmail } from '../utils/emailSender';

export const sendOrderEmail = async (req: Request, res: Response) => {
  console.log(req.body);

  let { name, email, orderType, promoCode } = req.body;
  let packageFeatures = "";
  let orderDate = format(new Date(), "d MMMM yyyy"); // Current date in "2 January 2024" format
  let estimatedCompletionDate = "";
  let orderPrice = "";
  let discountedOrderPrice = "Free";
  let orderPriceHtml = ``;

  if(orderType === "Digital Scout Package"){
    packageFeatures = "Basic SEO analysis, Code quality review, User experience assessment";
    estimatedCompletionDate = "10 Days";
    orderPrice = "$300";
  } else if(orderType == "Cyber Catalyst Package"){
    packageFeatures = "Basic front-end design, Basic SEO enhancements, Mobile responsiveness enhancement";
    estimatedCompletionDate = "3 Weeks";
    orderPrice = "$1,500";
  } else if(orderType === "Web Evolution Package"){
    packageFeatures = "Comprehensive design overhaul, Advanced SEO strategies, API development";
    estimatedCompletionDate = "5 Weeks";
    orderPrice = "$3,000";
  } else if(orderType === "Digital Synergy Package"){
    packageFeatures = "Complete overhaul, Advanced AI integration, Custom API solutions";
    estimatedCompletionDate = "8 Weeks";
    orderPrice = "$6,000";
  } else if(orderType === "Quantum Leap Package"){
    packageFeatures = "Cutting-edge technologies, Bespoke UX/UI design, Extensive AI training";
    estimatedCompletionDate = "15 Weeks";
    orderPrice = "$10,000";
    discountedOrderPrice = "$4,000";
  } else {
    res.status(404).send("Error: Order Type is unrecognized.");
    return;
  }

  if(promoCode === process.env.PROMO_CODE || orderType === "Digital Scout Package") {
    orderPriceHtml = `<span><span style="text-decoration: line-through;">${orderPrice}</span> ${discountedOrderPrice}</span>`;
  } else {
    orderPriceHtml = `<span>${orderPrice}</span>`;
  }

  const subject = `Confirmation of Your Order - ${orderType}`;
  let text = `
  Dear ${name},

  Thank you for choosing ABDIFATAHCODES for your web development needs. We are excited to confirm your order and look forward to delivering a service that meets your expectations and requirements.
  Order Details:
  
      Service Ordered: ${orderType}
      Order Date: ${orderDate}
      Estimated Completion: ${estimatedCompletionDate}
  
  We will commence work on your project, ${orderType}, which includes ${packageFeatures}. Our team is committed to providing you with a high-quality service, and we will keep you updated on our progress.
  Next Steps:
  
      Initial Consultation: Our team will contact you within the next 48 hours to discuss your project requirements and any specific preferences you might have.
      Project Timeline: After our initial discussion, we will provide you with a detailed project timeline and milestones.
      Regular Updates: You will receive regular updates about the progress of your project.
  
  Please feel free to reach out at any time if you have questions, need to make adjustments, or require additional services. Your satisfaction is our priority, and we are here to ensure your project is a success.
  
  Thank you once again for choosing us. We are thrilled to be a part of your digital journey.
  Warm regards,
  Abdifatah Osman
  Co-Founder & Lead Developer
  Email: hello@abdifatahcodes.com, Tel: +254713704126
  `;
  let htmlContent = `
  <!DOCTYPE html>
    <html>
    <head>
    
    	<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

        <style>
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&family=Roboto:wght@300;400;500;600&family=Roboto+Condensed:wght@300&family=DM+Sans&family=Quicksand:wght@700&family=Courgette&display=swap');
            body {
                font-family: Roboto, sans-serif;
                background-color: #010817;
                color: white;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: black;
                padding: 20px;
                margin: 20px auto;
                border: 1px solid white;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            	display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: center;
                font-family: 'Oswald', sans-serif;
                font-weight: bold;
                font-size: 28px;
                max-height: 50px;
            }
            .brand-name {
            	font-family: 'Oswald', sans-serif;
                font-weight: bold;
                font-size: 14px;
                color: #007bff;
            }
            .footer {
            	display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: center;
                font-family: Oswald, sans-serif;
                font-weight: bold;
                font-size: 28px;
                max-height: 50px;
            }
            h1 {
                color: #007bff;
                font-family: 'DM Sans', sans-serif;
            }
            .regards {
                font-size: 15px;
                font-family: Quicksand, sans-serif;
                color: #C1C1C1;
                text-align: left;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
            	<img src="https://abdifatahcodes.com/favicon.png" alt="Your Company Logo" style="max-width: 50px; max-height: 38px; padding-right: 5px;">
                <p>ABDIFATAH CODES</p>
            </div>
            <hr/>
            <p>Dear <b>${name}</b>,</p>
            <p>Thank you for choosing <a href="https://www.abdifatahcodes.com/"><span class="brand-name">ABDIFATAHCODES</span></a> for your web development needs. We are excited to confirm your order and look forward to delivering a service that meets your expectations and requirements.</p>
            
            <h2>Order Details:</h2>
            <ul>
                <li><b>Service Ordered:</b> <a href="https://www.abdifatahcodes.com/#services-section"><span class="brand-name">${orderType}</span></a></li>
                <li><b>Order Date:</b> ${orderDate}</li>
                <li><b>Estimated Completion:</b> ${estimatedCompletionDate}</li>
                <li><b>Price:</b> ${orderPriceHtml}</li>
            </ul>

            <p>We will commence work on your project, ${orderType}, which includes ${packageFeatures} and more. Our team is committed to providing you with a high-quality service, and we will keep you updated on our progress.</p>

            <h2>Next Steps:</h2>
            <ol>
                <li>Initial Consultation: Our team will contact you within the next 48 hours to discuss your project requirements and any specific preferences you might have.</li>
                <li>Project Timeline: After our initial discussion, we will provide you with a detailed project timeline and milestones.</li>
                <li>Regular Updates: You will receive regular updates about the progress of your project.</li>
            </ol>

            <p>Please feel free to reach out at any time if you have questions, need to make adjustments, or require additional services. Your satisfaction is our priority, and we are here to ensure your project is a success.</p>

            <p>Thank you once again for choosing us. We are thrilled to be a part of your digital journey.</p>

            <div class="regards">
                Warm regards,<br>
                Abdifatah Osman<br>
                Co-Founder & Lead Developer<br>
                Email: hello@abdifatahcodes.com, Tel: +254713704126
            </div>
            <p></p>
            <hr/>
            <div class="header">
            	<img src="https://abdifatahcodes.com/favicon.png" alt="Your Company Logo" style="max-width: 50px; max-height: 38px; padding-right: 5px;">
                <p>ABDIFATAH CODES</p>
            </div>
        </div>
    </body>
    </html>
  `;

  text = `Hello ${name}, How are you doing this fine evening?`
  htmlContent = `<p>Hello ${name}, How are you doing this fine evening?</p>`

  try {
    await sendEmail(`${name} <${email}>`, subject, text, htmlContent);
    res.status(200).send('Order email sent successfully.\n');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to send the order.\n');
  }
};
