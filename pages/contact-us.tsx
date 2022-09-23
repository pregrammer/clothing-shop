import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/aboutAndContactUs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | تماس با ما</title>
      </Head>
      <main>
        <div className={styles.contact_us_page}>
          <div className={styles.contact_ways_container}>
            <div className={styles.ways_header}>
              <h3>راه های ارتباطی</h3>
            </div>
            <div className={styles.ways_container}>
              <div className={styles.contact_way}>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <b>شماره تماس</b>
                <p>021-568-9965</p>
              </div>
              <div className={styles.contact_way}>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <b>موقعیت مکانی</b>
                <p>ایران - تهران - میدان آزادی</p>
              </div>
              <div className={styles.contact_way}>
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <b>ایمیل</b>
                <p>healthy-shop@info</p>
              </div>
            </div>
          </div>

          <div className={styles.map_container}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103598.78881813058!2d51.434961873213005!3d35.76402239314581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e06bcd34a0639%3A0x28731684a55dbd96!2sTabiat+Bridge!5e0!3m2!1sen!2s!4v1515773015045"
              width="600"
              height="450"
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
