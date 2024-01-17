/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    API_URL: "https://658ad556ba789a962237f3ae.mockapi.io",
    DOMAIN_ORIGIN: "http://localhost:3000",
  },
};

module.exports = nextConfig;
