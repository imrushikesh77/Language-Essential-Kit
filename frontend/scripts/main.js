// Function to fetch and populate categories from category.txt
function populateCategories() {
  fetch("./categories.txt")
    .then((response) => response.text())
    .then((data) => {
      const categories = data
        .split("\n")
        .map((cat) => cat.trim())
        .filter((cat) => cat !== "");

      // Sort categories alphabetically
      categories.sort();

      const categorySelect = document.getElementById("categorySelect");

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
}

// Custom matcher for Select2 to prioritize exact matches
function customMatcher(params, data) {
  // If there are no search terms, return all options
  if ($.trim(params.term) === "") {
    return data;
  }

  // Filter for exact match at the start of the string
  if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) === 0) {
    return data;
  }

  // Return null if the term doesn't match
  return null;
}

// Function to fetch and populate languages from languages.txt
function populateLanguages() {
  fetch("./languages.txt")
    .then((response) => response.text())
    .then((data) => {
      const languages = data
        .split("\n")
        .map((lang) => lang.trim())
        .filter((lang) => lang !== "");

      // Sort languages alphabetically
      languages.sort();
      
      const languageSelect = document.getElementById("languageSelect");

      languages.forEach((language) => {
        const option = document.createElement("option");
        option.value = language;
        option.textContent = language;
        languageSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching languages:", error));
}

function showDownloadButton() {
  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.style.cursor = 'pointer';
  document.getElementById('downloadButtonContainer').style.display = 'block';
}

function hideDownloadButton() {
  document.getElementById('downloadButtonContainer').style.display = 'none';
}

// Function to download the table as a PDF
function downloadPdf() {
  const element = document.getElementById('resultTableContainer');
  const margin = 10; // Define your margin size (in mm)

  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    // Access jsPDF from window.jspdf namespace
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Subtracting margins (left and right)
    const pdfHeightAvailable = pdf.internal.pageSize.getHeight() - 2 * margin; // Subtracting margins (top and bottom)
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate proportional height based on width

    // If content height exceeds available height, adjust height to fit within margins
    const finalHeight = pdfHeight > pdfHeightAvailable ? pdfHeightAvailable : pdfHeight;

    // Adding the rendered canvas image to the PDF with margins
    pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, finalHeight);
    pdf.save('language_essentials.pdf');
  });
}

// Function to fetch table data from the API
function fetchTableData(city, language, category) {

  // Hide the download button
  hideDownloadButton();

  const apiUrl = `https://language-essential-kit.onrender.com/get-result`;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city, language, category })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // console.log("Parsed data:", data);
    
    if (data && data.result) {
      // Remove backticks and 'json' from the result string
      let jsonString = data.result.replace(/```json\n|\n```/g, '').trim();
      
      try {
        let tableData = JSON.parse(jsonString);
        
        if (Array.isArray(tableData) && tableData.length > 0) {
          // console.log("Table data parsed successfully:", tableData);
          populateTable(tableData);
        } else {
          throw new Error("Parsed data is not an array or is empty");
        }
      } catch (error) {
        console.error("Error parsing JSON string:", error);
        alert("Error processing data from server.");
      }
    } else {
      console.error("No 'result' property in the data");
      alert("Invalid data received from server.");
    }
  })
  .catch(error => {
    console.error("Error fetching table data:", error);
    alert("Error fetching data from server.");
  });
}

// Function to populate the table with data
function populateTable(data) {
  const resultTableContainer = document.getElementById("resultTableContainer");

  // Clear any existing table
  resultTableContainer.innerHTML = "";

  // Create a new table
  const table = document.createElement("table");
  table.className = "resultTable";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["Local Language", "Local Language in English", "Native Language"];

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");

  // Add rows from data
  data.forEach((item) => {
    const row = document.createElement("tr");
    const values = [
      item["local language"],
      item["local lang in english"],
      item["native language"],
    ];

    values.forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to the container
  resultTableContainer.appendChild(table);

  // Show the download button
  showDownloadButton();
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from reloading the page
  const submitButton = document.querySelector('input[type="submit"]');
  const city = document.getElementById("addressBar").value;
  const language = document.getElementById("languageSelect").value;
  const category = document.getElementById("categorySelect").value;
  // Fetch and display table data
  submitButton.style.cursor = 'wait';
  fetchTableData(city, language, category);
}

function addClickEventToLi(){
  const suggestionItems = document.querySelectorAll("#suggestionList li");
  suggestionItems.forEach(item => {
    item.addEventListener("click",()=>{
      const selectedText = item.innerText;
      const inputField = document.querySelector("#addressBar");
      inputField.value = selectedText
      document.querySelector("#suggestionBox").classList.add("notVisible");
    })
  })
}

function updateAddressList(addresses){
  let ul = document.getElementById("suggestionList");
  let suggestionBox = document.getElementById("suggestionBox");
  suggestionBox.classList.remove("notVisible")
  ul.innerHTML = '';
  addresses.forEach(address => {
    const liElt = document.createElement("li");
    liElt.innerText = address.address_line1  + ", " + address.address_line2;
    ul.appendChild(liElt);
  })
  addClickEventToLi();
}

function fetchAddress(input) {
  const url = `http://localhost:3000/get-addresses?query=${encodeURIComponent(input)}`;
  let addresses = [];
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          // console.log(data);
          addresses = addresses.concat(data);
          updateAddressList(addresses);
      })
      .catch(error => {
          console.error("Error fetching addresses:", error);
      });
}

function debounce(func, delay) {
  let timeout=null
  return (input) => {
      if(timeout) clearTimeout(timeout)

      timeout=setTimeout(() => {
          func(input)
      }, delay)
  }
}

const debounceFun = debounce(fetchAddress,500);

const addressBar = document.querySelector("#addressBar");
addressBar.addEventListener("input",(e)=>{
  debounceFun(e.target.value);
})

// Call the functions to populate languages and categories on page load
document.addEventListener("DOMContentLoaded", () => {
  populateLanguages();
  populateCategories();
});

// Attach the form submission handler
document
  .getElementById("languageCityCategoryForm")
  .addEventListener("submit", handleFormSubmit);

// Attach the download button click handler
const button = document.getElementById('downloadPdfButton');
button.addEventListener('click', downloadPdf);
