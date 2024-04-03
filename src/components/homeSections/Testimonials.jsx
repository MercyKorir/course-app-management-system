import React from "react";
import styles from "../../styles/Testimonials.module.css";

const Testimonials = () => {
  return (
    <div id="testimonials" className={styles.testimonialsContainer}>
      <div className={styles.testimonialsContent}>
        <div className={styles.testimonialsText}>
          <h1>Testimonials</h1>
          <p>
            Read how our courses have transformed lives. Discover the impact
            firsthand from our students.
          </p>
        </div>
        <div className={styles.testimonialItems}>
          <div className={styles.userBubbleAnimationBg}>
            <div
              className={`${styles.userBubbleAnimation} ${styles.bubble1}`}
            ></div>
            <div
              className={`${styles.userBubbleAnimation} ${styles.bubble2}`}
            ></div>
            <div
              className={`${styles.userBubbleAnimation} ${styles.bubble3}`}
            ></div>
            <div
              className={`${styles.userBubbleAnimation} ${styles.bubble4}`}
            ></div>
            <div
              className={`${styles.userBubbleAnimation} ${styles.bubble5}`}
            ></div>
          </div>
          <div className={styles.testimonialCardHolder}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialCardContent}>
                <div className={styles.prevNextBtns}>
                  <button className={styles.prevBtn}>&#60;</button>
                  <button className={styles.nextBtn}>&#62;</button>
                </div>
                <div className={styles.userTestimonial}>
                  <div className={styles.userInfo}>
                    <div className={styles.userImg}></div>
                    <div className={styles.userNameDetails}>
                      <h3>Random User</h3>
                      <p>testuser@example.com</p>
                    </div>
                  </div>
                  <div className={styles.userTestimony}>
                    <p>
                      "Taking courses on this platform has been a game-changer
                      for me. The content is top-notch, the instructors are
                      experts in their fields, and the learning experience is
                      truly enjoyable. I've gained valuable skills that have
                      helped me advance in my career. Highly recommended!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
