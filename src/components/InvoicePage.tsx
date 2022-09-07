import React, { FC, useState, useEffect } from "react";
import { Invoice, ProductLine } from "../data/types";
import { initialInvoice, initialProductLine } from "../data/initialData";
import EditableInput from "./EditableInput";
// import EditableSelect from './EditableSelect'
import EditableTextarea from "./EditableTextarea";
import EditableCalendarInput from "./EditableCalendarInput";
import EditableFileImage from "./EditableFileImage";
// import countryList from '../data/countryList'
import View from "./View";
import Text from "./Text";
import Download from "./DownloadPDF";
import format from "date-fns/format";
import { formatCurrency, numInWords } from "../utils/utils";
import fetchData from "../utils/fetchData";
import { AddData, UpdateValue } from "../utils/fetchdataFirebase";
import { useNavigate } from "react-router-dom";

interface Props {
  data?: Invoice;
  pdfMode?: boolean;
  taxOptions?: {
    igst: boolean;
    cgst: boolean;
    sgst: boolean;
  };
  currency?: {
    symbol: string;
    code: string;
    label?: string;
    text?: string;
  };
  btnKey: string;
  id: string;
}

const InvoicePage: FC<Props> = ({
  data,
  pdfMode,
  taxOptions,
  currency,
  btnKey,
  id,
}) => {
  const navigator = useNavigate();
  const [invoice, setInvoice] = useState<Invoice>(
    data ? { ...data } : { ...initialInvoice }
  );
  const [subTotal, setSubTotal] = useState<number>();
  const [igst, setIgst] = useState<number>(0);
  const [cgst, setCgst] = useState<number>(0);
  const [sgst, setSgst] = useState<number>(0);

  const dateFormat = "MMM dd, yyyy";
  const invoiceDate =
    invoice.invoiceDate !== "" ? new Date(invoice.invoiceDate) : new Date();
  const invoiceDueDate =
    invoice.invoiceDueDate !== ""
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf());

  if (invoice.invoiceDueDate === "") {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }

  const handleChange = (name: keyof Invoice, value: string | number) => {
    if (name !== "productLines") {
      const newInvoice = { ...invoice };

      if (name === "logoWidth" && typeof value === "number") {
        newInvoice[name] = value;
      } else if (name !== "logoWidth" && typeof value === "string") {
        newInvoice[name] = value;
      }
      // if(name === 'igst' && typeof value === 'string'){
      //   console.log("happening igst 🍦")
      //   newInvoice[name] = value
      // }

      setInvoice(newInvoice);
    }
  };

  const handleProductLineChange = (
    index: number,
    name: keyof ProductLine,
    value: string
  ) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine };

        if (name === "description" || name === "duration") {
          newProductLine[name] = value;
        } else {
          if (
            value[value.length - 1] === "." ||
            (value[value.length - 1] === "0" && value.includes("."))
          ) {
            newProductLine[name] = value;
          } else {
            const n = parseInt(value);

            newProductLine[name] = (n ? n : 0).toString();
          }
        }

        return newProductLine;
      }

      return { ...productLine };
    });

    setInvoice({ ...invoice, productLines });
  };

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter(
      (productLine, index) => index !== i
    );

    setInvoice({ ...invoice, productLines });
  };

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }];

    setInvoice({ ...invoice, productLines });
  };

  const calculateAmount = (hours: string, rate: string) => {
    const hoursNumber = parseInt(hours, 10);
    const rateNumber = parseInt(rate.replace(/,/g, ""), 10);
    const amount = hoursNumber && rateNumber ? hoursNumber * rateNumber : 0;

    return formatCurrency(amount);
  };

  useEffect(() => {
    let subTotal = 0;

    invoice.productLines.forEach((productLine) => {
      const hoursNumber = parseInt(productLine.hours);
      const rateNumber = parseInt(productLine.rate);
      const amount = hoursNumber && rateNumber ? hoursNumber * rateNumber : 0;

      subTotal += amount;
    });

    setSubTotal(subTotal);
  }, [invoice.productLines]);

  useEffect(() => {
    if (taxOptions?.igst) {
      const matchIGST = invoice.igstLabel.match(/(\d+)%/);
      const taxRateIGST = matchIGST ? parseFloat(matchIGST[1]) : 0;
      const igst = subTotal ? (subTotal * taxRateIGST) / 100 : 0;
      setIgst(igst);
    } else {
      setIgst(0);
    }

    if (taxOptions?.cgst) {
      const matchCGST = invoice.cgstLabel.match(/(\d+)%/);
      const taxRateCGST = matchCGST ? parseFloat(matchCGST[1]) : 0;
      const cgst = subTotal ? (subTotal * taxRateCGST) / 100 : 0;
      setCgst(cgst);
    } else {
      setCgst(0);
    }

    if (taxOptions?.sgst) {
      const matchSGST = invoice.sgstLabel.match(/(\d+)%/);
      const taxRateSGST = matchSGST ? parseFloat(matchSGST[1]) : 0;
      const sgst = subTotal ? (subTotal * taxRateSGST) / 100 : 0;
      setSgst(sgst);
    } else {
      setSgst(0);
    }
  }, [
    subTotal,
    invoice.igstLabel,
    invoice.cgstLabel,
    invoice.sgstLabel,
    taxOptions,
  ]);

  // useEffect(() => {
  //   const match = invoice.taxLabel.match(/(\d+)%/)
  //   const taxRate = match ? parseFloat(match[1]) : 0
  //   const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0

  //   setSaleTax(saleTax)
  // }, [subTotal, invoice.taxLabel])

  const saveInvoice = () => {
    // fetchData({
    //   url: `/createinvoice`,
    //   method: 'POST',
    //   body: {
    //     ...invoice,
    //     is_existing_invoice: true
    //   }
    // })
    // .then((d) => {
    //   alert(d)
    // })
    // .catch(e => {
    //   alert(e.message)
    // })
    const f_incoice = Final_cheackers();

    console.log("[invoice😃]", invoice);
    setInvoice({ ...invoice, igst: String(igst) });
    console.log("[Scucess📰] value add");
    AddData(f_incoice, "new")
      .then((e) => {
        console.log("[Scucess⏬] value add");
        navigator("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const Final_cheackers = () => {
    const u_invoice = { ...invoice, igst: igst === 0 ? "" : `${igst}` };
    const u1_invoice = { ...u_invoice, cgst: cgst === 0 ? "" : `${cgst}` };
    const u2_invoice = { ...u1_invoice, sgst: sgst === 0 ? "" : `${sgst}` };

    const uc_invoice = { ...u2_invoice, currency: `${currency?.code}` };

    console.log("[cureencycode 💸]", currency?.code);

    return uc_invoice;
  };
  const updateIn = () => {
    const f_incoice = Final_cheackers();

    console.log("[Scucess📰] value add");
    UpdateValue(f_incoice, id)
      .then((e) => {
        console.log("[updated⏬] value add");
        navigator("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const duplicatIn = () => {
    const f_incoice = Final_cheackers();
    console.log("[duplicated🐿️]", invoice);
    AddData(f_incoice, "dupe")
      .then((e) => {
        console.log("[Scucess⏬] value add");
        navigator("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div>
      <div id="section-to-print" className="page invoice-wrapper">
        {!pdfMode && <Download data={invoice} />}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <EditableInput
              className="fs-20 bold theme-dark"
              placeholder="Invoice"
              value={invoice.title}
              onChange={(value) => handleChange("title", value)}
              pdfMode={pdfMode}
            />

            <View className="flex mb-5 mt-10" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceTitleLabel}
                  onChange={(value) => handleChange("invoiceTitleLabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-75" pdfMode={pdfMode}>
                <EditableInput
                  placeholder="INV-M0012"
                  value={invoice.invoiceTitle}
                  onChange={(value) => handleChange("invoiceTitle", value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDateLabel}
                  onChange={(value) => handleChange("invoiceDateLabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-75" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDate, dateFormat)}
                  selected={invoiceDate}
                  onChange={(date) =>
                    handleChange(
                      "invoiceDate",
                      date && !Array.isArray(date)
                        ? format(date, dateFormat)
                        : ""
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDueDateLabel}
                  onChange={(value) =>
                    handleChange("invoiceDueDateLabel", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-75" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDueDate, dateFormat)}
                  selected={invoiceDueDate}
                  onChange={(date) =>
                    handleChange(
                      "invoiceDueDate",
                      date && !Array.isArray(date)
                        ? format(date, dateFormat)
                        : ""
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
          </View>
          <View className="w-40 right" pdfMode={pdfMode}>
            <EditableFileImage
              className="logo"
              placeholder="Your Logo"
              // value={require(`../images/${invoice.logo}`)}
              value={`${invoice.logo}`}
              width={invoice.logoWidth}
              pdfMode={pdfMode}
              onChangeImage={(value) => handleChange("logo", value)}
              onChangeWidth={(value) => handleChange("logoWidth", value)}
            />
          </View>
        </View>

        <View className="flex mt-10" pdfMode={pdfMode}>
          <View
            className="w-50 bg-theme-light p-10 rad-sm mr-10"
            pdfMode={pdfMode}
          >
            <EditableInput
              className="fs-16 bold theme-dark mb-5"
              value={invoice.billBy}
              onChange={(value) => handleChange("billTo", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              className="fs-14 bold"
              placeholder="Your Company"
              value={invoice.companyName}
              onChange={(value) => handleChange("companyName", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Company's Address"
              value={invoice.companyAddress}
              onChange={(value) => handleChange("companyAddress", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="City, State Zip"
              value={invoice.companyAddress2}
              onChange={(value) => handleChange("companyAddress2", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="GSTIN: "
              value={invoice.companyGstin}
              onChange={(value) => handleChange("companyGstin", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="PAN: "
              value={invoice.companyPan}
              onChange={(value) => handleChange("companyPan", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Email: "
              value={invoice.companyEmail}
              onChange={(value) => handleChange("companyEmail", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Phone: "
              value={invoice.companyPhone}
              onChange={(value) => handleChange("companyPhone", value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-50 bg-theme-light p-10 rad-sm" pdfMode={pdfMode}>
            <EditableInput
              className="fs-16 bold theme-dark mb-5"
              value={invoice.billTo}
              onChange={(value) => handleChange("billTo", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              className="fs-14 bold"
              placeholder="Your Client's Name"
              value={invoice.clientName}
              onChange={(value) => handleChange("clientName", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Client's Address"
              value={invoice.clientAddress}
              onChange={(value) => handleChange("clientAddress", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="City, State Zip"
              value={invoice.clientAddress2}
              onChange={(value) => handleChange("clientAddress2", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientGstin}
              onChange={(value) => handleChange("clientGstin", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientPan}
              onChange={(value) => handleChange("clientPan", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientEmail}
              onChange={(value) => handleChange("clientEmail", value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientPhone}
              onChange={(value) => handleChange("clientPhone", value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        <View className="mt-20 bg-theme-dark flex rad-sm-t" pdfMode={pdfMode}>
          <View className="w-5 p-4-8" pdfMode={pdfMode}>
            <Text></Text>
          </View>
          <View className="w-40 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={invoice.productLineDescription}
              onChange={(value) =>
                handleChange("productLineDescription", value)
              }
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-20 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold center"
              value={invoice.productLineDuration}
              onChange={(value) => handleChange("productLineDuration", value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-10 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold center"
              value={invoice.productLineHours}
              onChange={(value) => handleChange("productLineHours", value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold center"
              value={invoice.productLineQuantityRate}
              onChange={(value) =>
                handleChange("productLineQuantityRate", value)
              }
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-10 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantityAmount}
              onChange={(value) =>
                handleChange("productLineQuantityAmount", value)
              }
              pdfMode={pdfMode}
            />
          </View>
        </View>

        {invoice.productLines.map((productLine, i) => {
          const rowColor = i % 2 === 0 ? "" : "bg-theme-light";
          return pdfMode && productLine.description === "" ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className={`row flex ${rowColor}`} pdfMode={pdfMode}>
              <View className="w-5 p-4-8" pdfMode={pdfMode}>
                <Text key={i} pdfMode={pdfMode}>
                  {i + 1 + "."}
                </Text>
              </View>
              <div className="view w-40 ptb-4">
                <EditableTextarea
                  className="dark"
                  placeholder="Enter item name/description"
                  value={productLine.description}
                  onChange={(value: string) =>
                    handleProductLineChange(i, "description", value)
                  }
                  pdfMode={pdfMode}
                />
              </div>
              <div className="view w-20 p-4-8">
                <EditableTextarea
                  className="dark center"
                  value={productLine.duration}
                  onChange={(value: string) =>
                    handleProductLineChange(i, "duration", value)
                  }
                  pdfMode={pdfMode}
                />
              </div>
              <View className="w-10 ptb-4" pdfMode={pdfMode}>
                <EditableInput
                  className="dark center"
                  value={productLine.hours}
                  onChange={(value) =>
                    handleProductLineChange(i, "hours", value)
                  }
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 ptb-4" pdfMode={pdfMode}>
                <EditableInput
                  className="dark center"
                  value={formatCurrency(productLine.rate)}
                  onChange={(value) =>
                    handleProductLineChange(i, "rate", value.replace(/,/g, ""))
                  }
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-10 ptb-4" pdfMode={pdfMode}>
                <Text className="dark right" pdfMode={pdfMode}>
                  {calculateAmount(productLine.hours, productLine.rate)}
                </Text>
              </View>
              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => handleRemove(i)}
                >
                  <span className="icon icon-remove bg-red"></span>
                </button>
              )}
            </View>
          );
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <View className="mt-10 donot-print" pdfMode={pdfMode}>
              {!pdfMode && (
                <button className="link" onClick={handleAdd}>
                  <span className="icon icon-add bg-green mr-10"></span>
                  Add Line Item
                </button>
              )}
            </View>
          </View>
        </View>

        {taxOptions?.igst || taxOptions?.cgst || taxOptions?.sgst ? (
          <View className="flex" pdfMode={pdfMode}>
            <View className="w-60" pdfMode={pdfMode}></View>
            <View className="w-40" pdfMode={pdfMode}>
              <View className="flex p-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <EditableInput
                    className="bold right"
                    value={invoice.subTotalLabel}
                    onChange={(value) => handleChange("totalLabel", value)}
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-60 flex" pdfMode={pdfMode}>
                  {/* <EditableInput
                      className="dark bold right"
                      value={invoice.currency}
                      onChange={(value) => handleChange('currency', value)}
                      pdfMode={pdfMode}
                    /> */}
                  <Text className="bold dark right" pdfMode={pdfMode}>
                    {`${currency?.symbol}` +
                      " " +
                      formatCurrency(
                        typeof subTotal !== "undefined" ? subTotal : 0
                      )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {taxOptions?.igst ? (
          <View className="flex" pdfMode={pdfMode}>
            <View className="w-60" pdfMode={pdfMode}></View>
            <View className="w-40" pdfMode={pdfMode}>
              <View className="flex p-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <EditableInput
                    className="bold right"
                    value={invoice.igstLabel}
                    onChange={(value) => handleChange("igstLabel", value)}
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-60 flex" pdfMode={pdfMode}>
                  {/* <EditableInput
                      className="dark bold right"
                      value={currency?.symbol}
                      onChange={(value) => handleChange('currency', value)}
                      pdfMode={pdfMode}
                    /> */}
                  <Text className="bold dark right" pdfMode={pdfMode}>
                    {currency?.symbol +
                      " " +
                      formatCurrency(typeof igst !== "undefined" ? igst : 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {taxOptions?.cgst ? (
          <View className="flex" pdfMode={pdfMode}>
            <View className="w-60" pdfMode={pdfMode}></View>
            <View className="w-40" pdfMode={pdfMode}>
              <View className="flex p-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <EditableInput
                    className="bold right"
                    value={invoice.cgstLabel}
                    onChange={(value) => handleChange("cgstLabel", value)}
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-60 flex" pdfMode={pdfMode}>
                  {/* <EditableInput
                      className="dark bold right"
                      value={currency?.symbol}
                      onChange={(value) => handleChange('currency', value)}
                      pdfMode={pdfMode}
                    /> */}
                  <Text className="bold dark right" pdfMode={pdfMode}>
                    {currency?.symbol +
                      " " +
                      formatCurrency(typeof cgst !== "undefined" ? cgst : 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {taxOptions?.sgst ? (
          <View className="flex" pdfMode={pdfMode}>
            <View className="w-60" pdfMode={pdfMode}></View>
            <View className="w-40" pdfMode={pdfMode}>
              <View className="flex p-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <EditableInput
                    className="bold right"
                    value={invoice.sgstLabel}
                    onChange={(value) => handleChange("sgstLabel", value)}
                    pdfMode={pdfMode}
                  />
                </View>
                <View className="w-60 flex" pdfMode={pdfMode}>
                  {/* <EditableInput
                      className="dark bold right"
                      value={currency?.symbol}
                      onChange={(value) => handleChange('currency', value)}
                      pdfMode={pdfMode}
                    /> */}
                  <Text className="bold dark right" pdfMode={pdfMode}>
                    {currency?.symbol +
                      " " +
                      formatCurrency(typeof sgst !== "undefined" ? sgst : 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <View className="mt-10 flex" pdfMode={pdfMode}>
              <Text className="" pdfMode={pdfMode}>
                {invoice.totalWordsLabel +
                  "" +
                  numInWords(
                    (typeof subTotal !== "undefined"
                      ? subTotal + igst + cgst + sgst
                      : 0
                    ).toFixed(0),
                    currency?.text
                  )?.toUpperCase()}
              </Text>
            </View>
          </View>
          <View className="w-40" pdfMode={pdfMode}>
            <View className="flex p-5" pdfMode={pdfMode}>
              <View className="w-40 bd-t" pdfMode={pdfMode}>
                <EditableInput
                  className="bold right"
                  value={invoice.totalLabel}
                  onChange={(value) => handleChange("totalLabel", value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60 bd-t flex" pdfMode={pdfMode}>
                {/* <EditableInput
                  className="dark bold right"
                  value={`${currency?.code} ${currency?.symbol}`}
                  onChange={(value) => handleChange('currency', value)}
                  pdfMode={pdfMode}
                /> */}
                <Text className="bold dark right" pdfMode={pdfMode}>
                  {`${currency?.code} ${currency?.symbol}` +
                    " " +
                    formatCurrency(
                      (typeof subTotal !== "undefined"
                        ? subTotal + igst + cgst + sgst
                        : 0
                      ).toFixed(0)
                    )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <div className="view mt-20">
          <EditableInput
            className="bold theme-dark w-100"
            value={invoice.termLabel}
            onChange={(value) => handleChange("termLabel", value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={invoice.term}
            onChange={(value: string) => handleChange("term", value)}
            pdfMode={pdfMode}
          />
        </div>
        <View className="mt-10" pdfMode={pdfMode}>
          <EditableInput
            className="bold theme-dark w-100"
            value={invoice.bankLabel}
            onChange={(value) => handleChange("termLabel", value)}
            pdfMode={pdfMode}
          />

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountNameLabel}
                onChange={(value) => handleChange("accountNameLabel", value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="flex-1" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountName}
                onChange={(value) => handleChange("accountName", value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankNameLabel}
                onChange={(value) => handleChange("bankNameLabel", value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="flex-1" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankName}
                onChange={(value) => handleChange("bankName", value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountNoLabel}
                onChange={(value) => handleChange("accountNoLabel", value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="flex-1" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountNo}
                onChange={(value) => handleChange("accountNo", value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankIfscLabel}
                onChange={(value) => handleChange("bankIfscLabel", value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="flex-1" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankIfsc}
                onChange={(value) => handleChange("bankIfsc", value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>
        </View>
        <div className="view mt-20">
          <EditableTextarea
            className="w-100 center"
            rows={2}
            value={invoice.notes}
            onChange={(value: string) => handleChange("notes", value)}
            pdfMode={pdfMode}
          />
        </div>
      </div>

      <div className="center">
        <button id="btn_outline">Pdf Download</button>
        {btnKey === "update" ? (
          <div>
            <button id="btn_outline" onClick={updateIn}>
              update
            </button>
            <button id="btn_outline" onClick={duplicatIn}>
              Dupicate
            </button>
          </div>
        ) : (
          <div>
            <button id="btn_outline" onClick={saveInvoice}>
              Save Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
