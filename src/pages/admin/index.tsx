import BlogsDashboard from "@components/admin/blogs";
import ProductCategoriesDashboard from "@components/admin/product-categories";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import useWindowDimensions from "@utils/hooks/useWindowDimentions";
import { Tabs } from "antd";
import { ROLE } from "@interfaces/authenticate.interface";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPositionAdminTab, savePositionTab } from "../../redux/store/common/commonSlice";

const { TabPane } = Tabs;

const ImageTabComponent = dynamic(() => import("../../components/admin/images/index"), {
  ssr: false,
});

const ProductTabComponent = dynamic(() => import("../../components/admin/product/index"), {
  ssr: false,
});

const BlogCategoryTabComponent = dynamic (() => import("@components/admin/blog-categories"), {
  ssr: false
})

const Admin: NextPage = () => {
  const profile = useUserProfile();
  const router = useRouter();
  const {width, height} = useWindowDimensions();
  const tabPosition = useSelector(getPositionAdminTab)
  const dispatch = useDispatch();

  // if (!profile || (profile && profile.role !== ROLE.ADMIN)) {
  //   router.push("/login");
  // }

  useLayoutEffect(() => {
    if (!profile || (profile && profile.role !== ROLE.ADMIN)) {
      router.push("/login");
    }
    return () => {dispatch(savePositionTab("1"))}
  }, [])

  return (
    <div className="min-h-screen p-2">
      <Tabs className="min-h-screen" tabPosition={width < 640 ?"top" : "left"} defaultActiveKey={tabPosition} onChange={(activeKey) => dispatch(savePositionTab(activeKey))}>
        <TabPane tab="Images" key="1">
          <ImageTabComponent />
        </TabPane>
        <TabPane tab="Products" key="2">
          <ProductTabComponent />
        </TabPane>
        <TabPane tab="Products Category" key="3">
          <ProductCategoriesDashboard/>
        </TabPane>
        <TabPane tab="Blogs" key="4">
            <BlogsDashboard/>
        </TabPane>
        <TabPane tab="Blogs Category" key="5">
            <BlogCategoryTabComponent/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
