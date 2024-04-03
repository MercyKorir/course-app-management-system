import React from "react";
import styles from "../../styles/ContactUs.module.css";

const ContactUs = () => {
  return (
    <div id="contact-us" className={styles.contactUsContainer}>
      <div className={styles.contactContent}>
        <div className={styles.contactText}>
          <h1>Get in Touch!</h1>
          <p>
            Fill out the form below to ask questions, provide feedback, or
            inquire about our courses. <br />
            We're here to help!
          </p>
        </div>
        <div className={styles.contactForm}>
          <form>
            <input type="text" placeholder="What is your name?" />
            <input type="email" placeholder="What is your work email?" />
            <textarea placeholder="What is your message?"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
