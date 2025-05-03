import { GettAllContent } from "Components/slices/content/thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Privacy = () => {
  const dispatch: any = useDispatch();
  const { content } = useSelector((state: any) => ({
    content: state.content.contentData,
  }));

  useEffect(() => {
    dispatch(GettAllContent());
  }, []);

  //   const con = `<h1>Mayank</h1>`;
  //   console.log(content);
  const con = content
    .filter((item: any) => item.title === "Privacy Policy")
    .map((item: any) => item.content);
  console.log(content);

  return <div dangerouslySetInnerHTML={{ __html: con }} />;
};

export default Privacy;
