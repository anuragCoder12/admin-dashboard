import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoAlarmSharp, IoHome } from "react-icons/io5";
import { IoAccessibility } from "react-icons/io5";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLinks/menuLink";
import user from "../../../../public/user.png";
import Image from "next/image";
function Sidebar() {
  const menus = [
    {
      title: "Dash Board ",
      menuLinks: [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: <RxDashboard />,
        },
        {
          name: "Products",
          link: "/dashboard/products",
          icon: <MdOutlineProductionQuantityLimits />,
        },
        {
          name: "Testimonials",
          link: "/dashboard/testimonials",
          icon: <IoAlarmSharp />,
        },
        {
          name: "Regions",
          link: "/dashboard/regions",
          icon: <IoAccessibility />,
        },
        {
          name: "Faq",
          link: "/dashboard/faq",
          icon: <IoAccessibility />,
        },
        {
          name: "Category",
          link: "/dashboard/category",
          icon: <IoAccessibility />,
        },
      ],
    },
    {
      title: "Static Pages",
      menuLinks: [
        {
          name: "Home",
          link: "/dashboard/home",
          icon: <IoHome />,
        },
        {
          name: "Testimonial Page",
          link: "/dashboard/testimonialPage",
          icon: <IoHome />,
        },
      ],
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={user}
          width={50}
          height={50}
          alt=""
          className="rounded-full"
        />
        <div className={styles.userInfo}>
          <span className={styles.username}>John Doe</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menus.map((menu, index) => (
          <li key={index} className={styles.menuItem}>
            <span className={styles.menuTitle}>{menu.title}</span>
            {menu.menuLinks.map((link, i) => (
              <MenuLink key={i} item={link} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <IoIosLogOut />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
