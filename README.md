# Time-of-Birth Calculator (Ghati / Phala)

A simple web tool to convert between traditional Indian time units (Ghati/Phala) and standard time (HH:MM), and vice versa.

## Features

- **Ghati/Phala ➜ HH:MM**: Enter Ghatis and Phalas after sunrise to get the standard time of birth.
- **HH:MM ➜ Ghati/Phala**: Enter a time to get the number of Ghatis and Phalas elapsed since sunrise.
- Copy results to clipboard.
- Responsive and mobile-friendly UI.
- All calculations use Asia/Kolkata (IST) timezone.

## Usage

1. Open `index.html` in your browser.
2. Choose the conversion direction using the tabs.
3. Enter the required details:
   - **Date**: The date of birth/event.
   - **Sunrise time**: Sunrise time on that date (reference point).
   - **Ghatis/Phalas** or **HH:MM**: Depending on conversion direction.
4. Click the calculate button to see the result.
5. Use the "Copy result" button to copy the output.

## Assumptions & Conversions

- 1 ghati = 24 minutes
- 1 phala = 24 seconds (60 phalas = 1 ghati)
- 1 hour = 2.5 ghatis
- 1 minute = 2.5 phalas
- The given sunrise is taken as the reference point for all calculations.

## File Structure

- `index.html` — Main HTML file
- `style.css` — Stylesheet for layout and responsiveness
- `script.js` — JavaScript logic for conversions and UI

## License

MIT License (see LICENSE if provided)
