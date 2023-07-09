// module.exports = {
//   siteUrl: "https://inkubator.solotechnopark.id",
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   changefreq: "daily",
//   priority: 0.7,
//   sitemapPath: "/sitemap.xml",
//   exclude: ["/login", "/layout"],
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: "*",
//         allow: "/",
//       },
//     ],
//   },
// };

module.exports = {
  siteUrl: "https://inkubator.solotechnopark.id",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/layouts/*", "/login"],
  targetDirectory: "./public",
  robotsTxtOptions: {
    additionalSitemaps: ["https://inkubator.solotechnopark.id/sitemap.xml"],
    changefreq: "daily",
    priority: 0.7,
    lastmod: "2023-05-23T00:00:00.000Z",
  },
  trailingSlash: true,
};
