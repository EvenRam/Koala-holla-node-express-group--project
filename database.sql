CREATE TABLE "koala_info" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"favorite_color" VARCHAR (250),
	"age" INT,
 	"transfer" BOOLEAN DEFAULT FALSE,
 	"notes" VARCHAR(500)
);