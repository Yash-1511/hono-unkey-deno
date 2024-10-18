# Hono API with Unkey Middleware in Deno

This guide explains how to set up a basic API using the Hono framework with Deno runtime, protected by the Unkey API. You'll be guided through the following steps:
- Installing Deno
- Setting up Unkey
- Configuring your environment
- Installing dependencies and running the app
- API route protection using Unkey middleware

## Prerequisites

- **Deno**: Ensure that Deno is installed on your system.
- **Unkey Account**: You need an account on [Unkey](https://app.unkey.com) to manage your API keys and root key.

## Installing Deno

To install Deno, follow the instructions for your operating system:

- **Windows**:
  Open PowerShell and run:
  ```powershell
  irm https://deno.land/install.ps1 | iex
  ```

- **MacOS / Linux**:
  Open a terminal and run:
  ```bash
  curl -fsSL https://deno.land/install.sh | sh
  ```

For more detailed installation instructions, visit [Deno's official documentation](https://deno.land/manual/getting_started/installation).

## Setting up Unkey

Before running your application, you need to set up Unkey to manage API keys.

### 1. **Create a Root Key**
   - Go to [Unkey Root Keys](https://app.unkey.com/settings/root-keys).
   - Click on the "Create New Root Key" button.
   - Enter a name for your key.
   - Select the following permissions: `create_key`, `read_key`, `encrypt_key`, and `decrypt_key`.
   - Click "Create".
   - **Copy and save the Root Key** securely. You will need this key later for your environment configuration.

### 2. **Create Your API**
   - Go to [Unkey APIs](https://app.unkey.com/apis) and click "Create New API".
   - Give your API a name and click "Create".

### 3. **Create Your First API Key**
   - In the API dashboard, click "Create Key" at the top right corner.
   - Fill in the form with any relevant key information or leave it blank for a general key.
   - Click "Create" and **copy the key**. Save it securely for later use.

## Project Setup

### Step 1: Clone or create a new Deno project

```bash
git clone https://github.com/Yash-1511/hono-unkey-deno.git
```

### Step 2: Install npm packages

Since Deno has native support for npm packages, no manual installation is needed. You'll use `npm:@unkey/api` directly in your code.

### Step 3: Configure `.env`

Create a `.env` file in your project directory to store environment variables. Add the following variables:

```env
UNKEY_ROOT_KEY=<Your_Root_Key>
UNKEY_API_ID=<Your_API_ID>
```

Replace `<Your_Root_Key>` and `<Your_API_ID>` with the respective values from the Unkey dashboard.

### Step 4: Run the App

Now that everything is set up, you can start your server. Run the following command to start your app:

```bash
deno task start
```

The server will start on **port 8000**.

### API Routes

1. **Public Route**: Access the root route (http://localhost:8000/) to get a public response:
   ```json
   Hello Hono!
   ```

2. **Protected Route**: Access the protected route (http://localhost:8000/protected) by passing a valid API key in the `Authorization` header:
   ```bash
   curl -H "Authorization: Bearer <Your_API_Key>" http://localhost:8000/protected
   ```

   If the API key is valid, you will see the following response:
   ```json
   {
     "message": "This is a protected route"
   }
   ```

   If the API key is missing or invalid, you will receive a 401 or 403 error.

## Conclusion

You have successfully created an API using the Hono framework in Deno, secured by Unkey API authentication. Your API is protected by middleware that verifies API keys using Unkey, ensuring only authorized users can access protected routes.

For more information on Deno, Hono and Unkey, visit their official documentation:

- [Deno Documentation](https://docs.deno.com/)
- [Hono Documentation](https://hono.dev)
- [Unkey Documentation](https://unkey.com/docs/introduction)
