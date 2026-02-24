document.addEventListener('DOMContentLoaded', function() {
    const oilPrices = {
        '1': 65.95, '2': 66.38, '3': 65.97, '4': 65.77, '5': 67.4, '6': 68.61, '7': 70.99,
        '8': 70.79, '9': 70.75, '10': 69.79, '11': 66.33, '12': 68.22, '13': 68.74, '14': 67.52,
        '15': 67.92, '16': 67.77, '17': 67.87, '18': 68.94, '19': 68.93, '20': 69.66, '21': 67.7,
        '22': 67.46, '23': 68.65, '24': 67.4, '25': 70.61, '26': 71.92, '27': 71.65,'28': 71.83,
        '29': 71.49, '30': 72.36, '31': 71.39,
    };

    function calculateMetrics(currentPrice, previousPrice) {
        const increase = currentPrice - previousPrice;
        const growthRate = (currentPrice / previousPrice) * 100;
        return { increase, growthRate, increaseRate: growthRate - 100 };
    }

    function getArrowHTML(increase) {
        if (increase > 0) return '<span style="color: green; font-size: 2em;">↑</span>';
        if (increase < 0) return '<span style="color: red; font-size: 2em;">↓</span>';
        return '-';
    }

    function createHeaderRow(table) {
        const row = table.insertRow(0);
        const headers = ["День", "", "Цена, $", "Прирост, $", "Темп роста", "Темп прироста"];
        headers.forEach((text, idx) => {
            const cell = row.insertCell(idx);
            cell.textContent = text;
        });
    }

    const table = document.getElementById('oil-prices-table');
    createHeaderRow(table);

    const stats = {
        maxPrice: -Infinity,
        minPrice: Infinity,
        increaseSum: 0,
        growthRateSum: 0,
        arrowUpCount: 0,
        arrowDownCount: 0,
        dataCount: Object.keys(oilPrices).length
    };

    for (let day in oilPrices) {
        const row = table.insertRow();
        const price = oilPrices[day];
        
        row.insertCell(0).textContent = day;
        const arrowCell = row.insertCell(1);
        row.insertCell(2).textContent = price;

        if (day == 1) {
            row.insertCell(3).textContent = "-";
            row.insertCell(4).textContent = "-";
            row.insertCell(5).textContent = "-";
        } else {
            const metrics = calculateMetrics(price, oilPrices[day - 1]);
            row.insertCell(3).textContent = metrics.increase.toFixed(3);
            row.insertCell(4).textContent = metrics.growthRate.toFixed(2) + "%";
            row.insertCell(5).textContent = metrics.increaseRate.toFixed(2) + "%";
            
            arrowCell.innerHTML = getArrowHTML(metrics.increase);
            
            stats.increaseSum += metrics.increase;
            stats.growthRateSum += metrics.growthRate;
            if (metrics.increase > 0) stats.arrowUpCount++;
            if (metrics.increase < 0) stats.arrowDownCount++;
        }

        stats.maxPrice = Math.max(stats.maxPrice, price);
        stats.minPrice = Math.min(stats.minPrice, price);
    }

    const lastRow = table.insertRow();
    lastRow.insertCell(0).textContent = "Итог";
    lastRow.insertCell(1).textContent = "";
    lastRow.insertCell(2).textContent = `Макс = ${stats.maxPrice.toFixed(2)}, Мин = ${stats.minPrice.toFixed(2)}`;
    lastRow.insertCell(3).textContent = `Среднее = ${(stats.increaseSum / (stats.dataCount - 1)).toFixed(2)}`;
    lastRow.insertCell(4).textContent = `Среднее = ${(stats.growthRateSum / (stats.dataCount - 1)).toFixed(2)}%`;
    lastRow.insertCell(5).textContent = `${stats.arrowUpCount}↑ ${stats.arrowDownCount}↓`;
});