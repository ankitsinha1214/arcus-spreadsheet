import { useEffect } from "react";
// @ts-ignore
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

import mockData from "./data/marketData.json";

// Convert array of objects to spreadsheet-style 2D array
function convertJsonToSheetData(jsonData: any[]): any[][] {
  const sheetRows: any[][] = [];

  jsonData.forEach((row) => {
    const sheetRow: any[] = [];

    for (let i = 0; i <= 6; i++) {
      sheetRow.push(
        row[`block${i}`] || "",
        row[`blockCheck${i}`] || "",
        row[`blockOffer${i}`] || ""
      );
    }

    sheetRow.push(row["AC"] || "", row["MSG"] || "", row["AOR"] || "");
    sheetRows.push(sheetRow);
  });

  return sheetRows;
}
// function createColumns() {
//   const columns: any[] = [
//     {
//       title: "ID",
//       field: "id",
//       width: 60,
//       hozAlign: "center",
//       frozen: true,
//     },
//   ];

//   for (let i = 0; i <= 6; i++) {
//     columns.push({
//       title: `Block ${i}`,
//       columns: [
//         {
//           title: "$/MWh",
//           field: `block${i}`,
//           hozAlign: "right",
//           formatter: (cell: any) => {
//             const value = cell.getValue();
//             if (value === "") return '<span class="empty-cell">-</span>';
//             const num = parseFloat(value);
//             const cls = num === 0 ? "zero-value" : "price-cell";
//             return `<span class="${cls}">$${value}</span>`;
//           },
//         },
//         {
//           title: "MW",
//           field: `blockCheck${i}`,
//           hozAlign: "center",
//           formatter: (cell: any) => {
//             const value = cell.getValue();
//             return value === "" ? '<span class="empty-cell">-</span>' : value;
//           },
//         },
//         {
//           title: "OCP",
//           field: `blockOffer${i}`,
//           hozAlign: "center",
//           formatter: (cell: any) => {
//             const value = cell.getValue();
//             return value === "" ? '<span class="empty-cell">-</span>' : value;
//           },
//         },
//       ],
//     });
//   }

//   columns.push(
//     {
//       title: "AC",
//       field: "AC",
//       hozAlign: "center",
//     },
//     {
//       title: "Msg",
//       field: "MSG",
//       hozAlign: "center",
//     },
//     {
//       title: "AOR",
//       field: "AOR",
//       hozAlign: "center",
//       formatter: (cell: any) => {
//         const value = cell.getValue();
//         return value === "Normal Operations"
//           ? `<span class="aor-normal">${value}</span>`
//           : value;
//       },
//     }
//   );

//   return columns;
// }
// function createColumns() {
//   const columns: any[] = [
//     {
//       title: "ID",
//       field: "id",
//       width: 60,
//       hozAlign: "center",
//       frozen: true,
//     },
//   ];

//   for (let i = 0; i <= 6; i++) {
//     columns.push({
//       title: `Block ${i}`,
//       columns: [
//         {
//           title: "$/MWh",
//           field: `block${i}`,
//           hozAlign: "right",
//           editor: "input",
//           formatter: (cell: any) => {
//             const value = cell.getValue();
//             if (value === "") return '<span class="empty-cell">-</span>';
//             const num = parseFloat(value);
//             const cls = num === 0 ? "zero-value" : "price-cell";
//             return `<span class="${cls}">$${value}</span>`;
//           },
//         },
//         {
//           title: "MW",
//           field: `blockCheck${i}`,
//           hozAlign: "center",
//           editor: "input",
//           formatter: (cell: any) => {
//             const value = cell.getValue();
//             return value === "" ? '<span class="empty-cell">-</span>' : value;
//           },
//         },
//         {
//           title: "OCP",
//           field: `blockOffer${i}`,
//           hozAlign: "center",
//           editor: "input",
//           formatter: (cell: any) => {
//             const value = cell.getValue();
//             return value === "" ? '<span class="empty-cell">-</span>' : value;
//           },
//         },
//       ],
//     });
//   }

//   columns.push(
//     {
//       title: "AC",
//       field: "AC",
//       hozAlign: "center",
//       editor: "input",
//     },
//     {
//       title: "Msg",
//       field: "MSG",
//       hozAlign: "center",
//       editor: "input",
//     },
//     {
//       title: "AOR",
//       field: "AOR",
//       hozAlign: "center",
//       editor: "input",
//       formatter: (cell: any) => {
//         const value = cell.getValue();
//         return value === "Normal Operations"
//           ? `<span class="aor-normal">${value}</span>`
//           : value;
//       },
//     }
//   );

