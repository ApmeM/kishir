[![Actions Status](https://github.com/ApmeM/keshir/workflows/Node%20CI/badge.svg)](https://github.com/ApmeM/keshir/actions)

# Description 

Serverless E-shop website. All server-side functions (product database, order storage) are handled by someone else services (like Google):
- For products csv file source you can use Google spreadsheed csv exported file
- For order placing - Google form with 2 fields

Basic configuration stored in [.env](https://github.com/ApmeM/keshir/blob/master/.env) file:
```
REACT_APP_LOGO - Text that is displayed in page title, header and footer
REACT_APP_CSV_URL - Url to download csv product files example of the file located in [public](https://github.com/ApmeM/keshir/blob/master/public/products.csv) folder
REACT_APP_ORDER_URL - Url to post selected products
REACT_APP_ORDER_URL_CONTACT_NAME - field name for contact information
REACT_APP_ORDER_URL_PRODUCTS_NAME - field name for selected products data
```

Deployed to firebase using npm firebase-tools package and github actions.

# Credentials

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
