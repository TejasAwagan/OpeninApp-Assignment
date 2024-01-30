import { Fragment, useState } from "react";
import "./dashboard.css";
import * as XLSX from "xlsx";
import { parse } from "papaparse";

export const Dashboard = () => {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [data, setData] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  };

  function hideMenu(value, menu, closeBtn) {
    menu.style.left = value;
    closeBtn.classList.add("hidden");
  }

  function showMenu(value, menu, closeBtn) {
    menu.style.left = value;
    closeBtn.classList.remove("hidden");
  }

  function toggleMenu() {
    const menu = document.querySelector("nav");
    const closeBtn = document.querySelector(".menu__close_btn");
    menu.style.left === "-100%"
      ? showMenu(0, menu, closeBtn)
      : hideMenu("-100%", menu, closeBtn);
  }

  return (
    <Fragment>
      <nav>
        <section className="nav__logo">
          <p>
            <span className="dashboard__logo"></span>
            <span className="dashboard__brandname">BASE</span>
          </p>
          <span
            className="material-symbols-outlined menu__close_btn hidden"
            onClick={toggleMenu}
          >
            close
          </span>
        </section>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            dashboard
          </span>
          <span className="dashboard__option_name">Dashboard</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            equalizer
          </span>
          <span className="dashboard__option_name">Upload</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            receipt_long
          </span>
          <span className="dashboard__option_name">Invoice</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            description
          </span>
          <span className="dashboard__option_name">Schedule</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            calendar_month
          </span>
          <span className="dashboard__option_name">Calendar</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            notifications
          </span>
          <span className="dashboard__option_name">Notification</span>
        </p>
        <p>
          <span className="dashboard__option_icon material-symbols-outlined">
            settings
          </span>
          <span className="dashboard__option_name">Setting</span>
        </p>
      </nav>

      <header className="mobile__header ">
        <section className="menu__btn" onClick={toggleMenu}>
          <span className="material-symbols-outlined">menu</span>
          <p>
            <span className="dashboard__logo"></span>
            <span className="dashboard__brandname">BASE</span>
          </p>
        </section>
        <section>
          <span className="bell_icon material-symbols-outlined">
            notifications
          </span>
          <span className="profile_picture"></span>
        </section>
      </header>

      <section className="right__section-Dashboard">
        <section className="top__dashboard_right">
          <h1>Upload CSV</h1>
          <p className="top__dashboard_right--rightside">
            <span className="bell_icon material-symbols-outlined">
              notifications
            </span>
            <span className="profile_picture"></span>
          </p>
        </section>
        <div
            className="wrapper"
            onDragOver={(event) => {
              event.preventDefault();
              console.log("Gragging over");
            }}
            onDrop={(event) => {
              event.preventDefault();
              console.log("Drooped");
              console.log(event.dataTransfer.files);
              Array.from(event.dataTransfer.files).map(async (file) => {
                let text = await file.text();
                let result = parse(text, { header: true });
                console.log(result);
                setExcelData(result.data);
              });
            }}
          ></div>

        <section className="middle__dashboard_right">
          <p className="hidden">Upload CSV</p>
          {/* ////////////////////////////////////////////////////////////////////////////// */}
          
          <div>
            <img src="./assets/excel.png" alt="ecxel logo" />
            
            <form className="form" onSubmit={handleFileSubmit}>
              <input
                type="file"
                className="form-control"
                required
                onChange={handleFile}
              />

              {typeError && (
                <div className="alert alert-danger" role="alert">
                  {typeError}
                </div>
              )}

              <button
                className="Upload__Button"
                id="Upload__Button"
                type="submit"
              >
                <span className="material-symbols-outlined"></span> Upload
              </button>
            </form>

            <p className="infoArea">
              Drop your excel sheet here or{" "}
              <span
                className="browse__Button mainBtn"
                id="browse__Button"
                onClick={handleFile}
              >
                browse
              </span>
            </p>
          </div>
        </section>
        {/* view data */}
        <div className="table-wrapper">
          {excelData || data ? (
            <div className="table-responsive">
              <table className="fl-table">
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {excelData.map((individualExcelData, index) => (
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No File is uploaded yet!</div>
          )}
        </div>
      </section>
    </Fragment>
  );
};
