ALTER TABLE products
ADD UNIQUE (name);

ALTER TABLE products
MODIFY price INT DEFAULT 0;
ADD CONSTRAINT price_check CHECK (price > 0);

ALTER TABLE products
MODIFY oldprice INT DEFAULT 0;
ADD CONSTRAINT oldprice_check CHECK (oldprice > 0);

ALTER TABLE products
MODIFY quantity INT DEFAULT 0;
ADD CONSTRAINT quantity_check CHECK (quantity > 0);

ALTER TABLE products
MODIFY buyturn INT DEFAULT 0;
ADD CONSTRAINT buyturn_check CHECK (buyturn > 0);