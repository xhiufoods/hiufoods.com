// Google Sheets API Setup
const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const form = document.forms['salesForm'];

// Submit Form to Google Sheets
form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    
    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => alert('Penjualan berhasil ditambahkan!'))
    .catch(error => alert('Terjadi kesalahan: ' + error.message));
});

// Example for pagination and date filter (You would need actual data from your Google Sheet)
document.getElementById('filterBtn').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const salesTable = document.getElementById('salesTable');
    
    // Fetch and filter sales data based on dates
    fetch('sales-data.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => {
                return new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate);
            });
            
            salesTable.innerHTML = '';
            filteredData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.product}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.total}</td>
                    <td>${item.date}</td>
                `;
                salesTable.appendChild(row);
            });
        });
});
