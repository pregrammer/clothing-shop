import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = () => {
  return (
    <section className="mobile-menu">
      <div className="content">
        <div className="times">
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <ul>
          <li>
            <Link href="/products">
              <a>محصولات</a>
            </Link>
          </li>

          <li>
            <Link href="/contact-us">
              <a>تماس با ما</a>
            </Link>
          </li>
          <li>
            <Link href="/about-us">
              <a>درباره ی ما</a>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MobileMenu;
