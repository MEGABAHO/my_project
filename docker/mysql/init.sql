-- Grant necessary permissions to myuser for Prisma migrations
-- This allows the user to create and manage shadow databases

GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
