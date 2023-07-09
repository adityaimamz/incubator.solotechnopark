import Footer from "@/components/Footer";
import NavbarSecondary from "@/components/NavbarrSecondary";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import React from "react";

function SecondaryLayout({ children }) {
  const title = "Solo Techno Incubator";
  const description =
    "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant). Mengembangkan Startup dan UMKM Yang Tangguh, Inovatif dan Berdaya Saing.";
  const keywords =
    "incubator, inkubator, stp, solotechnopark, incubator solotechnopark, inkubator solotechnopark, inkubator shopee, shopee, solo, kawasan sains dan teknologi, UPTD kawasan sains dan teknologi, IBT, program inkubasi, inkubasi";
  const canonical = "https://inkubator.solotechnopark.id";
  const ogImage =
    "https://incubator.solotechnopark.id/wp-content/uploads/2021/08/Incubator-2.png";

  // konfigurasi SEO default
  const SEO = {
    title,
    description,
    keywords,
    canonical,
    openGraph: {
      type: "website",
      locale: "en_IE",
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: "SEO Image",
        },
      ],
    },
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="incubator, inkubator, stp, solotechnopark, incubator solotechnopark, inkubator solotechnopark, inkubator shopee, shopee, solo, kawasan sains dan teknologi, UPTD kawasan sains dan teknologi, IBT, program inkubasi, inkubasi"
        />
        <link rel="icon" type="image/png" href="/icon-ibt.png/" />
        <title>Inkubator Solotechnopark</title>
        <meta
          name="description"
          content="Mengembangkan Startup dan UMKM Yang Tangguh, Inovatif dan Berdaya Saing."
        />
      </Head>

      <DefaultSeo {...SEO} />

      <NavbarSecondary />

      <main id="scroll-container">{children}</main>

      <footer id="Contact">
        <Footer />
      </footer>
    </>
  );
}

export default SecondaryLayout;
