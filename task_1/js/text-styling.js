document.addEventListener('DOMContentLoaded', function() {
    let textElement = document.getElementById('text');
    let textElementStyle = textElement.style;

    let inputText = document.getElementById('input-text');
    inputText.addEventListener('input', function() {
        textElement.textContent = inputText.value;
    });

    let fontFamily = document.getElementById('font-family');
    let fontSize = document.getElementById('font-size');
    fontFamily.addEventListener('change', function() {
        textElementStyle.fontFamily = fontFamily.value;
    });
    fontSize.addEventListener('input', function() {
        if (fontSize.value > 72) {
            fontSize.value = 72;
        }
        textElementStyle.fontSize = fontSize.value + 'px';
    });

    let boldCheckbox = document.getElementById('bold');
    let italicCheckbox = document.getElementById('italic');
    boldCheckbox.addEventListener('change', function() {
        textElementStyle.fontWeight = boldCheckbox.checked ? 'bold' : 'normal';
    });
    italicCheckbox.addEventListener('change', function() {
        textElementStyle.fontStyle = italicCheckbox.checked ? 'italic' : 'normal';
    });

    let alignment = document.getElementsByName('alignment');
    alignment.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (radio.checked) {
                textElementStyle.textAlign = radio.value;
            }
        });
    });

    let colorDisplay = document.getElementById('color-display');
    let colorValue = document.getElementById('color-value');

    let rRange = document.getElementById('R-range');
    let gRange = document.getElementById('G-range');
    let bRange = document.getElementById('B-range');
    let rValue = document.getElementById('R-value');
    let gValue = document.getElementById('G-value');
    let bValue = document.getElementById('B-value');

    function updateColor() {
        let r = rRange.value;
        let g = gRange.value;
        let b = bRange.value;
        rValue.value = r;
        gValue.value = g;
        bValue.value = b;
        let rgbColor = `rgb(${r}, ${g}, ${b})`;
        colorDisplay.style.backgroundColor = rgbColor;
        colorValue.value = rgbColor;
        textElementStyle.color = rgbColor;
    }

    let colorComponentsRange = document.querySelectorAll('.color-components input[type="range"]');
    colorComponentsRange.forEach(function(range) {
        range.addEventListener('input', function() {
            if (range.id === 'R-range') rRange.value = range.value;
            if (range.id === 'G-range') gRange.value = range.value;
            if (range.id === 'B-range') bRange.value = range.value;
            updateColor();
        });
    });

    let colorComponentsNumber = document.querySelectorAll('.color-components input[type="number"]');
    colorComponentsNumber.forEach(function(input) {
        input.addEventListener('input', function() {
            if (input.id === 'R-value') rRange.value = input.value;
            if (input.id === 'G-value') gRange.value = input.value;
            if (input.id === 'B-value') bRange.value = input.value;
            updateColor();
        });
    });
});