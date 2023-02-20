# ts-observability

A proof-of-concept (PoC) of using an observability stack in a TypeScript web server.

## Stack

Visualizations are done in Grafana.

-   Logging
    -   Loki
    -   Promtail
-   Metrics
    -   Prometheus
-   Tracing
    -   Jaeger

## Web Interfaces

See `docker-compose.yml` for more detailed information.

| Service    | Port    |
| ---------- | ------- |
| Grafana    | `3000`  |
| Prometheus | `9090`  |
| Jaeger     | `16686` |
