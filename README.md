# Moovie Application

Welcome to your Next.js application! This README provides an overview of how to run your application locally and deploy it using PM2 for production.

## Local Development

To run your Next.js application locally, follow these steps:

1. **Install Dependencies**: Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

2. **Start the Development Server**: Once the dependencies are installed, start the development server with the following command:
   ```bash
   npm run dev
   ```

Your Next.js application should now be running locally. You can access it in your web browser at [http://localhost:3000](http://localhost:3000).

## Production Deployment with PM2

To deploy your Next.js application in a production environment using PM2, follow these steps:

1. **Install PM2 (if not already installed)**: Run the following command to install PM2 globally:

   ```bash
   npm install pm2@latest -g
   ```

2. **Start the Next.js Application with PM2**: Run the following command to start your Next.js application with PM2:
   ```bash
   npm run start-prod
   ```

Your Next.js application is now running in a production environment managed by PM2. The `"start-prod"` script in your `package.json` file executes the build process (`npm run build`) and then starts the application with PM2 (`pm2 start npm --name "bnc-moovie" -- start`).

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn more about Next.js and its features.
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/) - Explore PM2's documentation for more advanced usage and configurations.
