import { GettAllContent } from "Components/slices/content/thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Terms = () => {
  const dispatch: any = useDispatch();
  const { content } = useSelector((state: any) => ({
    content: state.content.contentData,
  }));

  useEffect(() => {
    dispatch(GettAllContent());
  }, []);
  const con = content
    .filter((item: any) => item.title === "Terms and Conditions")
    .map((item: any) => item.content);

  return <div dangerouslySetInnerHTML={{ __html: con }} />;
};

export default Terms;
