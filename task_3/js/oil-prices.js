document.addEventListener('DOMContentLoaded', function() {
    const oilPrices = [
        65.95, 66.38, 65.97, 65.77, 67.4, 68.61, 70.99,
        70.79, 70.75, 69.79, 66.33, 68.22, 68.74, 67.52,
        67.92, 67.77, 67.87, 68.94, 68.93, 69.66, 67.7,
        67.46, 68.65, 67.4, 70.61, 71.92, 71.65, 71.83,
        71.49, 72.36, 71.39
    ];

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
        arrowDownCount: 0
    };

    oilPrices.forEach((price, index) => {
        const day = index + 1;
        const row = table.insertRow();
        
        row.insertCell(0).textContent = day;
        const arrowCell = row.insertCell(1);
        row.insertCell(2).textContent = price;

        if (index === 0) {
            row.insertCell(3).textContent = "-";
            row.insertCell(4).textContent = "-";
            row.insertCell(5).textContent = "-";
        } else {
            const metrics = calculateMetrics(price, oilPrices[index - 1]);
            row.insertCell(3).textContent = metrics.increase.toFixed(2);
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
    });

    const lastRow = table.insertRow();
    lastRow.insertCell(0).textContent = "Итог";
    lastRow.insertCell(1).textContent = "";
    lastRow.insertCell(2).textContent = `Макс = ${stats.maxPrice.toFixed(2)}, Мин = ${stats.minPrice.toFixed(2)}`;
    lastRow.insertCell(3).textContent = `Среднее = ${(stats.increaseSum / (oilPrices.length - 1)).toFixed(2)}`;
    lastRow.insertCell(4).textContent = `Среднее = ${(stats.growthRateSum / (oilPrices.length - 1)).toFixed(2)}%`;
    lastRow.insertCell(5).textContent = `${stats.arrowUpCount}↑ ${stats.arrowDownCount}↓`;
});