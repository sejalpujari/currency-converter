## What It Is
The Currency Converter App is a mobile application built with React Native that allows users to convert amounts between different currencies using real-time exchange rates. It combines a currency conversion tool with a built-in calculator and keeps track of recent conversions, making it a handy utility for travelers, shoppers, or anyone needing quick currency calculations.

### Key Features
- **Currency Conversion**: Convert between multiple currencies (e.g., USD, EUR, INR, JPY) with up-to-date exchange rates fetched from exchangerate-api.com.
- **Built-in Calculator**: Perform basic arithmetic operations (+, −, ×, ÷) directly within the app to calculate amounts before converting.
- **Recent Conversions**: Stores the last 5 conversions with timestamps for easy reference.
- **Custom Formatting**: Special formatting for Indian Rupees (INR) using the Indian numbering system, alongside standard formatting for other currencies.
- **User-Friendly Interface**: Simple dropdowns for currency selection and a calculator-style button layout.

## How It Works
1. **Setup**: The app fetches the latest exchange rates from exchangerate-api.com when it starts, populating a list of available currencies.
2. **Input**: Users select a source currency (e.g., ILS) and a target currency (e.g., USD) from dropdown menus.
3. **Calculation**: Users input an amount or a mathematical expression (e.g., "100 + 50") using the calculator buttons.
4. **Conversion**: Pressing the '=' button triggers the conversion using the fetched exchange rate, displaying the result with the appropriate currency symbol.
5. **History**: Each conversion is logged in the "Recents" section with the original amount, result, and timestamp.

### Technical Details
- **Framework**: Built with React Native for cross-platform compatibility (Android and iOS).
- **API**: Uses exchangerate-api.com for real-time exchange rates.
- **Components**: Leverages `react-native-modal-dropdown` for currency selection and `FlatList` for displaying recent conversions.
- **State Management**: Utilizes React hooks (`useState`, `useEffect`, `useRef`) for managing app state and side effects.



## Instructions to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/currency-converter.git
   cd currency-converter

Install Dependencies:
bash

npm install
# or
yarn install

Install Peer Dependency:
bash

npm install react-native-modal-dropdown

Set Up Project Structure:
Ensure the following files are present:
src/components/CurrencyConverter.js

App.js

src/styles/styles.js
Adjust imports in App.js if your file structure differs.

Start Metro Bundler:
bash

npx react-native start

Run on Android:
bash

npx react-native run-android

Run on iOS:
bash

npx react-native run-ios



Challenges Faced

Props Object Containing a Key Props Error: Encountered an error where a component received a props object containing a key prop, which is a reserved prop in React Native. This occurred because the FlatList component automatically assigns a key prop to its items, and passing an additional key prop through the renderItem function caused a conflict. Resolved by ensuring the keyExtractor prop was used instead to uniquely identify list items without interfering with React's internal key management.

API Rate Limiting: The free tier of exchangerate-api.com imposes rate limits, which could affect frequent conversions.

Dropdown Styling: Customizing the react-native-modal-dropdown component required additional styling tweaks to match the app's design.

Number Formatting: Implementing Indian number system formatting alongside standard formatting required careful handling with Intl.NumberFormat.

Expression Evaluation: Safely evaluating user-entered mathematical expressions while preventing security risks (e.g., code injection) was challenging.

Layout Consistency: Ensuring consistent spacing and responsive design across different device sizes required multiple iterations of style adjustments.



