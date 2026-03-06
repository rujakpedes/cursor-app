package com.fooddelivery.service;

import com.fooddelivery.model.entity.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendOrderConfirmation(Order order, String recipientEmail) {
        try {
            Context ctx = new Context();
            ctx.setVariable("order", order);
            ctx.setVariable("items", order.getItems());
            String html = templateEngine.process("order-confirmation", ctx);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipientEmail);
            helper.setSubject("Order Confirmed - #" + order.getOrderNumber());
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Order confirmation sent to {}", recipientEmail);
        } catch (MessagingException e) {
            log.error("Failed to send order confirmation to {}: {}", recipientEmail, e.getMessage());
        }
    }
}
