import "@styles/globals.css";

export const metadata = {
  title: "TrackIt",
  description: "A simple and efficient way to track your expenses",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
