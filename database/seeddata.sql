USE ECommerceDB;
GO

-- 1. Wipe all tables
DELETE FROM Payments;
DELETE FROM OrderItems;
DELETE FROM Orders;
DELETE FROM CartItems;
DELETE FROM Cart;
DELETE FROM Addresses;
DELETE FROM Products;
DELETE FROM Categories;
DELETE FROM Users;
DELETE FROM Roles;

-- Reset identities
DBCC CHECKIDENT ('Payments', RESEED, 0);
DBCC CHECKIDENT ('OrderItems', RESEED, 0);
DBCC CHECKIDENT ('Orders', RESEED, 0);
DBCC CHECKIDENT ('CartItems', RESEED, 0);
DBCC CHECKIDENT ('Cart', RESEED, 0);
DBCC CHECKIDENT ('Addresses', RESEED, 0);
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('Categories', RESEED, 0);
DBCC CHECKIDENT ('Users', RESEED, 0);
DBCC CHECKIDENT ('Roles', RESEED, 0);

-- 2. Seed Roles
INSERT INTO Roles (RoleName) VALUES ('Admin');   -- RoleId = 1
INSERT INTO Roles (RoleName) VALUES ('Customer'); -- RoleId = 2

-- 3. Seed Users
INSERT INTO Users (FullName, Email, PasswordHash, RoleId, CreatedAt)
VALUES ('Admin User', 'admin@shop.com', 'hashed_admin123', 
        (SELECT RoleId FROM Roles WHERE RoleName = 'Admin'), GETDATE());

INSERT INTO Users (FullName, Email, PasswordHash, RoleId, CreatedAt)
VALUES ('John Doe', 'john@example.com', 'hashed_john123', 
        (SELECT RoleId FROM Roles WHERE RoleName = 'Customer'), GETDATE());

INSERT INTO Users (FullName, Email, PasswordHash, RoleId, CreatedAt)
VALUES ('Jane Smith', 'jane@example.com', 'hashed_jane123', 
        (SELECT RoleId FROM Roles WHERE RoleName = 'Customer'), GETDATE());

-- 4. Seed Categories
INSERT INTO Categories (Name, Description) VALUES 
('Electronics', 'Mobiles, laptops, gadgets'),
('Clothing', 'Men and women fashion'),
('Home Appliances', 'Kitchen & household');

-- 5. Seed Products
INSERT INTO Products (CategoryId, Name, Description, Price, Stock, ImageUrl, CreatedAt)
VALUES ((SELECT CategoryId FROM Categories WHERE Name = 'Electronics'), 'iPhone 15', 'Latest Apple smartphone', 1200.00, 10, 'images/iphone15.jpg', GETDATE());

INSERT INTO Products (CategoryId, Name, Description, Price, Stock, ImageUrl, CreatedAt)
VALUES ((SELECT CategoryId FROM Categories WHERE Name = 'Electronics'), 'Dell XPS 13', 'Lightweight ultrabook', 1500.00, 5, 'images/dellxps13.jpg', GETDATE());

INSERT INTO Products (CategoryId, Name, Description, Price, Stock, ImageUrl, CreatedAt)
VALUES ((SELECT CategoryId FROM Categories WHERE Name = 'Clothing'), 'Men T-Shirt', 'Cotton casual t-shirt', 25.00, 100, 'images/men_tshirt.jpg', GETDATE());

INSERT INTO Products (CategoryId, Name, Description, Price, Stock, ImageUrl, CreatedAt)
VALUES ((SELECT CategoryId FROM Categories WHERE Name = 'Clothing'), 'Women Dress', 'Elegant evening dress', 80.00, 50, 'images/women_dress.jpg', GETDATE());

INSERT INTO Products (CategoryId, Name, Description, Price, Stock, ImageUrl, CreatedAt)
VALUES ((SELECT CategoryId FROM Categories WHERE Name = 'Home Appliances'), 'Microwave Oven', 'Samsung 25L oven', 200.00, 20, 'images/microwave.jpg', GETDATE());

