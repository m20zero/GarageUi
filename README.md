TECH STACK:
Front-End: Angular
Back-End: Java Spring
Web Api: RestFUL Api
Databse: PostgreSQL

VALIDATIONS:
Worker: 
    Required Fields: Name, Email, Phone, Salary, Joining Date
    
    1. Worker Name should not be empty.
    2. Worker Email should not be empty.
    3. Worker Salary cannot be equal or less than 0.
    4. Worker Name should be in correct format. Numbers not allowed in name.
    5. Worker Email should be in correct format.
    6. Worker Phone should be in correct format.

Job:
    Required Fields: Customer Name, Customer Email, Customer Phone, Customer Address, Car No, Job Start Date, Job Status

    1. Customer Name should not be empty.
    2. Customer Email should not be empty.
    3. Customer Phone Number should not be empty.
    4. Job total should be in numbers only
    5. Customer Address should not be empty.
    6. Customer Car No should not be empty.
    7. Job end date has to be later date of job start date.
    8. Customer Name should be in correct format. Numbers not allowed.
    9. Total amount should be in correct format. Letters not allowed.
    10. Customer phone number shoukd be in correct format.

Expense:
    Required Fields: Title, Expense Type, Amount, Expense Date

Inventory:
    Required Fields: Item Name, Item No, Item Company, Item Type, Purchase Price, Selling Price, Quantity, Vendor

    1. Item Name should not be empty.
    2. Item Number should not be empty.
    3. Item Company should not be empty.
    4. Purchase Price cannot be more than selling price.
    5. Selling Price cannot be less than purchase price.
    6. Purchase and Selling price should be greater than 0.
    7. Quantity should be greater than 0.

Vendor:
    Required Fields: Vendor Name, Vendor Phone, Vendor Address

    1. Vendor Name should not be empty and should be in correct format.
    2. Vendor Phone Should not be empty and should be in correct format.
    3. Vendor Email should be in correct format.

Sale:
    Required Fields: Customer Name, Customer Phone, Sale Date, Job Info, Product with quantity (if any), Discount, Total

    1. Customer Name should not be empty and should be in correct format.
    2. Customer Phone should not be empty and should be in correct format.
    3. Customer Email be in correct format.
    4. Producr Quantity cannot be less than or equal to 0 and should not be more than the actual quantity of the product.