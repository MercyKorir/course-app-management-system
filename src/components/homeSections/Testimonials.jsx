import React, { useEffect, useState } from "react";
import styles from "../../styles/Testimonials.module.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Random User 1",
      email: "testuser@example.com",
      testimony:
        '"Taking courses on this platform has been a game-changer for me. The content is top-notch, the instructors are experts in their fields, and the learning experience is truly enjoyable. I\'ve gained valuable skills that have helped me advance in my career. Highly recommended!"',
    },
    {
      name: "Random User 2",
      email: "testuser2@example.com",
      testimony:
        '"Taking courses on this platform has been a game-changer for me. The content is top-notch, the instructors are experts in their fields, and the learning experience is truly enjoyable. Highly recommended!"',
    },
    {
      name: "Random User 3",
      email: "testuser3@example.com",
      testimony:
        '"Taking courses on this platform has been a game-changer for me. The content is top-notch, the instructors are experts in their fields, and the learning experience is truly enjoyable."',
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [showTestimonial, setShowTestimonial] = useState(false);

  useEffect(() => {
    setShowTestimonial(false);

    const timer = setTimeout(() => {
      setShowTestimonial(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentTestimonialIndex]);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

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
                  <button
                    className={styles.prevBtn}
                    onClick={handlePrevTestimonial}
                  >
                    &#60;
                  </button>
                  <button
                    className={styles.nextBtn}
                    onClick={handleNextTestimonial}
                  >
                    &#62;
                  </button>
                </div>
                <div className={styles.userTestimonial}>
                  <div
                    className={`${styles.userInfo} ${
                      showTestimonial ? styles.show : ""
                    }`}
                  >
                    <div className={styles.userImg}></div>
                    <div className={styles.userNameDetails}>
                      <h3>{testimonialsData[currentTestimonialIndex].name}</h3>
                      <p>{testimonialsData[currentTestimonialIndex].email}</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.userTestimony} ${
                      showTestimonial ? styles.show : ""
                    }`}
                  >
                    <p>{testimonialsData[currentTestimonialIndex].testimony}</p>
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
