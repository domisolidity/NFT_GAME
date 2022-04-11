import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { withRouter } from "next/router";

import topbar_items from "../../assets/JsonData/topbar_router.json";

const TopNav = () => {
  const router = useRouter();

  const activeItem = topbar_items.findIndex(
    (item) => item.route === router.pathname
  );

  console.log(activeItem);

  return (
    <div className="topnav">
      {topbar_items.map((item, index) => (
        <Link
          href={{
            pathname: item.route,
            query: { active: activeItem },
          }}
          as={item.route}
          key={index}
        >
          <a>
            {/* {console.log(index , activeItem)} */}
            <TopItem
              title={item.display_name}
              active={index === activeItem ? "active" : ""}
            />
          </a>
        </Link>
      ))}
      <style jsx>{`
        .topnav {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
};

const TopItem = (props) => {
  const router = useRouter();
  const active = props.active;
  console.log(active);
  return (
    <div className="topnav__item">
      <div className={`topnav__item_inner_${active}`}>
        <span>{props.title}</span>
      </div>
      <style jsx>{`
        .topnav__item_inner > span {
          text-transform: capitalize;
        }
        span {
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }

        .topnav__item_inner:hover {
          color: #5ce3f2;
          text-shadow: 0 0 0 transparent, 0 0 0.3rem #d1d2d0,
            0 0 0.1rem rgba(38, 149, 255, 0.5), 0 0 0.1rem #d1d2d0,
            0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0, 0 0 0.2rem #d1d2d0,
            0 0 0.1rem #d1d2d0;
        }

        .topnav__item_inner_active > span {
          color: #5ce3f2;
          text-shadow: 0 0 0 transparent, 0 0 0.3rem #d1d2d0,
            0 0 0.1rem rgba(38, 149, 255, 0.5), 0 0 0.1rem #d1d2d0,
            0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0, 0 0 0.4rem #d1d2d0,
            0 0 0.3rem #d1d2d0;
        }

        .topnav__item {
          /* padding: 1rem 2rem; */
          font-size: 1.5rem;
          font-weight: 800;
          transition: color 0.3s ease 0s;
        }
      `}</style>
    </div>
  );
};

export default TopNav;
