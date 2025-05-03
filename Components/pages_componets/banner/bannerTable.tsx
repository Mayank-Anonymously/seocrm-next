import React, { useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBanner,deleteBanner,updateBannerStatus } from "Components/slices/banner/thunk"; 
import {
  imagebaseURL,
} from "../../../Components/helpers/url_helper";
import { useRouter } from "next/navigation";
const bannerTable = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const bannerdata = useSelector((state: any) => state.banner.bannerdata);
  useEffect(()=>{
    dispatch(GetAllBanner());
  },[])
  
  return (
    <div>
      <Col xl={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Actions</th>
              <th>SR NO</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
              {
                bannerdata?.map((item:any,index:any)=>{
                  return(
                    <tr key={item._id}>
                      <td>
                      <>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-2">
                            <span
                              className="cursor-pointer"
                              onClick={() => dispatch(deleteBanner(item._id))}
                            >
                              <i className="bi bi-trash" />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                router.push(`/banner/edit-banner/${item._id}`);
                              }}
                            >
                              <i className="bi bi-pencil" />
                            </span>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={item.status}
                                onClick={(e) => {
                                  dispatch(
                                    updateBannerStatus(item._id, !item.status)
                                  );
                                }}
                              />
                          </div>
                          </div>
                        </div>
                      </>
                      </td>
                      <td>{++index}</td>
                      <td></td>
                      <div className="flex-shrink-0 me-2">
                      <img
                          src={`${imagebaseURL}${item.image}`}
                          width="32"
                          height={32}
                          alt=""
                          className="avatar-xs rounded-circle"
                        />
                      </div>
                    </tr>
                  )
                })
              }
              
          </tbody>
        </Table>
      </Col>
    </div>
  );
};

export default bannerTable;