//   return columns;
// }
// Flat columns: field index ("0", "1", ...) instead of field name
function createFlatColumns(): any[] {
  const columns: any[] = [];

  let colIndex = 0;

  for (let i = 0; i <= 6; i++) {
    columns.push(
      {
        title: `B${i} $/MWh`,
        field: `${colIndex++}`,
        editor: "input",
        hozAlign: "right",
        formatter: (cell: any) => {
          const value = cell.getValue();
          if (value === "") return '<span class="empty-cell">-</span>';
          const num = parseFloat(value);
          const cls = num === 0 ? "zero-value" : "price-cell";
          return `<span class="${cls}">$${value}</span>`;
        },
      },
      {
        title: `B${i} MW`,
        field: `${colIndex++}`,
        editor: "input",
        hozAlign: "center",
        formatter: (cell: any) => {
          const value = cell.getValue();
          return value === "" ? '<span class="empty-cell">-</span>' : value;
        },
      },
      {
        title: `B${i} OCP`,
        field: `${colIndex++}`,
        editor: "input",
        hozAlign: "center",
        formatter: (cell: any) => {
          const value = cell.getValue();
          return value === "" ? '<span class="empty-cell">-</span>' : value;
        },
      }
    );
  }

  // Final 3 fields: AC, MSG, AOR
  columns.push(
    {
      title: "AC",
      field: `${colIndex++}`,
      hozAlign: "center",
      editor: "input",
    },
    {
      title: "MSG",
      field: `${colIndex++}`,
      hozAlign: "center",
      editor: "input",
    },
    {
      title: "AOR",
      field: `${colIndex++}`,
      hozAlign: "center",
      editor: "input",
      formatter: (cell: any) => {
        const value = cell.getValue();
        return value === "Normal Operations"
          ? `<span class="aor-normal">${value}</span>`
          : value;
      },
    }
  );

  return columns;
}

export default function MarketDataTable() {
  useEffect(() => {
    const sheetData = convertJsonToSheetData(mockData);
    const table = new Tabulator("#market-data-table", {
      data: sheetData,
      layout: "fitColumns",
      resizableColumnFit:true,
      // columns: [
      //   { title: "B0 $", field: "0" },
      //   { title: "B0 MW", field: "1" },
      //   { title: "B0 OCP", field: "2" },
      //   { title: "B1 $", field: "3" },
      //   { title: "B1 MW", field: "4" },
      //   { title: "B1 OCP", field: "5" },
      //   { title: "B2 $", field: "6" },
      //   { title: "B2 MW", field: "7" },
      //   { title: "B2 OCP", field: "8" },
      //   { title: "B3 $", field: "9" },
      //   { title: "B3 MW", field: "10" },
      //   { title: "B3 OCP", field: "11" },
      //   { title: "B4 $", field: "12" },
      //   { title: "B4 MW", field: "13" },
      //   { title: "B4 OCP", field: "14" },
      //   { title: "B5 $", field: "15" },
      //   { title: "B5 MW", field: "16" },
      //   { title: "B5 OCP", field: "17" },
      //   { title: "B6 $", field: "18" },
      //   { title: "B6 MW", field: "19" },
      //   { title: "B6 OCP", field: "20" },
      //   { title: "AC", field: "21" },
      //   { title: "MSG", field: "22" },
      //   { title: "AOR", field: "23" },
      // ],
      // columns: createColumns(),
      // height: "600px",
      height:"311px",
      columns: createFlatColumns(),
      // responsiveLayout: "collapse",
      movableColumns: true,
      resizableRows: true,
      // pagination: "local",
      paginationMode: "local",
      pagination: true,       
      paginationSize: 10,
      // Enable range selection
      selectable: true,
      selectableRangeMode: "click",
    selectableRange: 1,
    selectableRangeColumns: true,
    selectableRangeRows: true,
    selectableRangeClearCells: true,
    // Make editing smoother
    editTriggerEvent: "click",
    clipboard: true,
    clipboardCopyStyled: false,
    clipboardCopyConfig: {
      rowHeaders: false,
      columnHeaders: false,
    },
    clipboardCopyRowRange: "range",
    clipboardPasteParser: "range",
    clipboardPasteAction: "range",
    rowHeader: {
      resizable: false,
      frozen: true,
      width: 40,
      hozAlign: "center",
      formatter: "rownum",
      cssClass: "range-header-col",
      editor: false,
    },
     columnDefaults: {
      headerSort: false,
      headerHozAlign: "center",
      editor: "input",
      resizable: "header",
      width: 100,
    },
      cellSelected: function (cell: any) {
        cell.getElement().style.backgroundColor = "#cce5ff"; // highlight cell
      },
      cellDeselected: function (cell: any) {
        cell.getElement().style.backgroundColor = ""; // remove highlight
      },
    } as any);

    document
      .getElementById("export-excel")
      ?.addEventListener("click", () => {
        table.download("xlsx", "market-data.xlsx", {
          sheetName: "Market Data",
        });
      });
  }, []);

  return (
    <div style={{ 
      // height: "100vh",
       display: "flex", flexDirection: "column" }}>
    <div className="btn-group">
      <button id="export-excel">Energy Market Data</button>
      {/* <button id="export-excel">Export to Excel</button> */}
    </div>
    <div id="market-data-table" style={{ flex: 1 ,

      height: "600px",
    }} />
  </div>
  );
}