-- 6. Seed Addresses
INSERT INTO Addresses (UserId, FullName, Phone, AddressLine1, City, State, ZipCode, Country, IsDefault)
VALUES ((SELECT UserId FROM Users WHERE Email = 'john@example.com'), 'John Doe', '1234567890', '123 Main St', 'New York', 'NY', '10001', 'USA', 1);

INSERT INTO Addresses (UserId, FullName, Phone, AddressLine1, City, State, ZipCode, Country, IsDefault)
VALUES ((SELECT UserId FROM Users WHERE Email = 'jane@example.com'), 'Jane Smith', '9876543210', '456 Park Ave', 'Los Angeles', 'CA', '90001', 'USA', 1);

-- 7. Seed Cart
INSERT INTO Cart (UserId, CreatedAt) 
VALUES ((SELECT UserId FROM Users WHERE Email = 'john@example.com'), GETDATE());

INSERT INTO Cart (UserId, CreatedAt) 
VALUES ((SELECT UserId FROM Users WHERE Email = 'jane@example.com'), GETDATE());

-- 8. Seed CartItems
INSERT INTO CartItems (CartId, ProductId, Quantity)
VALUES ((SELECT CartId FROM Cart c JOIN Users u ON c.UserId = u.UserId WHERE u.Email = 'john@example.com'),
        (SELECT ProductId FROM Products WHERE Name = 'iPhone 15'), 1);

INSERT INTO CartItems (CartId, ProductId, Quantity)
VALUES ((SELECT CartId FROM Cart c JOIN Users u ON c.UserId = u.UserId WHERE u.Email = 'john@example.com'),
        (SELECT ProductId FROM Products WHERE Name = 'Men T-Shirt'), 2);

INSERT INTO CartItems (CartId, ProductId, Quantity)
VALUES ((SELECT CartId FROM Cart c JOIN Users u ON c.UserId = u.UserId WHERE u.Email = 'jane@example.com'),
        (SELECT ProductId FROM Products WHERE Name = 'Women Dress'), 1);

-- 9. Seed Orders
INSERT INTO Orders (UserId, AddressId, TotalAmount, Status, CreatedAt)
VALUES ((SELECT UserId FROM Users WHERE Email = 'john@example.com'),
        (SELECT AddressId FROM Addresses WHERE FullName = 'John Doe'),
        1250.00, 'Pending', GETDATE());

INSERT INTO Orders (UserId, AddressId, TotalAmount, Status, CreatedAt)
VALUES ((SELECT UserId FROM Users WHERE Email = 'jane@example.com'),
        (SELECT AddressId FROM Addresses WHERE FullName = 'Jane Smith'),
        80.00, 'Paid', GETDATE());

-- 10. Seed OrderItems
INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
VALUES ((SELECT OrderId FROM Orders o JOIN Users u ON o.UserId = u.UserId WHERE u.Email = 'john@example.com'),
        (SELECT ProductId FROM Products WHERE Name = 'iPhone 15'), 1, 1200.00);

INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
VALUES ((SELECT OrderId FROM Orders o JOIN Users u ON o.UserId = u.UserId WHERE u.Email = 'john@example.com'),
        (SELECT ProductId FROM Products WHERE Name = 'Men T-Shirt'), 2, 25.00);

INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
VALUES ((SELECT OrderId FROM Orders o JOIN Users u ON o.UserId = u.UserId WHERE u.Email = 'jane@example.com'),
        (SELECT ProductId FROM Products WHERE Name = 'Women Dress'), 1, 80.00);

-- 11. Seed Payments
INSERT INTO Payments (OrderId, Amount, PaymentMethod, Status, TransactionId, PaidAt)
VALUES ((SELECT OrderId FROM Orders o JOIN Users u ON o.UserId = u.UserId WHERE u.Email = 'john@example.com'),
        1250.00, 'Stripe', 'Pending', NULL, NULL);

INSERT INTO Payments (OrderId, Amount, PaymentMethod, Status, TransactionId, PaidAt)
VALUES ((SELECT OrderId FROM Orders o JOIN Users u ON o.UserId = u.UserId WHERE u.Email = 'jane@example.com'),
        80.00, 'PayPal', 'Success', 'TXN123456', GETDATE());
