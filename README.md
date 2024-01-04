# PortfolioBackend

curl -X POST http://localhost:3001/api/send-order-email \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "johndoe@example.com", "orderType": "Web Evolution Package"}'
