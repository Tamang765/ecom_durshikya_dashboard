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


  return (
    <div>
      <h1 className="text-xl font-bold">Ecommerce Dashboard</h1>
      <hr className="h-2 bg-black" />
      <Stack className="gap-4 mt-8">
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
                  <h2 className="w-full text-lg min-w-20">{item?.name}</h2>
                  <span>
                    <FaAngleDown size={20} />
                  </span>
                </div>
              </div>
              <>
                {selectedMenu === item?.name && (
                  <div className="pt-2 pl-6">
                    {item?.subMenu?.map((subItem, index) => {
                      return (
                        <ul className="list-disc " key={subItem?.name}>
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
