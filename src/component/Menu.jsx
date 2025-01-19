import { Stack } from "@mui/material";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
const Menu = () => {
  const menuData = [
    {
      name: "Product",
      subMenu: [
        {
          name: "Create Product",
          link: "/product/create",
        },
        {
          name: "Product List",
          link: "/product/list",
        },
      ],
    },
    {
      name: "Category",
      subMenu: [
        {
          name: "Create Category",
          link: "/category/create",
        },
        {
          name: "Category List",
          link: "/category/list",
        },
      ],
    },
    {
      name: "Order",
      subMenu: [
        {
          name: "Create Order",
          link: "/order/create",
        },
        {
          name: "Order List",
          link: "/order/list",
        },
      ],
    },
    {
      name: "User",
      subMenu: [
        {
          name: "User List",
          link: "/user/list",
        },
      ],
    },
  ];

  const [selectedMenu, SetSelectedMenu] = useState(null);

  console.log(selectedMenu);

  return (
    <div>
      <h1 className="text-xl font-bold">Ecommerce Dashboard</h1>
      <hr className="h-2 bg-black" />
      <Stack className="mt-8 gap-4">
        {menuData.map((item, index) => {
          return (
            <div key={item?.name}>
              <div>
                <div
                  className="flex items-center"
                  onClick={() =>
                    SetSelectedMenu((prev) =>
                      prev === item?.name ? null : item?.name
                    )
                  }
                >
                  <h2 className="w-full min-w-20 text-lg">{item?.name}</h2>
                  <span>
                    <FaAngleDown size={20} />
                  </span>
                </div>
              </div>
              <>
                {selectedMenu === item?.name && (
                  <div className="pl-6 pt-2">
                    {item?.subMenu?.map((subItem, index) => {
                      return (
                        <ul className=" list-disc" key={subItem?.name}>
                          <li>
                            <Link to={subItem?.link}>{subItem?.name}</Link>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                )}
              </>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

export default Menu;
