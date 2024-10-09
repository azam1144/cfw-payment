## Overview

The Payment Worker manages the payment processing for customer subscriptions. It records payments and updates invoice statuses, ensuring a seamless payment experience for users.

## Features

- Process payments made by customers via an integrated payment gateway.
- Update invoice status to reflect successful or failed payments.
- Implement retry logic for failed payments using scheduled triggers.


## Setup

1. Clone the repository:
   ```bash  
   git clone https://github.com/azam1144/cfw-payment.git  
   cd subscription  

2. Install dependencies:
   ```bash
   npm install

## Environment Configuration Variables
Set the following environment variables in your wrangler.toml file or through the Cloudflare dashboard:

INVOICE_WORKER_URL: URL to the Billing Engine Worker.

1. Variables and Secrets:
   - SUBSCRIPTION_WORKER_URL: URL to the Subscription Worker.
   - INVOICE_WORKER_URL: URL to the Billing/Invoice Engine Worker.
   - NOTIFICATION_WORKER_URL: URL to the Notification Worker.
   
2. KV Namespace Binding:
   PAYMENT_KV

2. Example for development:
   - WORKER_URL=http://<your-domain.com>:<port>/

## How to Run Locally
1. To run the worker locally, use:
    ```bash
    npm run dev

## How to Run Locally
1. To run the worker locally, use:
   ```bash
   npm run dev  

This will start the worker on a local server. You can test it using a tool like Postman or curl.


## How to Deploy on Production
1. To deploy the worker to production, run:
   ```bash
   npm run deploy  

Ensure you have configured your environment variables correctly in the Cloudflare dashboard.


## API Documentation
Below is the domain where you can see API Docs

https://payment-processing.azam-arid1144.workers.dev/
   