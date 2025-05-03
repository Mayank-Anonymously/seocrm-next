import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import html2canvas from "html2canvas";
import { Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";
import moment from "moment";
import { Button } from "react-bootstrap";
import Loader2 from "@common/Loader2";
const Case_one = ({
  gHours,
  BRate,
  lodgemonth,
  mealRate,
  values,
  tableRef,
  targetElementRef,
  currentValue,
  onChange,
}: any) => {
  const calculatePayRate = () => {
    var HourRates: any;
    HourRates =
      BRate >= 60 && BRate <= 80
        ? 0.66 * BRate
        : BRate >= 40 && BRate <= 60
        ? 0.6 * BRate
        : BRate > 80 && BRate <= 130
        ? 0.7 * BRate
        : BRate > 130
        ? 0.68 * BRate
        : (BRate * 0.7).toFixed(2);

    return HourRates;
  };

  const calculateGross = () => {
    var gross: any;
    gross = calculatePayRate() * gHours;
    return gross;
  };
  const nontaxable = () => {
    var lodRate: any = 0;
    var nontax: any;
    lodgemonth
      .filter((item: any) => item.long === moment().format("MMMM"))
      .map((item: any) => {
        return (lodRate = item.value);
      });
    nontax = (lodRate + mealRate) * 7;
    return nontax;
  };

  const taxable = () => {
    var tax: any;
    tax = calculateGross() - nontaxable();
    return tax;
  };

  const sixtypercentTax = () => {
    var greaterSixty: any;
    greaterSixty = taxable() < 0 ? calculateGross() * 0.6 : 0;
    return greaterSixty;
  };

  const fortypercentNonTax = () => {
    var greaterForty: any;
    greaterForty = taxable() < 0 ? calculateGross() * 0.4 : 0;
    return greaterForty;
  };

  return (
    <div>
      <div className="container">
        <div className="row calculator-row">
          <div className="col-md-6 input-div">
            <h3
              className="calc-head"
              style={{
                background: "#438eff",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Billing
            </h3>
            <div className="row bill-table">
              <table>
                <tr>
                  <td>Bill Rate</td>
                  <td>
                    <Input
                      id="bill"
                      name="billRate"
                      value={BRate}
                      onChange={(e) => onChange("BillRate", e)}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>Guaranteed Hours</td>
                  <td>
                    <Input
                      id="guarHrs"
                      name="guarHrs"
                      value={gHours}
                      onChange={(e) => {
                        onChange("GuaranteedHours", e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    <Input id="city" name="city" value={values.City} />
                  </td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>
                    <Input id="state" name="state" value={values.State} />
                  </td>
                </tr>
                <tr>
                  <td>Job-Type</td>
                  <td>
                    <Input
                      id="jobType"
                      name="jobType"
                      value={
                        values.WorkType == "1"
                          ? "Travel"
                          : values.WorkType == "2"
                          ? "Perm"
                          : values.WorkType == "3"
                          ? "Per Diem"
                          : values.WorkType
                      }
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-md-6" ref={targetElementRef}>
            <h3
              className="calc-head"
              style={{
                background: "#438eff",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              Pay Package
            </h3>
            <div className="row bill-table output-table">
              <table id="table-to-xls" ref={tableRef}>
                <tr>
                  <td>Location</td>
                  <td>
                    <Input
                      id="location"
                      name="location"
                      value={values.City + "," + values.State}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hour Rates</td>
                  <td>
                    <Input
                      id="hourRates"
                      name="hourRates"
                      value={calculatePayRate()}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gross Weekly</td>
                  <td>
                    <Input
                      id="grossWeekly"
                      name="grossWeekly"
                      value={calculateGross()}
                    />
                  </td>
                </tr>
                {/* {stateCA == "CA" && shiftTime > 8 ? (
                  <tr>
                    <td>Gross Weekly include OT</td>
                    <td>
                      <Input
                        id="grossWeekly"
                        name="grossWeekly"
                        value={calculateGross()}
                      />
                    </td>
                  </tr>
                ) : (
                  ""
                )} */}
                <tr>
                  <td>Non-Taxes Rates</td>
                  <td>
                    <Input
                      id="nonTax"
                      name="nonTax"
                      type="number"
                      value={
                        fortypercentNonTax() > 0
                          ? fortypercentNonTax()
                          : nontaxable()
                      }
                      //   onChange={(e: any) => setData(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Taxable Rates</td>
                  <td>
                    <Input
                      id="taxRates"
                      name="taxRates"
                      type="number"
                      value={
                        sixtypercentTax() > 0 ? sixtypercentTax() : taxable()
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Guaranteed Hours</td>
                  <td>
                    <Input id="guarnhrs" name="guarnhrs" value={gHours} />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case_one;
