# Stock Exchange

### System Design

1. Order books are in memory, They are a variable in a our node.js process. We can create this backend using a faster framework like rust and golang. But the amount of data that can be stored in memory is very limited.
   Usually the servers can die so we usually store the data in databases, but we need very fast speed for exchange so we need to achieve ms delay in performing the transactions, hence the orderbooks have been kept in memory.
   Now we need to build over that if the server dies then the orderbook dies, this problem has to be dealt with. So orderbook has to be saved somewhere. You cannot notify the user that the request has succeeded and then store in the database.

2. Frontend talks to backend, backend talks to a queue and queue finally talks to the orderbook and puts the order into the orderbook.
