import "@styles/globals.css";
import Provider from "../components/provider";

export const metadata = {
  title: "TrackIt",
  description: "A simple and efficient way to track your expenses",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
