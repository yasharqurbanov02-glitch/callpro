// app/layout.js

import "./globals.css";

export const metadata = {
  title: "CallPro AZ — Peşəkar Kol Mərkəzi Xidmətləri",
  description:
    "CallPro AZ — Azərbaycanın aparıcı kol mərkəzi. 7/24 peşəkar müştəri xidməti, satış dəstəyi, texniki yardım.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className="antialiased">{children}</body>
    </html>
  );
}
