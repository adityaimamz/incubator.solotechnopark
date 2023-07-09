import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import React from "react";

function DefaultLayout({ children }) {
  const title = "Solo Techno Incubator - Solo Technopark";
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
          alt: "Inkubator - Solotechnopark",
        },
      ],
    },
    additionalMetaTags: [
      {
        property: "og:inkubator_solotechnopark",
        content: "Solo Techno Incubator",
      },
    ],
    additionalJsonLd: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://inkubator.solotechnopark.id/",
            url: "https://inkubator.solotechnopark.id/",
            name: "Beranda - Solo Techno Incubator",
            isPartOf: {
              "@id": "https://incubator.solotechnopark.id/#website",
            },
            about: {
              "@id": "https://incubator.solotechnopark.id/#organization",
            },
            primaryImageOfPage: {
              "@id": "https://incubator.solotechnopark.id/#primaryimage",
            },
            image: {
              "@id": "https://incubator.solotechnopark.id/#primaryimage",
            },
            thumbnailUrl:
              "https://incubator.solotechnopark.id/wp-content/uploads/elementor/thumbs/Logo-KEMENSESNEG-pwt4ebxkujy7u8jysorxtxoo8ozlzkg5psygcniqyo.png",
            datePublished: "2021-08-18T01:38:36+00:00",
            dateModified: "2023-03-28T05:10:25+00:00",
            description: description,
            breadcrumb: {
              "@id": "https://incubator.solotechnopark.id/#breadcrumb",
            },
            inLanguage: "en-US",
            potentialAction: [
              {
                "@type": "ReadAction",
                target: ["https://incubator.solotechnopark.id/"],
              },
            ],
          },
          {
            "@type": "ImageObject",
            inLanguage: "en-US",
            "@id": "https://incubator.solotechnopark.id/#primaryimage",
            url: "https://incubator.solotechnopark.id/wp-content/uploads/elementor/thumbs/Logo-KEMENSESNEG-pwt4ebxkujy7u8jysorxtxoo8ozlzkg5psygcniqyo.png",
            contentUrl:
              "https://incubator.solotechnopark.id/wp-content/uploads/elementor/thumbs/Logo-KEMENSESNEG-pwt4ebxkujy7u8jysorxtxoo8ozlzkg5psygcniqyo.png",
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://incubator.solotechnopark.id/#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Beranda",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://incubator.solotechnopark.id/#website",
            url: "https://inkubator.solotechnopark.id/",
            name: "Solo Techno Incubator",
            description: description,
            publisher: {
              "@id": "https://incubator.solotechnopark.id/#organization",
            },
            potentialAction: [
              {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://incubator.solotechnopark.id/?s={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            ],
            inLanguage: "en-US",
          },
          {
            "@type": "Organization",
            "@id": "https://incubator.solotechnopark.id/#organization",
            name: "Solo Techno Incubator",
            url: "https://inkubator.solotechnopark.id/",
            logo: {
              "@type": "ImageObject",
              inLanguage: "en-US",
              "@id": "https://incubator.solotechnopark.id/#/schema/logo/image/",
              url: "https://incubator.solotechnopark.id/wp-content/uploads/2021/08/Incubator-2.png",
              contentUrl:
                "https://incubator.solotechnopark.id/wp-content/uploads/2021/08/Incubator-2.png",
              width: 1734,
              height: 460,
              caption: "Solo Techno Incubator",
            },
            image: {
              "@id": "https://incubator.solotechnopark.id/#/schema/logo/image/",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Incubator Solo Techno - Solo Technopark</title>
        <meta
          name="description"
          content="Mengembangkan Startup dan UMKM Yang Tangguh, Inovatif dan Berdaya Saing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="incubator, inkubator, stp, solotechnopark, incubator solotechnopark, inkubator solotechnopark, inkubator shopee, shopee, solo, kawasan sains dan teknologi, UPTD kawasan sains dan teknologi, IBT, program inkubasi, inkubasi"
        />
        <link rel="icon" type="image/png" href="/icon-ibt.png/" />
      </Head>

      <DefaultSeo {...SEO} />

      <Navbar />

      <main id="scroll-container">{children}</main>

      <footer id="Contact">
        <Footer />
      </footer>
    </>
  );
}

export default DefaultLayout;
