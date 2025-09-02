USE ECommerceDB;
GO

-- 1. Clear dependent tables first
DELETE FROM Payments;
DELETE FROM OrderItems;
DELETE FROM Orders;
DELETE FROM CartItems;
DELETE FROM Cart;
DELETE FROM Addresses;

-- 2. Then clear independent tables
DELETE FROM Products;
DELETE FROM Categories;
DELETE FROM Users;

