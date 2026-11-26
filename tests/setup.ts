// Isolasi environment untuk test: jangan baca file .env asli (berisi kredensial).
// dotenv/config membaca DOTENV_CONFIG_PATH; file ini sengaja tidak ada.
process.env.DOTENV_CONFIG_PATH = "tests/.env.does-not-exist";
process.env.DOTENV_CONFIG_QUIET = "true";

process.env.NODE_ENV = "test";
process.env.PORT = "3000";
process.env.DATABASE_URL = "postgresql://user:password@localhost:5432/test_db";
process.env.CORS_ORIGIN = "*";
delete process.env.DATABASE_SSL;
delete process.env.DIRECT_URL;
